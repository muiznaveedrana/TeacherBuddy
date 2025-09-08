/**
 * Golden Reference CLI Commands
 * Handles golden reference management operations
 */

import { GoldenReferenceManager } from '../../golden-references/manager'
import { GoldenReferenceValidator } from '../../golden-references/validator'
import { ApprovalWorkflow } from '../../golden-references/approval-workflow'
import { QualityScores } from '../../types/engine-types'

const goldenRefManager = new GoldenReferenceManager()
const validator = new GoldenReferenceValidator()
const approvalWorkflow = new ApprovalWorkflow()

export async function createGoldenReference(
  configId: string,
  sourcePath: string,
  approve: boolean = false,
  approvedBy: string = 'cli-user'
): Promise<void> {
  try {
    console.log(`\n🔍 Creating golden reference for configuration: ${configId}`)
    console.log(`📂 Source: ${sourcePath}`)

    // Validate source file exists
    const fs = await import('fs/promises')
    await fs.access(sourcePath)

    // Mock quality scores for CLI demonstration
    // In real implementation, this would integrate with the quality assessment system
    const mockQualityScores: QualityScores = {
      visualSimilarity: {
        score: 8.5,
        details: {
          structuralSimilarity: 8.7,
          layoutConsistency: 8.3,
          visualAlignment: 8.5
        }
      },
      contentAnalysis: {
        score: 9.0,
        details: {
          curriculumAlignment: 9.2,
          languageAppropriate: 8.8,
          mathematicalAccuracy: 9.0
        }
      },
      ruleBasedLayout: {
        score: 8.2,
        details: {
          fontConsistency: 8.0,
          spacingQuality: 8.3,
          elementPositioning: 8.3
        }
      },
      composite: 8.6
    }

    if (approve) {
      // Create golden reference directly
      const goldenRef = await goldenRefManager.createGoldenReference(
        configId,
        sourcePath,
        mockQualityScores,
        approvedBy,
        'CLI approved golden reference'
      )

      console.log(`✅ Golden reference created successfully!`)
      console.log(`📋 Reference ID: ${goldenRef.metadata.referenceId}`)
      console.log(`🎯 Composite Score: ${goldenRef.metadata.qualityScores.composite.toFixed(2)}`)
      console.log(`📁 Location: ${goldenRef.pdfPath}`)
    } else {
      // Submit for approval workflow
      const submission = await approvalWorkflow.submitForApproval(
        configId,
        sourcePath,
        mockQualityScores,
        approvedBy,
        'CLI submission for golden reference'
      )

      console.log(`📝 Submitted for approval: ${submission.submissionId}`)
      console.log(`🎯 Composite Score: ${submission.qualityScores.composite.toFixed(2)}`)
      console.log(`⏳ Status: Pending approval`)
      console.log(`💡 Use --approve flag to bypass approval workflow`)
    }

  } catch (error) {
    console.error(`❌ Failed to create golden reference:`, error)
    throw error
  }
}

export async function listGoldenReferences(filter?: string): Promise<void> {
  try {
    console.log('\n📋 Listing golden references...')
    if (filter) {
      console.log(`🔍 Filter: ${filter}`)
    }

    const references = await goldenRefManager.listGoldenReferences(filter)

    if (references.length === 0) {
      console.log('📭 No golden references found.')
      return
    }

    console.log(`\n📊 Found ${references.length} golden reference(s):\n`)

    for (const ref of references) {
      const config = ref.metadata.config
      console.log(`📑 ${ref.metadata.referenceId}`)
      console.log(`   Configuration: ${config.yearGroup} ${config.topic} (${config.difficulty}, ${config.questionCount}q)`)
      console.log(`   Quality Score: ${ref.metadata.qualityScores.composite.toFixed(2)}`)
      console.log(`   Version: ${ref.metadata.version}`)
      console.log(`   Approved: ${new Date(ref.metadata.approvalInfo.approvedDate).toLocaleDateString()}`)
      console.log(`   Location: ${ref.pdfPath}`)
      console.log('')
    }

  } catch (error) {
    console.error(`❌ Failed to list golden references:`, error)
    throw error
  }
}

export async function updateGoldenSet(batchApprovedDir: string): Promise<void> {
  try {
    console.log(`\n🔄 Updating golden reference set from: ${batchApprovedDir}`)

    const updatedCount = await goldenRefManager.updateGoldenSet(batchApprovedDir)

    console.log(`✅ Updated ${updatedCount} golden reference(s)`)

    if (updatedCount === 0) {
      console.log('💡 No valid approved outputs found in the specified directory')
      console.log('   Ensure the directory contains subdirectories with:')
      console.log('   - metadata.json with configId, qualityScores, and approvalInfo')
      console.log('   - worksheet.pdf file')
    }

  } catch (error) {
    console.error(`❌ Failed to update golden reference set:`, error)
    throw error
  }
}

