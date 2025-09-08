/**
 * Golden Reference Versioning System
 * Manages version control for golden references
 */

import fs from 'fs/promises'
import path from 'path'
import { GoldenReference, GoldenReferenceMetadata } from '../types/engine-types'

export class GoldenReferenceVersioning {
  private goldenRefsPath: string

  constructor(goldenRefsPath: string = './golden-references') {
    this.goldenRefsPath = goldenRefsPath
  }

  async getVersionHistory(configId: string): Promise<VersionHistoryEntry[]> {
    const versionsDir = path.join(this.goldenRefsPath, configId, 'versions')
    const history: VersionHistoryEntry[] = []

    try {
      // Check if versions directory exists
      await fs.access(versionsDir)
      
      const versionDirs = await fs.readdir(versionsDir, { withFileTypes: true })
      
      for (const versionDir of versionDirs.filter(d => d.isDirectory())) {
        const versionPath = path.join(versionsDir, versionDir.name)
        const metadataPath = path.join(versionPath, 'metadata.json')
        
        try {
          const metadataContent = await fs.readFile(metadataPath, 'utf-8')
          const metadata: GoldenReferenceMetadata = JSON.parse(metadataContent)
          
          history.push({
            version: metadata.version,
            timestamp: metadata.approvalInfo.approvedDate,
            approvedBy: metadata.approvalInfo.approvedBy,
            qualityScore: metadata.qualityScores.composite,
            notes: metadata.approvalInfo.approvalNotes,
            path: versionPath
          })
        } catch (error) {
          // Skip invalid version directories
          continue
        }
      }

      // Sort by version (descending)
      history.sort((a, b) => this.compareVersions(b.version, a.version))
      
    } catch (error) {
      // No versions directory or other error - return empty history
    }

    return history
  }

  async createNewVersion(
    configId: string, 
    currentRef: GoldenReference,
    changeNotes: string
  ): Promise<GoldenReference> {
    // Archive current version before creating new one
    await this.archiveCurrentVersion(configId, currentRef)
    
    // Generate new version number
    const newVersion = await this.generateNextVersion(configId)
    
    // Update metadata with new version
    const newMetadata: GoldenReferenceMetadata = {
      ...currentRef.metadata,
      version: newVersion,
      approvalInfo: {
        ...currentRef.metadata.approvalInfo,
        approvedDate: new Date().toISOString(),
        approvalNotes: changeNotes
      }
    }

    // Update metadata file
    const refDir = path.join(this.goldenRefsPath, configId)
    await fs.writeFile(
      path.join(refDir, 'metadata.json'),
      JSON.stringify(newMetadata, null, 2)
    )

    return {
      ...currentRef,
      metadata: newMetadata
    }
  }

  async rollbackToVersion(configId: string, targetVersion: string): Promise<boolean> {
    try {
      const versionsDir = path.join(this.goldenRefsPath, configId, 'versions')
      const targetVersionDir = path.join(versionsDir, `v${targetVersion}`)
      const refDir = path.join(this.goldenRefsPath, configId)

      // Check if target version exists
      await fs.access(targetVersionDir)

      // Archive current version
      const currentRef = await this.getCurrentReference(configId)
      if (currentRef) {
        await this.archiveCurrentVersion(configId, currentRef, 'Pre-rollback backup')
      }

      // Copy target version files to main reference directory
      const targetFiles = await fs.readdir(targetVersionDir)
      
      for (const file of targetFiles) {
        const sourcePath = path.join(targetVersionDir, file)
        const destPath = path.join(refDir, file)
        
        await fs.copyFile(sourcePath, destPath)
      }

      // Update metadata to reflect rollback
      const metadataPath = path.join(refDir, 'metadata.json')
      const metadataContent = await fs.readFile(metadataPath, 'utf-8')
      const metadata = JSON.parse(metadataContent)
      
      metadata.approvalInfo.approvalNotes += ` [Rolled back from ${metadata.version} to ${targetVersion}]`
      metadata.version = targetVersion
      
      await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2))

