# Story Engine.1.2: Hybrid Quality Assessment Framework

**Epic:** Epic Engine - Worksheet Quality Engineering Engine  
**Status:** Ready for Development  
**Priority:** High - Core quality measurement capability  
**Dependencies:** Story Engine.1.1 (Core Engine Infrastructure)

## Story
As a **developer optimizing worksheet quality**,
I want **automated quality assessment with multiple scoring dimensions**,
so that **I can objectively measure visual similarity, content quality, layout consistency, and overall worksheet effectiveness**.

## Acceptance Criteria
- [ ] Visual similarity assessment compares generated PDFs against golden references using image comparison (0-10 scale)
- [ ] Content analysis extracts and validates text elements against curriculum standards (0-10 scale)
- [ ] Rule-based layout scoring evaluates spacing, fonts, positioning, and visual consistency (0-10 scale)
- [ ] Composite scoring calculation provides weighted average of all assessment dimensions
- [ ] Quality assessment completes within 30 seconds per worksheet including PDF generation
- [ ] Assessment results stored in structured JSON format with detailed scoring breakdown
- [ ] Assessment can run with or without golden references (baseline mode)
- [ ] Detailed reporting shows specific areas for improvement

## Technical Requirements

### Assessment Pipeline
```bash
# Generate with quality assessment
./worksheet-engine --config="year3-addition-standard-average-5q" --assess --output-dir="./results/test-001"

# Generate and compare against golden reference
./worksheet-engine --config="year3-addition-standard-average-5q" --assess --golden-ref="./golden/year3-addition-standard.pdf" --output-dir="./results/test-001"
```

### Assessment Modules
```
src/worksheet-engine/assessment/
├── visual-similarity/
│   ├── pdf-to-image.ts       # PDF to image conversion
│   ├── image-comparison.ts   # Visual similarity scoring
│   └── similarity-metrics.ts # Similarity calculation algorithms
├── content-analysis/
│   ├── text-extraction.ts    # Extract text from PDF
│   ├── curriculum-validator.ts # Validate against curriculum standards
│   └── content-scorer.ts     # Content quality scoring
├── rule-based/
│   ├── layout-analyzer.ts    # Layout consistency analysis
│   ├── typography-checker.ts # Font and text formatting validation
│   └── spacing-validator.ts  # Spacing and positioning validation
├── composite-scorer.ts       # Weighted composite scoring
└── assessment-runner.ts      # Main assessment orchestrator
```

### Quality Dimensions & Scoring

#### 1. Visual Similarity (0-10)
- PDF to image conversion using pdf2pic
- Structural Similarity Index (SSIM) comparison
- Layout element positioning analysis
- Visual consistency metrics

#### 2. Content Analysis (0-10)  
- Text extraction and parsing
- Curriculum standard alignment check
- Age-appropriate language validation
- Mathematical accuracy verification

#### 3. Rule-Based Layout (0-10)
- Font consistency (family, size, weight)
- Spacing analysis (margins, line heights, element gaps)  
- Element positioning (alignment, distribution)
- Visual hierarchy validation

#### 4. Composite Score Calculation
```typescript
interface QualityScores {
  visualSimilarity: number     // 0-10, weighted 30%
  contentAnalysis: number      // 0-10, weighted 40% 
  ruleBasedLayout: number      // 0-10, weighted 30%
  composite: number            // Weighted average
}
```

### Assessment Output Structure
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

### Dependencies & Tools
- **pdf2pic**: PDF to image conversion
- **jimp**: Image processing and comparison  
- **pdf-parse**: Text extraction from PDF
- **ssim.js**: Structural similarity metrics
- **jest-image-snapshot**: Image comparison utilities

## Integration Verification
- **IV1**: Existing PDF generation verified - quality assessment does not modify or interfere with existing PDF creation process
- **IV2**: Service performance verified - assessment framework does not impact existing service response times
- **IV3**: Resource usage verified - assessment processes operate within defined memory constraints

## Definition of Done
- [ ] All assessment modules implemented and tested
- [ ] Quality scoring produces consistent results across multiple runs
- [ ] Assessment completes within performance requirements (30 seconds)
- [ ] Detailed quality reports generated with actionable feedback
- [ ] Integration verification steps passed
- [ ] Ready for Story 1.3 (Golden Reference System)

## Implementation Notes
- Start with rule-based assessment as foundation
- Implement visual similarity only when golden references are available
- Content analysis should be curriculum-aware and age-appropriate
- Provide detailed feedback for quality improvement
- Ensure assessment is deterministic and repeatable