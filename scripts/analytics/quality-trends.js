#!/usr/bin/env node

/**
 * Cross-Config Quality Trends Analyzer
 *
 * Analyzes quality patterns across all configurations to identify:
 * - Common issues
 * - Problematic catalog entries
 * - Best practices
 * - System-wide health metrics
 */

const fs = require('fs').promises;
const path = require('path');

class QualityTrendAnalyzer {
  constructor() {
    this.reportsDir = path.join(process.cwd(), 'worksheet-quality-reports', 'autonomous-sessions');
  }

  /**
   * Load all final reports from autonomous sessions
   */
  async loadAllReports() {
    const reports = [];

    try {
      const sessions = await fs.readdir(this.reportsDir);

      for (const sessionDir of sessions) {
        const reportPath = path.join(this.reportsDir, sessionDir, 'FINAL-REPORT.json');

        try {
          const reportContent = await fs.readFile(reportPath, 'utf8');
          const report = JSON.parse(reportContent);
          reports.push(report);
        } catch (error) {
          // Skip if report doesn't exist or is invalid
        }
      }
    } catch (error) {
      console.warn('No reports directory found:', error.message);
    }

    return reports;
  }

  /**
   * Analyze all configs and generate system-wide trends
   */
  async analyzeAllConfigs() {
    const reports = await this.loadAllReports();

    if (reports.length === 0) {
      return {
        error: 'No quality reports found',
        recommendation: 'Run autonomous agent on at least one config first'
      };
    }

    const analysis = {
      summary: this.generateSummary(reports),
      commonIssues: this.findCommonIssues(reports),
      catalogHealth: this.analyzeCatalogHealth(reports),
      configPerformance: this.rankConfigs(reports),
      fixEffectiveness: this.analyzeFixEffectiveness(reports),
      recommendations: []
    };

    // Generate recommendations
    analysis.recommendations = this.generateRecommendations(analysis);

    return analysis;
  }

  /**
   * Generate summary statistics
   */
  generateSummary(reports) {
    const totalConfigs = reports.length;
    const productionReady = reports.filter(r => r.productionReady).length;
    const totalCycles = reports.reduce((sum, r) => sum + r.totalCycles, 0);
    const totalFixes = reports.reduce((sum, r) => sum + r.fixesApplied.length, 0);

    const avgFirstCyclePassRate = reports.reduce((sum, r) =>
      sum + (r.summary.firstCyclePassRate || 0), 0) / totalConfigs;

    const avgFinalPassRate = reports.reduce((sum, r) =>
      sum + (r.summary.lastCyclePassRate || 0), 0) / totalConfigs;

    const avgImprovement = avgFinalPassRate - avgFirstCyclePassRate;

    return {
      totalConfigs,
      productionReady,
      productionReadyRate: ((productionReady / totalConfigs) * 100).toFixed(1) + '%',
      avgCyclesPerConfig: (totalCycles / totalConfigs).toFixed(1),
      totalFixesApplied: totalFixes,
      avgFixesPerConfig: (totalFixes / totalConfigs).toFixed(1),
      avgFirstCyclePassRate: (avgFirstCyclePassRate * 100).toFixed(1) + '%',
      avgFinalPassRate: (avgFinalPassRate * 100).toFixed(1) + '%',
      avgImprovement: (avgImprovement * 100).toFixed(1) + '%'
    };
  }

  /**
   * Find most common issues across all configs
   */
  findCommonIssues(reports) {
    const issueFrequency = new Map();
    const issuesByConfig = new Map();

    for (const report of reports) {
      const configId = report.configId;

      for (const fix of report.fixesApplied) {
        const issueType = fix.type;

        // Count frequency
        const count = issueFrequency.get(issueType) || 0;
        issueFrequency.set(issueType, count + 1);

        // Track which configs had this issue
        if (!issuesByConfig.has(issueType)) {
          issuesByConfig.set(issueType, new Set());
        }
        issuesByConfig.get(issueType).add(configId);
      }
    }

    // Convert to sorted array
    const issues = Array.from(issueFrequency.entries())
      .map(([type, count]) => ({
        issueType: type,
        occurrences: count,
        affectedConfigs: issuesByConfig.get(type).size,
        configList: Array.from(issuesByConfig.get(type))
      }))
      .sort((a, b) => b.occurrences - a.occurrences);

    return issues;
  }

