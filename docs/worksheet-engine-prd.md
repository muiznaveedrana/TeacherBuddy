# **Worksheet Quality Engineering Engine** - Brownfield Enhancement PRD

## **Intro Project Analysis and Context**

### **Analysis Source**
- IDE-based fresh analysis
- Existing project documentation available in `docs/prompt-generation-workflow.md`
- Live codebase analysis from M:\ClaudeCodeProjects\worksheetgenerator-ai

### **Current Project State**
The WorksheetGenerator.AI is a Next.js-based application that generates curriculum-aligned worksheets for UK primary school teachers. The system uses a sophisticated configuration-to-prompt transformation process with Gemini 2.5 Flash to generate HTML+SVG worksheets that are converted to PDF. The current architecture includes:

- **Configuration Flow**: Layout → Year Group → Topic → Subtopic → Difficulty → Question Count → Enhanced Options
- **Generation Pipeline**: WorksheetConfig → Unified Prompt Service → Gemini 2.5 Flash → HTML+SVG → PDF
- **Quality Control**: Basic validation and metadata tracking with iterative improvement goals

### **Available Documentation Analysis**

#### **Available Documentation**
- ✅ Tech Stack Documentation (TypeScript, Next.js, Gemini 2.5 Flash)
- ✅ Source Tree/Architecture (Components, services, API routes structure)
- ⚠️ Coding Standards (Partial - inferred from codebase patterns)
- ✅ API Documentation (Worksheet generation endpoints documented)
- ✅ External API Documentation (Gemini API integration documented)
- ❌ UX/UI Guidelines (Need to establish for engine interface)
- ✅ Technical Debt Documentation (Performance and quality considerations noted)

### **Enhancement Scope Definition**

#### **Enhancement Type**
- ✅ New Feature Addition
- Performance/Scalability Improvements  
- Integration with New Systems (Quality assessment frameworks)

#### **Enhancement Description**
Addition of a developer-only command-line worksheet engine for systematic prompt engineering and quality validation. This tool will reuse existing services but provide automated quality assessment capabilities, A/B testing infrastructure, and golden reference systems to improve worksheet quality before UI deployment.

#### **Impact Assessment**
- ✅ Moderate Impact (some existing code changes)
- Integration with existing `promptService.ts` and `gemini.ts`
- New CLI tool that complements rather than replaces existing UI

### **Goals and Background Context**

#### **Goals**
- Create developer-only quality engineering tool for systematic prompt improvement
- Implement hybrid quality assessment (visual similarity, content analysis, rule-based scoring)
- Establish golden reference system for consistent quality standards
- Enable A/B testing of prompt variations with 0-10 scoring system
- Achieve 90%+ configurations scoring ≥7.5 composite quality rating
- Seamless integration with existing worksheet generation services

#### **Background Context**
The current worksheet generation system produces functional output but lacks systematic quality validation and prompt optimization capabilities. Teachers require consistently high-quality worksheets with excellent layout, visual appeal, and educational effectiveness. The existing UI-based workflow doesn't provide mechanisms for iterative prompt improvement or quality measurement. This enhancement addresses the need for systematic prompt engineering while maintaining the existing production system's stability and functionality.

### **Change Log**
| Change | Date | Version | Description | Author |
|--------|------|---------|-------------|---------|
| Initial PRD Creation | 2025-01-09 | 1.0 | Comprehensive brownfield enhancement for worksheet quality engineering | PM John |

---

## **Requirements**

### **Functional Requirements**

**FR1**: The worksheet engine shall reuse existing `promptService.ts` and `gemini.ts` services without breaking current UI functionality.

**FR2**: The engine shall generate worksheets for specified configuration combinations via command-line interface using format: `./worksheet-engine --config="year3-addition-standard-average-5q" --prompt-variant="baseline" --output-dir="./results/test-001"`

