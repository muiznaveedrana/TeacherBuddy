# Story Engine.1.1: Core Engine Infrastructure and Service Integration

**Epic:** Epic Engine - Worksheet Quality Engineering Engine  
**Status:** Ready for Development  
**Priority:** High - Foundation for quality engineering system

## Story
As a **developer working on prompt optimization**,
I want **a command-line engine that integrates with existing worksheet generation services**,
so that **I can generate and assess worksheets using the same pipeline as the UI without affecting production functionality**.

## Acceptance Criteria
- [ ] CLI tool accepts configuration parameters in format: `--config="year3-addition-standard-average-5q" --prompt-variant="baseline" --output-dir="./results/test-001"`
- [ ] Engine successfully imports and utilizes existing `promptService.ts` and `gemini.ts` modules
- [ ] Generated worksheets are identical to UI output for same configuration parameters
- [ ] PDF generation pipeline produces same quality PDFs as existing UI workflow
- [ ] Results are stored in structured directory format with configuration-based organization
- [ ] Engine operates independently without requiring UI server to be running
- [ ] Command-line help and usage documentation available
- [ ] Error handling provides clear feedback for invalid configurations or service failures

## Technical Requirements

### CLI Interface
```bash
# Basic worksheet generation
./worksheet-engine --config="year3-addition-standard-average-5q" --prompt-variant="baseline" --output-dir="./results/test-001"

# Help command
./worksheet-engine --help

# List available configurations
./worksheet-engine --list-configs
```

### File Structure
```
src/worksheet-engine/
├── cli/
│   ├── index.ts              # Main CLI entry point
│   ├── commands/
│   │   ├── generate.ts       # Generate worksheet command
│   │   ├── list-configs.ts   # List configurations command
│   │   └── help.ts           # Help command
│   └── utils/
│       ├── config-parser.ts  # Configuration parsing utilities
│       └── output-manager.ts # Results directory management
├── integration/
│   ├── prompt-service.ts     # Wrapper for existing promptService
│   ├── pdf-service.ts        # Wrapper for existing PDF generation
│   └── config-mapper.ts      # Map CLI configs to service configs
└── types/
    └── engine-types.ts       # Engine-specific type definitions
```

### Configuration Format
```json
{
  "configId": "year3-addition-standard-average-5q",
  "layout": "standard",
  "yearGroup": "Year 3", 
  "topic": "addition-subtraction",
  "subtopic": "problem-solving",
  "difficulty": "average",
  "questionCount": 5,
  "promptVariant": "baseline"
}
```

### Output Structure
```
./results/test-001/
├── config.json              # Input configuration
├── worksheet.html           # Generated HTML
├── worksheet.pdf            # Generated PDF
├── generation-log.json      # Generation metadata
└── engine-metadata.json     # Engine-specific metadata
```

## Integration Verification
- **IV1**: Existing UI functionality verified - UI worksheet generation produces identical output before and after engine implementation
- **IV2**: Service integration verified - shared services function correctly for both UI calls and engine calls simultaneously  
- **IV3**: Performance impact verified - UI response times remain unchanged during engine operation

## Definition of Done
- [ ] CLI tool compiles and executes successfully
- [ ] All acceptance criteria met and tested
- [ ] Integration verification steps passed
- [ ] Documentation updated with usage examples
- [ ] Error scenarios handled gracefully
- [ ] Ready for Story 1.2 (Quality Assessment Framework)

## Implementation Notes
- Reuse existing service architecture without modifications
- Maintain separation between CLI interface and core services
- Ensure backward compatibility with existing prompt service configurations
- Focus on developer experience with clear CLI interface and helpful error messages