  /**
   * Analyze catalog entry health
   */
  analyzeCatalogHealth(reports) {
    const catalogMentions = new Map();
    const catalogIssues = new Map();

    for (const report of reports) {
      // Parse fix messages for catalog references
      for (const fix of report.fixesApplied) {
        if (fix.type.includes('CATALOG') || fix.type.includes('vision')) {
          const message = fix.message.toLowerCase();

          // Extract collection names (simplified pattern)
          const collectionPattern = /([a-z_]+)_by_scrappindoodles/gi;
          const matches = message.matchAll(collectionPattern);

          for (const match of matches) {
            const collection = match[0];

            // Track mentions
            const mentions = catalogMentions.get(collection) || { uses: 0, issues: 0 };
            mentions.uses++;

            // Track if this was an issue
            if (fix.message.includes('priority') || fix.message.includes('wrong') ||
                fix.message.includes('incorrect') || fix.message.includes('mismatch')) {
              mentions.issues++;

              // Track specific issue
              if (!catalogIssues.has(collection)) {
                catalogIssues.set(collection, []);
              }
              catalogIssues.get(collection).push({
                configId: report.configId,
                issue: fix.message
              });
            }

            catalogMentions.set(collection, mentions);
          }
        }
      }
    }

    // Calculate health scores
    const catalogHealth = Array.from(catalogMentions.entries())
      .map(([collection, data]) => ({
        collection,
        totalUses: data.uses,
        issueCount: data.issues,
        successRate: ((data.uses - data.issues) / data.uses * 100).toFixed(1) + '%',
        health: data.issues === 0 ? '🟢 HEALTHY' :
                data.issues < data.uses * 0.3 ? '🟡 MONITOR' : '🔴 PROBLEMATIC',
        issues: catalogIssues.get(collection) || []
      }))
      .sort((a, b) => parseInt(b.successRate) - parseInt(a.successRate));

    return catalogHealth;
  }

  /**
   * Rank configs by performance
   */
  rankConfigs(reports) {
    return reports.map(r => ({
      configId: r.configId,
      productionReady: r.productionReady,
      finalPassRate: (r.summary.lastCyclePassRate * 100).toFixed(1) + '%',
      cycles: r.totalCycles,
      fixes: r.fixesApplied.length,
      improvement: r.summary.improvement,
      grade: this.calculateGrade(r)
    })).sort((a, b) => parseFloat(b.finalPassRate) - parseFloat(a.finalPassRate));
  }

  /**
   * Calculate overall grade for a config
   */
  calculateGrade(report) {
    const passRate = report.summary.lastCyclePassRate || 0;
    const cycles = report.totalCycles;
    const productionReady = report.productionReady;

    if (productionReady && passRate >= 0.95 && cycles <= 2) return 'A+ 🌟';
    if (productionReady && passRate >= 0.90 && cycles <= 3) return 'A';
    if (productionReady && passRate >= 0.85) return 'B+';
    if (passRate >= 0.70) return 'B';
    if (passRate >= 0.50) return 'C';
    return 'D';
  }

  /**
   * Analyze fix effectiveness
   */
  analyzeFixEffectiveness(reports) {
    const fixTypes = new Map();

    for (const report of reports) {
      for (let i = 0; i < report.cycleHistory.length; i++) {
        const cycle = report.cycleHistory[i];

        for (const fix of cycle.fixes) {
          if (!fixTypes.has(fix.type)) {
            fixTypes.set(fix.type, {
              type: fix.type,
              applications: 0,
              successfulResolutions: 0,
              avgCyclesAfterFix: []
            });
          }

          const fixData = fixTypes.get(fix.type);
          fixData.applications++;

          // Check if next cycle improved
          if (i < report.cycleHistory.length - 1) {
            const nextCycle = report.cycleHistory[i + 1];
            const thisPassRate = cycle.analysis.passRate;
            const nextPassRate = nextCycle.analysis.passRate;

            if (nextPassRate > thisPassRate) {
              fixData.successfulResolutions++;
            }

            fixData.avgCyclesAfterFix.push(report.totalCycles - (i + 1));
          }
        }
      }
    }

    // Calculate effectiveness
    return Array.from(fixTypes.values()).map(fix => ({
      ...fix,
      successRate: ((fix.successfulResolutions / fix.applications) * 100).toFixed(1) + '%',
      avgCyclesAfterFix: fix.avgCyclesAfterFix.length > 0 ?
        (fix.avgCyclesAfterFix.reduce((a, b) => a + b, 0) / fix.avgCyclesAfterFix.length).toFixed(1) : 'N/A'
    })).sort((a, b) => parseFloat(b.successRate) - parseFloat(a.successRate));
  }

