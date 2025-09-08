/**
 * Golden Reference Approval Workflow
 * Manages the approval process for golden references
 */

import fs from 'fs/promises'
import path from 'path'
import { GoldenReference, QualityScores } from '../types/engine-types'
import { GoldenReferenceManager } from './manager'
import { GoldenReferenceValidator } from './validator'

export class ApprovalWorkflow {
  private pendingApprovalsPath: string
  private goldenRefManager: GoldenReferenceManager
  private validator: GoldenReferenceValidator

  constructor(
    pendingApprovalsPath: string = './pending-approvals',
    goldenRefsPath: string = './golden-references'
  ) {
    this.pendingApprovalsPath = pendingApprovalsPath
    this.goldenRefManager = new GoldenReferenceManager(goldenRefsPath)
    this.validator = new GoldenReferenceValidator()
  }

  async submitForApproval(
    configId: string,
    sourcePdfPath: string,
    qualityScores: QualityScores,
    submittedBy: string,
    submissionNotes: string,
    sourceHtmlPath?: string
  ): Promise<PendingApproval> {
    await this.ensurePendingApprovalsDirectory()

    const submissionId = `${configId}-${Date.now()}`
    const submissionDir = path.join(this.pendingApprovalsPath, submissionId)
    
    await fs.mkdir(submissionDir, { recursive: true })

    // Copy source files to pending directory
    const pdfPath = path.join(submissionDir, 'worksheet.pdf')
    const htmlPath = sourceHtmlPath ? path.join(submissionDir, 'worksheet.html') : undefined

    await fs.copyFile(sourcePdfPath, pdfPath)
    if (sourceHtmlPath && htmlPath) {
      await fs.copyFile(sourceHtmlPath, htmlPath)
    }

    const pendingApproval: PendingApproval = {
      submissionId,
      configId,
      submittedBy,
      submittedAt: new Date().toISOString(),
      submissionNotes,
      qualityScores,
      status: 'pending',
      pdfPath,
      htmlPath,
      reviewNotes: []
    }

    // Save submission metadata
    await fs.writeFile(
      path.join(submissionDir, 'submission.json'),
      JSON.stringify(pendingApproval, null, 2)
    )

    // Add to pending approvals index
    await this.updatePendingIndex(submissionId, pendingApproval)

    return pendingApproval
  }

  async getPendingApprovals(filter?: ApprovalFilter): Promise<PendingApproval[]> {
    try {
      await this.ensurePendingApprovalsDirectory()
      
      const entries = await fs.readdir(this.pendingApprovalsPath, { withFileTypes: true })
      const pendingApprovals: PendingApproval[] = []

      for (const entry of entries) {
        if (entry.isDirectory() && entry.name !== 'index.json') {
          const submissionPath = path.join(this.pendingApprovalsPath, entry.name, 'submission.json')
          
          try {
            const submissionContent = await fs.readFile(submissionPath, 'utf-8')
            const approval: PendingApproval = JSON.parse(submissionContent)
            
            if (this.matchesFilter(approval, filter)) {
              pendingApprovals.push(approval)
            }
          } catch (error) {
            // Skip invalid submissions
            continue
          }
        }
      }

      // Sort by submission date (newest first)
      pendingApprovals.sort((a, b) => 
        new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      )

      return pendingApprovals
    } catch (error) {
      return []
    }
  }