export async function validateGoldenReferences(): Promise<void> {
  try {
    console.log('\n🔍 Validating all golden references...')

    const references = await goldenRefManager.listGoldenReferences()
    
    if (references.length === 0) {
      console.log('📭 No golden references found to validate.')
      return
    }

    const setValidation = await validator.validateGoldenReferenceSet(references)

    console.log(`\n📊 Validation Results:`)
    console.log(`   Total References: ${setValidation.totalReferences}`)
    console.log(`   Valid: ${setValidation.validReferences}`)
    console.log(`   Invalid: ${setValidation.invalidReferences}`)
    console.log(`   Overall Health: ${(setValidation.overallHealth * 100).toFixed(1)}%`)

    if (setValidation.coverageWarnings.length > 0) {
      console.log('\n⚠️  Coverage Warnings:')
      for (const warning of setValidation.coverageWarnings) {
        console.log(`   • ${warning}`)
      }
    }

    if (setValidation.invalidReferences > 0) {
      console.log('\n❌ Invalid References:')
      for (const result of setValidation.validationResults) {
        if (!result.result.isValid) {
          console.log(`   ${result.configId}:`)
          for (const issue of result.result.issues) {
            console.log(`     • ${issue}`)
          }
        }
      }
    }

    if (setValidation.overallHealth >= 0.8) {
      console.log('\n✅ Golden reference set is healthy!')
    } else {
      console.log('\n⚠️  Golden reference set needs attention.')
    }

  } catch (error) {
    console.error(`❌ Failed to validate golden references:`, error)
    throw error
  }
}

export async function deleteGoldenReference(configId: string): Promise<void> {
  try {
    console.log(`\n🗑️  Deleting golden reference: ${configId}`)

    // Check if reference exists first
    const existing = await goldenRefManager.getGoldenReference(configId)
    if (!existing) {
      console.log(`❌ Golden reference not found: ${configId}`)
      return
    }

    console.log(`📋 Found reference: ${existing.metadata.referenceId}`)
    console.log(`🎯 Quality Score: ${existing.metadata.qualityScores.composite.toFixed(2)}`)

    // In a real implementation, you might want to add a confirmation prompt
    const success = await goldenRefManager.deleteGoldenReference(configId)

    if (success) {
      console.log(`✅ Golden reference deleted successfully`)
    } else {
      console.log(`❌ Failed to delete golden reference`)
    }

  } catch (error) {
    console.error(`❌ Failed to delete golden reference:`, error)
    throw error
  }
}

export async function listPendingApprovals(): Promise<void> {
  try {
    console.log('\n📋 Listing pending approvals...')

    const pendingApprovals = await approvalWorkflow.getPendingApprovals({ status: 'pending' })

    if (pendingApprovals.length === 0) {
      console.log('📭 No pending approvals found.')
      return
    }

    console.log(`\n📊 Found ${pendingApprovals.length} pending approval(s):\n`)

    for (const approval of pendingApprovals) {
      console.log(`📝 ${approval.submissionId}`)
      console.log(`   Configuration: ${approval.configId}`)
      console.log(`   Quality Score: ${approval.qualityScores.composite.toFixed(2)}`)
      console.log(`   Submitted By: ${approval.submittedBy}`)
      console.log(`   Submitted: ${new Date(approval.submittedAt).toLocaleString()}`)
      console.log(`   Notes: ${approval.submissionNotes}`)
      console.log('')
    }

  } catch (error) {
    console.error(`❌ Failed to list pending approvals:`, error)
    throw error
  }
}

export async function approveSubmission(
  submissionId: string,
  reviewedBy: string = 'cli-user',
  reviewNotes: string = 'Approved via CLI'
): Promise<void> {
  try {
    console.log(`\n✅ Approving submission: ${submissionId}`)

    const result = await approvalWorkflow.reviewSubmission(
      submissionId,
      reviewedBy,
      reviewNotes,
      'approve'
    )

    if (result.success) {
      console.log(`✅ Submission approved successfully!`)
      if (result.goldenReference) {
        console.log(`📋 Golden Reference ID: ${result.goldenReference.metadata.referenceId}`)
        console.log(`🎯 Quality Score: ${result.goldenReference.metadata.qualityScores.composite.toFixed(2)}`)
      }
    } else {
      console.log(`❌ Failed to approve submission: ${result.message}`)
    }

  } catch (error) {
    console.error(`❌ Failed to approve submission:`, error)
    throw error
  }
}

export async function getApprovalStatistics(): Promise<void> {
  try {
    console.log('\n📊 Approval Statistics:')

    const stats = await approvalWorkflow.getApprovalStatistics()

    console.log(`   Total Pending: ${stats.totalPending}`)
    console.log(`   Total Approved: ${stats.totalApproved}`)
    console.log(`   Total Rejected: ${stats.totalRejected}`)
    console.log(`   Changes Requested: ${stats.totalChangesRequested}`)
    console.log(`   Average Quality Score: ${stats.averageQualityScore.toFixed(2)}`)
    console.log(`   Average Review Time: ${stats.averageReviewTime.toFixed(1)} hours`)

    if (Object.keys(stats.submissionsByUser).length > 0) {
      console.log('\n👥 Submissions by User:')
      for (const [user, count] of Object.entries(stats.submissionsByUser)) {
        console.log(`   ${user}: ${count}`)
      }
    }

    if (Object.keys(stats.approvalsByUser).length > 0) {
      console.log('\n✅ Approvals by Reviewer:')
      for (const [reviewer, count] of Object.entries(stats.approvalsByUser)) {
        console.log(`   ${reviewer}: ${count}`)
      }
    }

  } catch (error) {
    console.error(`❌ Failed to get approval statistics:`, error)
    throw error
  }
}