  /**
   * Generate recommendations based on analysis
   */
  generateRecommendations(analysis) {
    const recommendations = [];

    // Recommendation 1: Common issues
    if (analysis.commonIssues.length > 0) {
      const topIssue = analysis.commonIssues[0];
      recommendations.push({
        priority: 'P0',
        category: 'Common Issues',
        issue: `"${topIssue.issueType}" occurred ${topIssue.occurrences} times across ${topIssue.affectedConfigs} configs`,
        recommendation: `Create systematic fix for ${topIssue.issueType} to prevent recurrence`,
        action: 'Add to fix-registry.js as high-priority fix'
      });
    }

    // Recommendation 2: Problematic catalogs
    const problematicCatalogs = analysis.catalogHealth.filter(c => c.health === '🔴 PROBLEMATIC');
    if (problematicCatalogs.length > 0) {
      recommendations.push({
        priority: 'P1',
        category: 'Catalog Health',
        issue: `${problematicCatalogs.length} catalog collection(s) have high failure rates`,
        recommendation: `Review and adjust priorities for: ${problematicCatalogs.map(c => c.collection).join(', ')}`,
        action: 'Investigate these collections in master-vision-catalog.json'
      });
    }

    // Recommendation 3: Low production-ready rate
    const prodReadyRate = parseFloat(analysis.summary.productionReadyRate);
    if (prodReadyRate < 80) {
      recommendations.push({
        priority: 'P0',
        category: 'Production Readiness',
        issue: `Only ${analysis.summary.productionReadyRate} of configs reached production-ready`,
        recommendation: 'Review quality gates and fix effectiveness',
        action: 'Lower quality thresholds OR improve auto-fix coverage'
      });
    }

    // Recommendation 4: Ineffective fixes
    const ineffectiveFixes = analysis.fixEffectiveness.filter(f => parseFloat(f.successRate) < 50);
    if (ineffectiveFixes.length > 0) {
      recommendations.push({
        priority: 'P2',
        category: 'Fix Effectiveness',
        issue: `${ineffectiveFixes.length} fix type(s) have <50% success rate`,
        recommendation: `Improve or replace fixes: ${ineffectiveFixes.map(f => f.type).join(', ')}`,
        action: 'Review fix logic in fix-registry.js'
      });
    }

    return recommendations;
  }