**FR3**: The engine shall implement hybrid quality assessment with four scoring dimensions: visual similarity (0-10), content analysis (0-10), rule-based layout (0-10), and composite score calculation.

**FR4**: The engine shall support batch testing of multiple configurations and prompt variants with automated comparison capabilities.

**FR5**: The engine shall maintain golden reference PDF system for consistent quality benchmarking.

**FR6**: The engine shall generate file-based results in JSON format with PDF artifacts and quality reports.

**FR7**: The engine shall support A/B testing of prompt variations with statistical comparison of quality scores.

### **Non-Functional Requirements**

**NFR1**: Engine execution must not impact existing UI performance or availability during concurrent operation.

**NFR2**: Quality assessment pipeline must complete within 30 seconds per worksheet generation including PDF creation and scoring.

**NFR3**: Results storage must be organized and queryable with configuration-based directory structure.

**NFR4**: Engine must maintain backward compatibility with existing prompt service configurations and not require UI modifications.

**NFR5**: Memory usage during batch testing must not exceed 2GB for processing up to 50 configurations simultaneously.

### **Compatibility Requirements**

**CR1**: Existing APIs remain unchanged - worksheet generation endpoint and configuration structure maintained without modifications.

**CR2**: Database schema changes are backward compatible - quality metrics stored as additional metadata without altering core worksheet structures.

**CR3**: UI/UX consistency maintained - no UI changes required, engine operates independently from existing dashboard.

**CR4**: Integration compatibility preserved - prompt service and PDF generation pipeline function identically for both UI and engine usage.

---

## **Technical Constraints and Integration Requirements**

### **Existing Technology Stack**

**Languages**: TypeScript, Node.js
**Frameworks**: Next.js 13+, React, Tailwind CSS
**Database**: File-based configuration and results storage (JSON)
**Infrastructure**: Development environment, no deployment requirements
**External Dependencies**: Gemini 2.5 Flash API, PDF generation libraries, existing worksheet services

### **Integration Approach**

**Database Integration Strategy**: File-based results storage with JSON configuration and quality metrics, no database modifications required.

**API Integration Strategy**: Direct imports from existing `promptService.ts` and `gemini.ts` modules, shared configuration structures.

**Frontend Integration Strategy**: No frontend integration - CLI-only tool with file-based output.

**Testing Integration Strategy**: Leverages existing PDF generation pipeline with added quality assessment layer.

### **Code Organization and Standards**

**File Structure Approach**: 
```
src/worksheet-engine/
├── cli/                    # Command-line interface
├── assessment/            # Quality assessment modules
├── golden-references/     # Reference PDF management
├── results/              # Test results and artifacts
└── integration/          # Service integration wrappers
```

**Naming Conventions**: Follow existing camelCase TypeScript conventions, align with current codebase patterns.

**Coding Standards**: TypeScript strict mode, existing ESLint configuration, consistent with current service architecture.

**Documentation Standards**: Inline JSDoc comments, README with usage examples, configuration schema documentation.

### **Deployment and Operations**

**Build Process Integration**: Integrated with existing Next.js build process, separate npm script for engine compilation.

**Deployment Strategy**: Developer-only tool, no production deployment required, local execution only.

**Monitoring and Logging**: File-based logging with structured JSON output, quality metrics tracking in results directory.

**Configuration Management**: Shared configuration with UI system, additional engine-specific settings in dedicated config files.

### **Risk Assessment and Mitigation**

**Technical Risks**: 
- Quality assessment accuracy dependent on reference standards
- Potential service dependency conflicts during concurrent UI/engine usage

**Integration Risks**:
- Changes to shared services might affect both UI and engine
- Configuration drift between UI and engine over time

**Deployment Risks**:
- None - development tool only, no production deployment

**Mitigation Strategies**:
- Version-controlled shared service interfaces
- Comprehensive integration testing
- Isolated engine configuration management
- Regular synchronization validation between UI and engine outputs

---

