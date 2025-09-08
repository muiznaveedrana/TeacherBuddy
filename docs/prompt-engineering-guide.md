# Worksheet Generator - Prompt Engineering Guide

## Overview

This guide explains how to use the Worksheet Generator's story-engine system for systematic prompt optimization and quality assurance. The story-engine provides a comprehensive CLI-based framework that enables data-driven prompt engineering with statistical validation and quality measurement.

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Getting Started](#getting-started)
3. [Core Concepts](#core-concepts)
4. [Prompt Engineering Workflow](#prompt-engineering-workflow)
5. [Command Reference](#command-reference)
6. [Quality Assessment Framework](#quality-assessment-framework)
7. [A/B Testing & Statistical Analysis](#ab-testing--statistical-analysis)
8. [Golden Reference System](#golden-reference-system)
9. [Best Practices](#best-practices)
10. [Troubleshooting](#troubleshooting)

## System Architecture

The story-engine consists of three integrated components:

### 1. Core Engine Infrastructure (Story 1.1)
- CLI interface for worksheet generation
- Integration with existing prompt services
- Configuration management and output handling

### 2. Quality Assessment Framework (Story 1.2)
- Multi-dimensional quality scoring (0-10 scale)
- Automated assessment pipeline
- Detailed reporting with recommendations

### 3. Golden Reference & A/B Testing (Story 1.3)
- Golden reference management system
- Statistical A/B testing framework
- Quality gates and regression detection

## Getting Started

### Prerequisites

1. **Environment Setup**
   ```bash
   # Ensure GEMINI_API_KEY is set
   export GEMINI_API_KEY="your-api-key"
   
   # Verify CLI is accessible
   npm run worksheet-engine -- --help
   ```

2. **Basic CLI Test**
   ```bash
   # List available configurations
   ./worksheet-engine --list-configs
   
   # Generate a basic worksheet
   ./worksheet-engine --config="year3-addition-standard-average-5q" --output-dir="./test-output"
   ```

### Available Worksheet Configurations

The system supports 5 predefined worksheet configurations:

| Config ID | Year Group | Topic | Difficulty | Questions |
|-----------|------------|-------|------------|-----------|
| `year3-addition-standard-average-5q` | Year 3 | Addition/Subtraction | Average | 5 |
| `year3-subtraction-standard-average-5q` | Year 3 | Subtraction | Average | 5 |
| `year4-multiplication-fluency-easy-10q` | Year 4 | Multiplication | Easy | 10 |
| `year4-multiplication-fluency-hard-10q` | Year 4 | Multiplication | Hard | 10 |
| `year5-fractions-reasoning-easy-3q` | Year 5 | Fractions | Easy | 3 |

## Core Concepts

### Prompt Variants

Prompt variants allow you to test different prompt engineering approaches:

- **baseline** - Current production prompt
- **enhanced-v1** - Improved layout instructions
- **enhanced-v2** - Enhanced SVG integration
- **custom-variant** - Your experimental variants

### Quality Dimensions

The assessment framework evaluates worksheets across three dimensions:

1. **Visual Similarity (30% weight)**
   - Layout consistency
   - Element positioning
   - Visual alignment

2. **Content Analysis (40% weight)**
   - Curriculum alignment
   - Age-appropriate language
   - Mathematical accuracy

3. **Rule-Based Layout (30% weight)**
   - Font consistency
   - Spacing quality
   - Element positioning

### Composite Scoring

The system calculates weighted composite scores:
```
Composite Score = (Visual × 0.30) + (Content × 0.40) + (Layout × 0.30)
```

## Prompt Engineering Workflow

### Phase 1: Baseline Establishment

**Step 1: Generate baseline worksheet with assessment**
```bash
./worksheet-engine \
  --config="year3-addition-standard-average-5q" \
  --prompt-variant="baseline" \
  --assess \
  --output-dir="./baseline-001"
```

**Step 2: Review baseline results**
```bash
# Check the assessment results
cat ./baseline-001/assessment-results.json
```

**Expected Output Structure:**
```
./baseline-001/
├── config.json              # Input configuration
├── worksheet.html           # Generated HTML
├── worksheet.pdf            # Generated PDF
├── generation-log.json      # Generation metadata
├── engine-metadata.json     # Engine-specific metadata
└── assessment-results.json  # Quality assessment results
```

### Phase 2: Golden Reference Creation

**Create golden reference from high-scoring baseline**
```bash
./worksheet-engine \
  --create-golden \
  --config="year3-addition-standard-average-5q" \
  --source="./baseline-001/worksheet.pdf" \
  --approve
```

**List and validate golden references**
```bash
# List all golden references
./worksheet-engine --list-golden

# Validate golden reference integrity
./worksheet-engine --validate-golden
```

### Phase 3: Prompt Variant Development

**Test single variant against golden reference**
```bash
./worksheet-engine \
  --config="year3-addition-standard-average-5q" \
  --prompt-variant="enhanced-v1" \
  --assess \
  --golden-ref="./golden-references/year3-addition-standard-average-5q/reference.pdf" \
  --output-dir="./variant-test-001"
```

### Phase 4: A/B Testing

**Run statistical A/B test with multiple variants**
```bash
./worksheet-engine \
  --ab-test \
  --config="year3-addition-standard-average-5q" \
  --variants="baseline,enhanced-v1,enhanced-v2" \
  --iterations=5 \
  --parallel \
  --output-dir="./ab-test-001"
```

**A/B Test Results Analysis:**
```json
{
  "testId": "ab-test-001",
  "configuration": "year3-addition-standard-average-5q",
  "variants": {
    "baseline": {
      "averageScore": 7.8,
      "standardDeviation": 0.4,
      "scores": [7.5, 7.9, 7.8, 8.1, 7.7]
    },
    "enhanced-v1": {
      "averageScore": 8.3,
      "standardDeviation": 0.3,
      "scores": [8.1, 8.4, 8.2, 8.5, 8.3]
    }
  },
  "statisticalAnalysis": {
    "significant": true,
    "pValue": 0.003,
    "confidenceLevel": 0.95,
    "effectSize": 0.5
  },
  "winner": "enhanced-v1"
}
```

### Phase 5: Batch Validation

**Test winning variant across multiple configurations**

Create configuration file (`priority-configs.json`):
```json
[
  "year3-addition-standard-average-5q",
  "year3-subtraction-standard-average-5q",
  "year4-multiplication-fluency-easy-10q",
  "year5-fractions-reasoning-easy-3q"
]
```

Run batch test:
```bash
./worksheet-engine \
  --batch-test \
  --config-file="priority-configs.json" \
  --variants="enhanced-v1,baseline" \
  --parallel \
  --output-dir="./batch-validation-001"
```

### Phase 6: Quality Gates

**Validate deployment readiness**
```bash
./worksheet-engine \
  --quality-gates \
  --config="year3-addition-standard-average-5q" \
  --prompt-variant="enhanced-v1"
```

**Quality Gate Configuration:**
```json
{
  "qualityGates": {
    "minimumComposite": 7.5,
    "minimumPerDimension": {
      "visualSimilarity": 7.0,
      "contentAnalysis": 8.0,
      "ruleBasedLayout": 7.0
    },
    "regressionThreshold": 0.5,
    "approvalRequired": true
  }
}
```

## Command Reference

### Basic Commands

```bash
# Show help
./worksheet-engine --help

# List available configurations
./worksheet-engine --list-configs

# Generate worksheet with assessment
./worksheet-engine --config="<config-id>" --assess --output-dir="<path>"

# Generate with specific prompt variant
./worksheet-engine --config="<config-id>" --prompt-variant="<variant>" --output-dir="<path>"
```

### Golden Reference Commands

```bash
# Create golden reference
./worksheet-engine --create-golden --config="<config-id>" --source="<pdf-path>" --approve

# Update golden reference set
./worksheet-engine --update-golden-set --batch-approved="<directory-path>"

# List golden references
./worksheet-engine --list-golden [--filter="<pattern>"]

# Delete golden reference
./worksheet-engine --delete-golden --config="<config-id>"

# Validate golden references
./worksheet-engine --validate-golden
```

### A/B Testing Commands

```bash
# Run A/B test
./worksheet-engine --ab-test --config="<config-id>" --variants="<variant1,variant2>" --iterations=<n> [--parallel] --output-dir="<path>"

# Run batch test
./worksheet-engine --batch-test --config-file="<config-file.json>" --variants="<variant1,variant2>" [--parallel] --output-dir="<path>"

# Run regression test
./worksheet-engine --regression-test --baseline-dir="<golden-refs-path>" --new-variant="<variant>" --output-dir="<path>"
```

### Quality Gate Commands

```bash
# Run quality gates
./worksheet-engine --quality-gates --config="<config-id>" --prompt-variant="<variant>" [--custom-thresholds="<path>"]

# Validate deployment readiness
./worksheet-engine --validate-deployment --config="<config-list>" --prompt-variant="<variant>"

# Batch quality gates
./worksheet-engine --batch-quality-gates --config-file="<config-file.json>" --prompt-variant="<variant>"
```

### Reporting Commands

```bash
# Generate report
./worksheet-engine --generate-report --report-type="<type>" [--time-range="<range>"] --output-dir="<path>"

# Aggregate results
./worksheet-engine --aggregate-results --output-dir="<results-path>" [--time-range="<range>"]

# Compare reports
./worksheet-engine --compare --baseline="<report-id>" --current="<report-id>"
```

## Quality Assessment Framework

### Assessment Modules

1. **Visual Similarity Assessment**
   - PDF to image conversion
   - Structural Similarity Index (SSIM)
   - Layout consistency analysis
   - Visual element positioning

2. **Content Analysis Assessment**
   - Text extraction from PDF
   - Curriculum standard validation
   - Age-appropriate language check
   - Mathematical accuracy verification

3. **Rule-Based Layout Assessment**
   - Font consistency evaluation
   - Spacing analysis (margins, line heights)
   - Element positioning validation
   - Visual hierarchy assessment

### Assessment Output

```json
{
  "assessmentId": "test-001-assessment",
  "timestamp": "2025-01-09T10:30:00Z",
  "config": "year3-addition-standard-average-5q",
  "scores": {
    "visualSimilarity": {
      "score": 8.2,
      "details": {
        "structuralSimilarity": 8.5,
        "layoutConsistency": 7.8,
        "visualAlignment": 8.3
      }
    },
    "contentAnalysis": {
      "score": 9.1,
      "details": {
        "curriculumAlignment": 9.0,
        "languageAppropriate": 9.5,
        "mathematicalAccuracy": 8.8
      }
    },
    "ruleBasedLayout": {
      "score": 7.8,
      "details": {
        "fontConsistency": 8.0,
        "spacingQuality": 7.5,
        "elementPositioning": 8.0
      }
    },
    "composite": 8.3
  },
  "qualityGate": "PASSED",
  "recommendations": [
    "Improve spacing consistency in question sections",
    "Consider font weight adjustments for better hierarchy"
  ],
  "assessmentTime": 28.5
}
```

## A/B Testing & Statistical Analysis

### Statistical Methods

The system uses robust statistical analysis:

1. **T-Test Analysis**
   - Tests for statistical significance
   - Calculates p-values
   - Determines confidence intervals

2. **Effect Size Calculation**
   - Cohen's d for practical significance
   - Standardized mean difference

3. **Multiple Comparison Correction**
   - Bonferroni correction for multiple variants
   - Family-wise error rate control

### Interpretation Guidelines

| p-value | Significance | Interpretation |
|---------|--------------|---------------|
| < 0.001 | Highly Significant | Strong evidence for difference |
| < 0.01  | Very Significant | Moderate evidence for difference |
| < 0.05  | Significant | Some evidence for difference |
| ≥ 0.05  | Not Significant | Insufficient evidence |

| Effect Size | Magnitude | Practical Impact |
|-------------|-----------|------------------|
| < 0.2 | Small | Minimal practical difference |
| 0.2-0.5 | Medium | Moderate practical difference |
| > 0.8 | Large | Substantial practical difference |

## Golden Reference System

### Reference Management

Golden references serve as quality benchmarks:

1. **Creation Criteria**
   - Composite score ≥ 8.0
   - Manual approval required
   - Curriculum expert validation

2. **Version Control**
   - Semantic versioning (v1.0, v1.1, etc.)
   - Change tracking and audit trail
   - Rollback capabilities

3. **Approval Workflow**
   ```bash
   # Submit for approval
   ./worksheet-engine --create-golden --config="<config>" --source="<pdf>"
   
   # Review pending approvals
   ./worksheet-engine --list-pending-approvals
   
   # Approve submission
   ./worksheet-engine --approve-submission --id="<submission-id>"
   ```

### Reference Storage Structure

```
./golden-references/
├── year3-addition-standard-average-5q/
│   ├── reference.pdf           # Golden reference PDF
│   ├── metadata.json           # Reference metadata
│   ├── quality-scores.json     # Baseline quality scores
│   └── approval-record.json    # Approval history
├── index.json                  # Master reference index
└── version-history.json        # Version control log
```

## Best Practices

### 1. Iterative Development

**Start Small**
```bash
# Begin with single configuration
./worksheet-engine --config="year3-addition-standard-average-5q" --prompt-variant="test-v1" --assess
```

**Scale Gradually**
```bash
# Expand to A/B testing
./worksheet-engine --ab-test --config="year3-addition-standard-average-5q" --variants="baseline,test-v1" --iterations=3

# Then batch validation
./worksheet-engine --batch-test --config-file="priority-configs.json" --variants="test-v1"
```

### 2. Statistical Rigor

**Minimum Requirements:**
- Use ≥5 iterations for A/B tests
- Require p-value <0.05 for significance
- Consider effect size >0.2 for practical importance
- Apply multiple comparison corrections

**Example:**
```bash
./worksheet-engine --ab-test --config="year3-addition-standard-average-5q" --variants="baseline,v1,v2,v3" --iterations=10
```

### 3. Quality Thresholds

**Conservative Approach:**
- Composite score ≥7.5 for production
- Content analysis ≥8.0 (most critical)
- No dimension below 6.0

**Custom Thresholds:**
```json
{
  "minimumComposite": 8.0,
  "minimumPerDimension": {
    "contentAnalysis": 8.5,
    "visualSimilarity": 7.5,
    "ruleBasedLayout": 7.5
  }
}
```

### 4. Documentation

**Track Everything:**
- Document prompt changes
- Record rationale for variants
- Maintain test result history
- Log deployment decisions

### 5. Regression Prevention

**Always Test:**
```bash
# Before any deployment
./worksheet-engine --regression-test --baseline-dir="./golden-references" --new-variant="candidate"

# Quality gate validation
./worksheet-engine --quality-gates --config="all-configs" --prompt-variant="candidate"
```

## Troubleshooting

### Common Issues

**1. GEMINI_API_KEY Not Set**
```bash
export GEMINI_API_KEY="your-api-key-here"
```

**2. Configuration Not Found**
```bash
# List available configurations
./worksheet-engine --list-configs
```

**3. Assessment Timeout**
- Reduce batch size
- Check system resources
- Verify PDF generation

**4. Statistical Analysis Errors**
- Ensure sufficient iterations (≥3)
- Check for identical scores (no variance)
- Verify variant names match

**5. Quality Gate Failures**
```bash
# Check current thresholds
./worksheet-engine --get-quality-gate-config

# Use custom thresholds
./worksheet-engine --quality-gates --config="test" --custom-thresholds="./custom-thresholds.json"
```

### Debug Mode

Enable detailed logging:
```bash
NODE_ENV=development ./worksheet-engine --config="test" --assess
```

### Performance Optimization

**Parallel Processing:**
```bash
# Enable parallel execution
./worksheet-engine --batch-test --parallel --config-file="configs.json" --variants="test"
```

**Resource Management:**
- Monitor memory usage during batch operations
- Use smaller batch sizes for large configurations
- Clean up temporary files regularly

## Conclusion

The Worksheet Generator's prompt engineering system provides a comprehensive, data-driven approach to optimizing AI-generated educational content. By following this guide and leveraging the systematic workflow, you can:

- Establish quality baselines with golden references
- Conduct statistically rigorous A/B tests
- Implement quality gates to prevent regression
- Scale prompt optimization across multiple configurations
- Make evidence-based decisions for production deployments

The system transforms prompt engineering from subjective manual testing into an objective, measurable, and scalable process that ensures consistent quality improvements.

---

**Version:** 1.3.0  
**Last Updated:** 2025-09-08  
**Dependencies:** Story Engine 1.1, 1.2, 1.3