  /**
   * Generate markdown report
   */
  async generateMarkdownReport(analysis) {
    let report = `# Worksheet Quality System - Trend Analysis\n\n`;
    report += `**Generated**: ${new Date().toISOString()}\n`;
    report += `**Total Configs Analyzed**: ${analysis.summary.totalConfigs}\n\n`;

    report += `---\n\n## 📊 System Summary\n\n`;
    report += `| Metric | Value |\n`;
    report += `|--------|-------|\n`;
    report += `| Total Configs Tested | ${analysis.summary.totalConfigs} |\n`;
    report += `| Production Ready | ${analysis.summary.productionReady} (${analysis.summary.productionReadyRate}) |\n`;
    report += `| Avg Cycles Per Config | ${analysis.summary.avgCyclesPerConfig} |\n`;
    report += `| Total Fixes Applied | ${analysis.summary.totalFixesApplied} |\n`;
    report += `| Avg First Cycle Pass Rate | ${analysis.summary.avgFirstCyclePassRate} |\n`;
    report += `| Avg Final Pass Rate | ${analysis.summary.avgFinalPassRate} |\n`;
    report += `| Avg Improvement | ${analysis.summary.avgImprovement} |\n\n`;

    report += `---\n\n## 🔍 Most Common Issues\n\n`;
    if (analysis.commonIssues.length > 0) {
      analysis.commonIssues.slice(0, 10).forEach((issue, i) => {
        report += `${i + 1}. **${issue.issueType}**\n`;
        report += `   - Occurrences: ${issue.occurrences}\n`;
        report += `   - Affected Configs: ${issue.affectedConfigs}\n`;
        report += `   - Configs: ${issue.configList.join(', ')}\n\n`;
      });
    } else {
      report += `No issues detected (all configs production-ready on first try!)\n\n`;
    }

    report += `---\n\n## 🗂️ Catalog Health\n\n`;
    if (analysis.catalogHealth.length > 0) {
      analysis.catalogHealth.slice(0, 10).forEach((catalog) => {
        report += `### ${catalog.health} ${catalog.collection}\n`;
        report += `- Total Uses: ${catalog.totalUses}\n`;
        report += `- Issues: ${catalog.issueCount}\n`;
        report += `- Success Rate: ${catalog.successRate}\n\n`;
      });
    } else {
      report += `No catalog data available yet.\n\n`;
    }

    report += `---\n\n## 🏆 Config Rankings\n\n`;
    report += `| Rank | Config | Grade | Pass Rate | Cycles | Fixes |\n`;
    report += `|------|--------|-------|-----------|--------|-------|\n`;
    analysis.configPerformance.forEach((config, i) => {
      report += `| ${i + 1} | ${config.configId} | ${config.grade} | ${config.finalPassRate} | ${config.cycles} | ${config.fixes} |\n`;
    });
    report += `\n`;

    report += `---\n\n## 🔧 Fix Effectiveness\n\n`;
    report += `| Fix Type | Applications | Success Rate | Avg Cycles After |\n`;
    report += `|----------|--------------|--------------|------------------|\n`;
    analysis.fixEffectiveness.forEach(fix => {
      report += `| ${fix.type} | ${fix.applications} | ${fix.successRate} | ${fix.avgCyclesAfterFix} |\n`;
    });
    report += `\n`;

    report += `---\n\n## 💡 Recommendations\n\n`;
    if (analysis.recommendations.length > 0) {
      analysis.recommendations.forEach((rec, i) => {
        report += `### ${i + 1}. [${rec.priority}] ${rec.category}\n\n`;
        report += `**Issue**: ${rec.issue}\n\n`;
        report += `**Recommendation**: ${rec.recommendation}\n\n`;
        report += `**Action**: ${rec.action}\n\n`;
      });
    } else {
      report += `No recommendations - system performing optimally! 🎉\n\n`;
    }

    return report;
  }

  /**
   * Save analysis report
   */
  async saveReport(analysis) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const reportDir = path.join(process.cwd(), 'worksheet-quality-reports', 'system-trends');
    await fs.mkdir(reportDir, { recursive: true });

    // Save JSON
    const jsonPath = path.join(reportDir, `trend-analysis-${timestamp}.json`);
    await fs.writeFile(jsonPath, JSON.stringify(analysis, null, 2));

    // Save Markdown
    const markdown = await this.generateMarkdownReport(analysis);
    const mdPath = path.join(reportDir, `trend-analysis-${timestamp}.md`);
    await fs.writeFile(mdPath, markdown);

    console.log(`\n📊 Trend Analysis Report Generated:`);
    console.log(`   JSON: ${jsonPath}`);
    console.log(`   Markdown: ${mdPath}`);

    return { jsonPath, mdPath };
  }
}

// CLI execution
if (require.main === module) {
  const analyzer = new QualityTrendAnalyzer();

  analyzer.analyzeAllConfigs().then(async (analysis) => {
    if (analysis.error) {
      console.error(`❌ ${analysis.error}`);
      console.log(`💡 ${analysis.recommendation}`);
      process.exit(1);
    }

    await analyzer.saveReport(analysis);

    console.log(`\n✅ Analysis complete!`);
    console.log(`   Configs analyzed: ${analysis.summary.totalConfigs}`);
    console.log(`   Production ready: ${analysis.summary.productionReadyRate}`);
    console.log(`   Common issues: ${analysis.commonIssues.length}`);
    console.log(`   Recommendations: ${analysis.recommendations.length}`);
  }).catch(error => {
    console.error('❌ Analysis failed:', error);
    process.exit(1);
  });
}

module.exports = QualityTrendAnalyzer;