      return true
    } catch (error) {
      return false
    }
  }

  async compareVersions(configId: string, version1: string, version2: string): Promise<VersionComparison | null> {
    try {
      const versionsDir = path.join(this.goldenRefsPath, configId, 'versions')
      
      const version1Metadata = await this.getVersionMetadata(versionsDir, version1)
      const version2Metadata = await this.getVersionMetadata(versionsDir, version2)

      if (!version1Metadata || !version2Metadata) {
        return null
      }

      const scoreDifference = version2Metadata.qualityScores.composite - version1Metadata.qualityScores.composite
      
      return {
        version1: {
          version: version1,
          qualityScore: version1Metadata.qualityScores.composite,
          approvedBy: version1Metadata.approvalInfo.approvedBy,
          timestamp: version1Metadata.approvalInfo.approvedDate
        },
        version2: {
          version: version2,
          qualityScore: version2Metadata.qualityScores.composite,
          approvedBy: version2Metadata.approvalInfo.approvedBy,
          timestamp: version2Metadata.approvalInfo.approvedDate
        },
        scoreDifference,
        recommendation: scoreDifference > 0.5 
          ? `Version ${version2} shows significant improvement (+${scoreDifference.toFixed(2)})` 
          : scoreDifference < -0.5 
          ? `Version ${version1} performed better (+${Math.abs(scoreDifference).toFixed(2)})` 
          : 'Versions show similar quality scores'
      }
    } catch (error) {
      return null
    }
  }

  async pruneOldVersions(configId: string, keepVersions: number = 10): Promise<number> {
    try {
      const history = await this.getVersionHistory(configId)
      
      if (history.length <= keepVersions) {
        return 0 // Nothing to prune
      }

      const versionsToDelete = history.slice(keepVersions)
      let deletedCount = 0

      for (const versionEntry of versionsToDelete) {
        try {
          await fs.rm(versionEntry.path, { recursive: true, force: true })
          deletedCount++
        } catch (error) {
          // Log error but continue with other versions
          console.warn(`Failed to delete version ${versionEntry.version}:`, error)
        }
      }

      return deletedCount
    } catch (error) {
      return 0
    }
  }

  private async archiveCurrentVersion(
    configId: string, 
    currentRef: GoldenReference, 
    notes: string = 'Archived during version update'
  ): Promise<void> {
    const versionsDir = path.join(this.goldenRefsPath, configId, 'versions')
    const versionDir = path.join(versionsDir, `v${currentRef.metadata.version}`)
    
    await fs.mkdir(versionDir, { recursive: true })

    // Copy current files to version directory
    const refDir = path.join(this.goldenRefsPath, configId)
    const filesToCopy = [
      'metadata.json',
      'quality-scores.json',
      'approval-record.json',
      'reference.pdf'
    ]

    // Check if HTML file exists and add to copy list
    try {
      await fs.access(path.join(refDir, 'reference.html'))
      filesToCopy.push('reference.html')
    } catch {
      // HTML file doesn't exist, skip it
    }

    for (const filename of filesToCopy) {
      try {
        const sourcePath = path.join(refDir, filename)
        const destPath = path.join(versionDir, filename)
        await fs.copyFile(sourcePath, destPath)
      } catch (error) {
        // Log error but continue
        console.warn(`Failed to copy ${filename} during archiving:`, error)
      }
    }

    // Add archive metadata
    const archiveInfo = {
      archivedAt: new Date().toISOString(),
      archivedReason: notes,
      originalVersion: currentRef.metadata.version
    }

    await fs.writeFile(
      path.join(versionDir, 'archive-info.json'),
      JSON.stringify(archiveInfo, null, 2)
    )
  }

  private async getCurrentReference(configId: string): Promise<GoldenReference | null> {
    try {
      const refDir = path.join(this.goldenRefsPath, configId)
      const metadataPath = path.join(refDir, 'metadata.json')
      
      const metadataContent = await fs.readFile(metadataPath, 'utf-8')
      const metadata: GoldenReferenceMetadata = JSON.parse(metadataContent)
      
      return {
        metadata,
        pdfPath: path.join(refDir, 'reference.pdf'),
        htmlPath: path.join(refDir, 'reference.html')
      }
    } catch (error) {
      return null
    }
  }

  private async generateNextVersion(configId: string): Promise<string> {
    const history = await this.getVersionHistory(configId)
    
    if (history.length === 0) {
      return '1.0'
    }

    // Get the latest version and increment
    const latestVersion = history[0].version
    const versionParts = latestVersion.split('.')
    const major = parseInt(versionParts[0])
    const minor = parseInt(versionParts[1])
    
    // Increment minor version
    return `${major}.${minor + 1}`
  }

  private async getVersionMetadata(versionsDir: string, version: string): Promise<GoldenReferenceMetadata | null> {
    try {
      const versionDir = path.join(versionsDir, `v${version}`)
      const metadataPath = path.join(versionDir, 'metadata.json')
      
      const metadataContent = await fs.readFile(metadataPath, 'utf-8')
      return JSON.parse(metadataContent)
    } catch (error) {
      return null
    }
  }

  private compareVersions(version1: string, version2: string): number {
    const v1Parts = version1.split('.').map(Number)
    const v2Parts = version2.split('.').map(Number)
    
    for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
      const v1Part = v1Parts[i] || 0
      const v2Part = v2Parts[i] || 0
      
      if (v1Part !== v2Part) {
        return v1Part - v2Part
      }
    }
    
    return 0
  }
}

export interface VersionHistoryEntry {
  version: string
  timestamp: string
  approvedBy: string
  qualityScore: number
  notes: string
  path: string
}

export interface VersionInfo {
  version: string
  qualityScore: number
  approvedBy: string
  timestamp: string
}

export interface VersionComparison {
  version1: VersionInfo
  version2: VersionInfo
  scoreDifference: number
  recommendation: string
}