## **Epic and Story Structure**

### **Epic Approach**

**Epic Structure Decision**: Single comprehensive epic with rationale based on cohesive quality engineering feature set that requires coordinated development of assessment infrastructure, golden reference system, and testing capabilities.

---

## **Epic 1: Worksheet Quality Engineering Engine**

**Epic Goal**: Implement a comprehensive developer-only command-line tool for systematic prompt engineering and quality validation that reuses existing worksheet generation services while providing hybrid quality assessment, A/B testing capabilities, and golden reference management.

**Integration Requirements**: Direct integration with existing `promptService.ts` and `gemini.ts`, shared configuration structures, file-based results storage, no UI modifications required.

### **Story 1.1: Core Engine Infrastructure and Service Integration**

As a **developer working on prompt optimization**,
I want **a command-line engine that integrates with existing worksheet generation services**,
so that **I can generate and assess worksheets using the same pipeline as the UI without affecting production functionality**.

#### **Acceptance Criteria**
1. CLI tool accepts configuration parameters in format: `--config="year3-addition-standard-average-5q" --prompt-variant="baseline" --output-dir="./results/test-001"`
2. Engine successfully imports and utilizes existing `promptService.ts` and `gemini.ts` modules
3. Generated worksheets are identical to UI output for same configuration parameters
4. PDF generation pipeline produces same quality PDFs as existing UI workflow
5. Results are stored in structured directory format with configuration-based organization
6. Engine operates independently without requiring UI server to be running

#### **Integration Verification**
**IV1**: Existing UI functionality verified - UI worksheet generation produces identical output before and after engine implementation
**IV2**: Service integration verified - shared services function correctly for both UI calls and engine calls simultaneously  
**IV3**: Performance impact verified - UI response times remain unchanged during engine operation

### **Story 1.2: Hybrid Quality Assessment Framework**

As a **developer optimizing worksheet quality**,
I want **automated quality assessment with multiple scoring dimensions**,
so that **I can objectively measure visual similarity, content quality, layout consistency, and overall worksheet effectiveness**.

#### **Acceptance Criteria**
1. Visual similarity assessment compares generated PDFs against golden references using image comparison (0-10 scale)
2. Content analysis extracts and validates text elements against curriculum standards (0-10 scale)
3. Rule-based layout scoring evaluates spacing, fonts, positioning, and visual consistency (0-10 scale)
4. Composite scoring calculation provides weighted average of all assessment dimensions
5. Quality assessment completes within 30 seconds per worksheet including PDF generation
6. Assessment results stored in structured JSON format with detailed scoring breakdown

#### **Integration Verification**
**IV1**: Existing PDF generation verified - quality assessment does not modify or interfere with existing PDF creation process
**IV2**: Service performance verified - assessment framework does not impact existing service response times
**IV3**: Resource usage verified - assessment processes operate within defined memory constraints

### **Story 1.3: Golden Reference System and A/B Testing Infrastructure**

As a **developer conducting prompt engineering experiments**,  
I want **golden reference management and A/B testing capabilities**,
so that **I can systematically compare prompt variants and maintain consistent quality standards across all worksheet configurations**.

#### **Acceptance Criteria**
1. Golden reference creation from high-scoring worksheet outputs with metadata tracking
2. A/B testing framework compares multiple prompt variants with statistical significance testing
3. Batch testing processes multiple configurations with automated quality comparison
4. Reference system maintains version control and approval workflow for quality standards
5. Quality gates prevent deployment of prompts scoring below configurable thresholds (default ≥7.5 composite)
6. Results comparison identifies performance improvements and regressions between prompt versions

#### **Integration Verification**
**IV1**: Existing prompt system verified - A/B testing infrastructure does not modify production prompt configurations
**IV2**: Configuration consistency verified - batch testing maintains alignment with UI configuration options
**IV3**: Quality preservation verified - golden reference system maintains backward compatibility with existing quality standards