  async reviewSubmission(
    submissionId: string,
    reviewedBy: string,
    reviewNotes: string,
    decision: 'approve' | 'reject' | 'request-changes'
  ): Promise<ApprovalResult> {
    try {
      const submissionDir = path.join(this.pendingApprovalsPath, submissionId)
      const submissionPath = path.join(submissionDir, 'submission.json')
      
      const submissionContent = await fs.readFile(submissionPath, 'utf-8')
      const approval: PendingApproval = JSON.parse(submissionContent)

      // Add review note
      const reviewNote: ReviewNote = {
        reviewedBy,
        reviewedAt: new Date().toISOString(),
        decision,
        notes: reviewNotes
      }

      approval.reviewNotes.push(reviewNote)
      approval.status = decision === 'approve' ? 'approved' : 
                       decision === 'reject' ? 'rejected' : 'changes-requested'

      // Update submission file
      await fs.writeFile(submissionPath, JSON.stringify(approval, null, 2))

      // If approved, create golden reference
      if (decision === 'approve') {
        const goldenRef = await this.goldenRefManager.createGoldenReference(
          approval.configId,
          approval.pdfPath,
          approval.qualityScores,
          reviewedBy,
          reviewNotes,
          approval.htmlPath
        )

        // Move to approved directory
        await this.archiveApprovedSubmission(approval, goldenRef)

        return {
          success: true,
          decision,
          goldenReference: goldenRef,
          message: 'Submission approved and golden reference created'
        }
      } else {
        return {
          success: true,
          decision,
          message: decision === 'reject' 
            ? 'Submission rejected'
            : 'Changes requested - submission returned for revision'
        }
      }
    } catch (error) {
      return {
        success: false,
        decision: 'error',
        message: `Failed to review submission: ${error}`
      }
    }
  }

  async bulkApprove(
    submissionIds: string[],
    approvedBy: string,
    bulkApprovalNotes: string
  ): Promise<BulkApprovalResult> {
    const results: Array<{ submissionId: string; result: ApprovalResult }> = []
    let successCount = 0
    let failureCount = 0

    for (const submissionId of submissionIds) {
      const result = await this.reviewSubmission(
        submissionId,
        approvedBy,
        bulkApprovalNotes,
        'approve'
      )

      results.push({ submissionId, result })

      if (result.success) {
        successCount++
      } else {
        failureCount++
      }
    }

    return {
      totalSubmissions: submissionIds.length,
      successful: successCount,
      failed: failureCount,
      results
    }
  }

  async getApprovalStatistics(): Promise<ApprovalStatistics> {
    const pendingApprovals = await this.getPendingApprovals()
    
    const stats: ApprovalStatistics = {
      totalPending: 0,
      totalApproved: 0,
      totalRejected: 0,
      totalChangesRequested: 0,
      averageQualityScore: 0,
      submissionsByUser: {},
      approvalsByUser: {},
      averageReviewTime: 0
    }

    let totalQualityScore = 0
    let reviewTimeSum = 0
    let reviewTimeCount = 0

    for (const approval of pendingApprovals) {
      // Count by status
      switch (approval.status) {
        case 'pending':
          stats.totalPending++
          break
        case 'approved':
          stats.totalApproved++
          break
        case 'rejected':
          stats.totalRejected++
          break
        case 'changes-requested':
          stats.totalChangesRequested++
          break
      }

      // Track submissions by user
      stats.submissionsByUser[approval.submittedBy] = 
        (stats.submissionsByUser[approval.submittedBy] || 0) + 1

      // Track quality scores
      totalQualityScore += approval.qualityScores.composite

      // Track approvals by reviewer
      for (const review of approval.reviewNotes) {
        stats.approvalsByUser[review.reviewedBy] = 
          (stats.approvalsByUser[review.reviewedBy] || 0) + 1

        // Calculate review time
        const reviewTime = new Date(review.reviewedAt).getTime() - new Date(approval.submittedAt).getTime()
        reviewTimeSum += reviewTime
        reviewTimeCount++
      }
    }

    stats.averageQualityScore = pendingApprovals.length > 0 
      ? totalQualityScore / pendingApprovals.length 
      : 0

    stats.averageReviewTime = reviewTimeCount > 0 
      ? reviewTimeSum / reviewTimeCount / (1000 * 60 * 60) // Convert to hours
      : 0

    return stats
  }

  async cleanupOldSubmissions(olderThanDays: number = 30): Promise<number> {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - olderThanDays)

    const pendingApprovals = await this.getPendingApprovals()
    let cleanedCount = 0

