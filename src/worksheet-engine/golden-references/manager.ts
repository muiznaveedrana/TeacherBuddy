/**
 * Golden Reference Manager
 * Handles CRUD operations for golden references
 */

import fs from 'fs/promises'
import path from 'path'
import { GoldenReference, GoldenReferenceMetadata, QualityScores } from '../types/engine-types'

export class GoldenReferenceManager {
  private goldenRefsPath: string

  constructor(goldenRefsPath: string = './golden-references') {
    this.goldenRefsPath = goldenRefsPath
  }

  async createGoldenReference(
    configId: string,
    sourcePdfPath: string,
    qualityScores: QualityScores,
    approvedBy: string,
    approvalNotes: string,
    sourceHtmlPath?: string
  ): Promise<GoldenReference> {
    await this.ensureGoldenReferencesDirectory()

    // Parse config from configId
    const config = this.parseConfigId(configId)
    const version = await this.getNextVersion(configId)
    const referenceId = `${configId}-v${version}`
    
    const metadata: GoldenReferenceMetadata = {
      referenceId,
      config,
      qualityScores,
      approvalInfo: {
        approvedBy,
        approvedDate: new Date().toISOString(),
        approvalNotes
      },
      version,
      createdFrom: sourcePdfPath
    }

    // Create reference directory
    const refDir = path.join(this.goldenRefsPath, configId)
    await fs.mkdir(refDir, { recursive: true })

    // Copy PDF and HTML files
    const pdfPath = path.join(refDir, 'reference.pdf')
    const htmlPath = sourceHtmlPath ? path.join(refDir, 'reference.html') : undefined
    
    await fs.copyFile(sourcePdfPath, pdfPath)
    if (sourceHtmlPath && htmlPath) {
      await fs.copyFile(sourceHtmlPath, htmlPath)
    }

    // Save metadata
    await fs.writeFile(
      path.join(refDir, 'metadata.json'),
      JSON.stringify(metadata, null, 2)
    )

    // Save quality scores
    await fs.writeFile(
      path.join(refDir, 'quality-scores.json'),
      JSON.stringify(qualityScores, null, 2)
    )

    // Save approval record
    await fs.writeFile(
      path.join(refDir, 'approval-record.json'),
      JSON.stringify(metadata.approvalInfo, null, 2)
    )

    // Update master index
    await this.updateMasterIndex(configId, referenceId)

    const goldenRef: GoldenReference = {
      metadata,
      pdfPath,
      htmlPath
    }

    return goldenRef
  }

  async getGoldenReference(configId: string): Promise<GoldenReference | null> {
    try {
      const refDir = path.join(this.goldenRefsPath, configId)
      const metadataPath = path.join(refDir, 'metadata.json')
      
      const metadataContent = await fs.readFile(metadataPath, 'utf-8')
      const metadata: GoldenReferenceMetadata = JSON.parse(metadataContent)
      
      const pdfPath = path.join(refDir, 'reference.pdf')
      const htmlPath = path.join(refDir, 'reference.html')
      
      // Check if HTML file exists
      let htmlExists = false
      try {
        await fs.access(htmlPath)
        htmlExists = true
      } catch {
        // HTML file doesn't exist, which is fine
      }

      return {
        metadata,
        pdfPath,
        htmlPath: htmlExists ? htmlPath : undefined
      }
    } catch (error) {
      return null
    }
  }

  async listGoldenReferences(filter?: string): Promise<GoldenReference[]> {
    try {
      await this.ensureGoldenReferencesDirectory()
      
      const entries = await fs.readdir(this.goldenRefsPath, { withFileTypes: true })
      const configDirs = entries
        .filter(entry => entry.isDirectory())
        .map(entry => entry.name)
        .filter(name => !filter || name.includes(filter))

      const references: GoldenReference[] = []
      
      for (const configId of configDirs) {
        const ref = await this.getGoldenReference(configId)
        if (ref) {
          references.push(ref)
        }
      }

      return references
    } catch (error) {
      return []
    }
  }

