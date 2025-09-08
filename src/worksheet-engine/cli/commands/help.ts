/**
 * Help command implementation for worksheet engine CLI
 * Story Engine.1.1: Core Engine Infrastructure and Service Integration
 */

export function showHelp(): void {
  console.log(`
Worksheet Engine CLI - Professional worksheet generation tool

USAGE:
  worksheet-engine [OPTIONS]

OPTIONS:
  --config=<config-id>          Configuration ID for worksheet generation
  --prompt-variant=<variant>    Prompt variation (default: baseline)
  --output-dir=<directory>      Output directory for generated files
  --list-configs               List all available configuration IDs
  --help                       Show this help message

EXAMPLES:
  # Generate a worksheet with specific configuration
  worksheet-engine --config="year3-addition-standard-average-5q" --prompt-variant="baseline" --output-dir="./results/test-001"

  # List available configurations
  worksheet-engine --list-configs

  # Get help
  worksheet-engine --help

AVAILABLE CONFIGURATIONS:
  year3-addition-standard-average-5q     Year 3 Addition/Subtraction (5 questions)
  year1-counting-visual-easy-3q          Year 1 Counting Objects (3 questions)
  year5-fractions-balanced-hard-8q       Year 5 Fractions Operations (8 questions)
  year2-money-standard-average-6q        Year 2 Money Problems (6 questions)
  year4-multiplication-balanced-average-10q  Year 4 Times Tables (10 questions)

OUTPUT STRUCTURE:
  The engine creates a structured output directory containing:
  ├── config.json              # Input configuration
  ├── worksheet.html           # Generated HTML worksheet
  ├── worksheet.pdf            # Generated PDF (placeholder)
  ├── generation-log.json      # Generation metadata
  └── engine-metadata.json     # Engine-specific metadata

INTEGRATION:
  This CLI engine integrates with the existing worksheet generation services
  without requiring the UI server to be running. It produces identical output
  to the web interface for the same configuration parameters.

For more information, visit: https://github.com/your-repo/worksheet-generator
`)
}