    for (const approval of pendingApprovals) {
      const submissionDate = new Date(approval.submittedAt)
      
      if (submissionDate < cutoffDate && (approval.status === 'approved' || approval.status === 'rejected')) {
        try {
          const submissionDir = path.join(this.pendingApprovalsPath, approval.submissionId)
          await fs.rm(submissionDir, { recursive: true, force: true })
          cleanedCount++
        } catch (error) {
          // Log error but continue
          console.warn(`Failed to cleanup submission ${approval.submissionId}:`, error)
        }
      }
    }

    return cleanedCount
  }

  private matchesFilter(approval: PendingApproval, filter?: ApprovalFilter): boolean {
    if (!filter) return true

    if (filter.status && approval.status !== filter.status) return false
    if (filter.configId && !approval.configId.includes(filter.configId)) return false
    if (filter.submittedBy && approval.submittedBy !== filter.submittedBy) return false
    if (filter.minQualityScore && approval.qualityScores.composite < filter.minQualityScore) return false

    return true
  }

  private async ensurePendingApprovalsDirectory(): Promise<void> {
    await fs.mkdir(this.pendingApprovalsPath, { recursive: true })
  }

  private async updatePendingIndex(submissionId: string, approval: PendingApproval): Promise<void> {
    const indexPath = path.join(this.pendingApprovalsPath, 'index.json')
    
    let index: Record<string, Partial<PendingApproval>> = {}
    
    try {
      const indexContent = await fs.readFile(indexPath, 'utf-8')
      index = JSON.parse(indexContent)
    } catch (error) {
      // Index doesn't exist yet
    }

    index[submissionId] = {
      submissionId: approval.submissionId,
      configId: approval.configId,
      submittedBy: approval.submittedBy,
      submittedAt: approval.submittedAt,
      status: approval.status,
      qualityScores: approval.qualityScores
    }

    await fs.writeFile(indexPath, JSON.stringify(index, null, 2))
  }

  private async archiveApprovedSubmission(approval: PendingApproval, goldenRef: GoldenReference): Promise<void> {
    const archiveDir = path.join(this.pendingApprovalsPath, 'approved', approval.submissionId)
    
    await fs.mkdir(archiveDir, { recursive: true })

    // Create archive record
    const archiveRecord = {
      originalSubmission: approval,
      goldenReference: {
        referenceId: goldenRef.metadata.referenceId,
        version: goldenRef.metadata.version
      },
      archivedAt: new Date().toISOString()
    }

    await fs.writeFile(
      path.join(archiveDir, 'archive-record.json'),
      JSON.stringify(archiveRecord, null, 2)
    )
  }
}

export interface PendingApproval {
  submissionId: string
  configId: string
  submittedBy: string
  submittedAt: string
  submissionNotes: string
  qualityScores: QualityScores
  status: 'pending' | 'approved' | 'rejected' | 'changes-requested'
  pdfPath: string
  htmlPath?: string
  reviewNotes: ReviewNote[]
}

export interface ReviewNote {
  reviewedBy: string
  reviewedAt: string
  decision: 'approve' | 'reject' | 'request-changes'
  notes: string
}

export interface ApprovalResult {
  success: boolean
  decision: 'approve' | 'reject' | 'request-changes' | 'error'
  goldenReference?: GoldenReference
  message: string
}

export interface BulkApprovalResult {
  totalSubmissions: number
  successful: number
  failed: number
  results: Array<{ submissionId: string; result: ApprovalResult }>
}

export interface ApprovalFilter {
  status?: 'pending' | 'approved' | 'rejected' | 'changes-requested'
  configId?: string
  submittedBy?: string
  minQualityScore?: number
}

export interface ApprovalStatistics {
  totalPending: number
  totalApproved: number
  totalRejected: number
  totalChangesRequested: number
  averageQualityScore: number
  submissionsByUser: Record<string, number>
  approvalsByUser: Record<string, number>
  averageReviewTime: number // in hours
}