  async deleteGoldenReference(configId: string): Promise<boolean> {
    try {
      const refDir = path.join(this.goldenRefsPath, configId)
      await fs.rm(refDir, { recursive: true, force: true })
      
      // Update master index
      await this.removeFromMasterIndex(configId)
      
      return true
    } catch (error) {
      return false
    }
  }

  async updateGoldenSet(batchApprovedDir: string): Promise<number> {
    let updatedCount = 0
    
    try {
      const entries = await fs.readdir(batchApprovedDir, { withFileTypes: true })
      
      for (const entry of entries) {
        if (entry.isDirectory()) {
          const approvedDir = path.join(batchApprovedDir, entry.name)
          const metadataPath = path.join(approvedDir, 'metadata.json')
          
          try {
            // Check if this is a valid approved output directory
            const metadataContent = await fs.readFile(metadataPath, 'utf-8')
            const metadata = JSON.parse(metadataContent)
            
            if (metadata.configId && metadata.qualityScores && metadata.approvalInfo) {
              const pdfPath = path.join(approvedDir, 'worksheet.pdf')
              const htmlPath = path.join(approvedDir, 'worksheet.html')
              
              await this.createGoldenReference(
                metadata.configId,
                pdfPath,
                metadata.qualityScores,
                metadata.approvalInfo.approvedBy,
                metadata.approvalInfo.approvalNotes,
                htmlPath
              )
              
              updatedCount++
            }
          } catch (error) {
            // Skip invalid directories
            continue
          }
        }
      }
    } catch (error) {
      throw new Error(`Failed to update golden set: ${error}`)
    }

    return updatedCount
  }

  private parseConfigId(configId: string) {
    // Parse configId like "year3-addition-standard-average-5q"
    const parts = configId.split('-')
    
    return {
      layout: parts.includes('standard') ? 'standard' : 'custom',
      yearGroup: parts[0].charAt(0).toUpperCase() + parts[0].slice(1),
      topic: parts[1],
      subtopic: parts[2] || 'general',
      difficulty: parts[3] || 'average',
      questionCount: parseInt(parts[parts.length - 1].replace('q', '')) || 5
    }
  }

  private async getNextVersion(configId: string): Promise<string> {
    try {
      const refDir = path.join(this.goldenRefsPath, configId)
      const metadataPath = path.join(refDir, 'metadata.json')
      
      const metadataContent = await fs.readFile(metadataPath, 'utf-8')
      const metadata: GoldenReferenceMetadata = JSON.parse(metadataContent)
      
      const currentVersion = parseFloat(metadata.version)
      const newVersion = (currentVersion + 0.1).toFixed(1)
      
      return newVersion
    } catch (error) {
      // First version
      return '1.0'
    }
  }

  private async ensureGoldenReferencesDirectory(): Promise<void> {
    await fs.mkdir(this.goldenRefsPath, { recursive: true })
  }

  private async updateMasterIndex(configId: string, referenceId: string): Promise<void> {
    const indexPath = path.join(this.goldenRefsPath, 'index.json')
    
    let index: Record<string, string> = {}
    
    try {
      const indexContent = await fs.readFile(indexPath, 'utf-8')
      index = JSON.parse(indexContent)
    } catch (error) {
      // Index doesn't exist yet
    }

    index[configId] = referenceId
    
    await fs.writeFile(indexPath, JSON.stringify(index, null, 2))
  }

  private async removeFromMasterIndex(configId: string): Promise<void> {
    const indexPath = path.join(this.goldenRefsPath, 'index.json')
    
    try {
      const indexContent = await fs.readFile(indexPath, 'utf-8')
      const index = JSON.parse(indexContent)
      
      delete index[configId]
      
      await fs.writeFile(indexPath, JSON.stringify(index, null, 2))
    } catch (error) {
      // Index doesn't exist, nothing to remove
    }
  }
}