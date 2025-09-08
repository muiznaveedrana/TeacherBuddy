/**
 * Help command implementation for worksheet engine CLI
 * Story Engine.1.3: Golden Reference System and A/B Testing Infrastructure
 */

export function showHelp(): void {
  console.log(`
Worksheet Engine CLI v1.3.0
Golden Reference System and A/B Testing Infrastructure

USAGE:
  worksheet-engine [COMMAND] [OPTIONS]

BASIC COMMANDS:
  --help, -h                    Show this help message
  --list-configs               List all available worksheet configurations
  
WORKSHEET GENERATION:
  --config="<config-id>"       Generate worksheet for specified configuration
  --prompt-variant="<variant>" Use specific prompt variant (default: baseline)
  --output-dir="<path>"        Specify output directory for generated files
  --assess                     Run quality assessment after generation
  --golden-ref="<path>"        Compare against golden reference file

GOLDEN REFERENCE MANAGEMENT:
  --create-golden              Create new golden reference
    --config="<config-id>"     Configuration for golden reference
    --source="<path>"          Source PDF file path
    --approve                  Skip approval workflow and create directly
    
  --update-golden-set          Update golden reference set from approved outputs
    --batch-approved="<dir>"   Directory containing approved outputs
    
  --list-golden                List all golden references
    --filter="<text>"          Filter references by text
    
  --delete-golden              Delete golden reference
    --config="<config-id>"     Configuration to delete
    
  --validate-golden            Validate all golden references

A/B TESTING:
  --ab-test                    Run A/B test
    --config="<config-id>"     Configuration to test
    --variants="<v1,v2,v3>"    Comma-separated variants to test
    --iterations=<n>           Number of iterations per variant (default: 5)
    --parallel                 Run variants in parallel
    --output-dir="<path>"      Output directory for results
    
  --batch-test                 Run batch A/B test
    --config-file="<path>"     JSON file with configuration list
    --variants="<v1,v2>"       Variants to test
    --parallel                 Run in parallel (default: true)
    --output-dir="<path>"      Output directory
    
  --regression-test            Run regression test
    --baseline-dir="<path>"    Baseline results directory
    --new-variant="<variant>"  New variant to test
    --config="<config-id>"     Configuration to test
    --output-dir="<path>"      Output directory

QUALITY GATES:
  --quality-gates              Run quality gates validation
    --config="<config-id>"     Configuration to validate
    --prompt-variant="<var>"   Variant to validate (default: baseline)
    --skip-regression          Skip regression detection
    --skip-golden              Skip golden reference validation
    --custom-thresholds='json' Custom quality thresholds
    
  --validate-deployment        Validate deployment readiness
    --config="<id1,id2,id3>"   Comma-separated configuration IDs
    --prompt-variant="<var>"   Variant to validate
    
  --batch-quality-gates        Run batch quality gates
    --config-file="<path>"     JSON file with configuration list
    --prompt-variant="<var>"   Variant to validate

REPORTING:
  --generate-report            Generate analysis report
    --report-type="<type>"     Report type: ab-test, quality-gate, regression, 
                              comprehensive, statistical, recommendations, 
                              cross-analysis, trend
    --time-range="<range>"     Time range: 7d, 30d, or start:end dates
    --output-dir="<path>"      Output directory
    
  --aggregate-results          Aggregate results from directory
    --output-dir="<path>"      Results directory to aggregate
    --time-range="<range>"     Optional time range filter
    
  --compare                    Compare two report periods
    --baseline="<id>"          Baseline report ID
    --current="<id>"           Current report ID

EXAMPLES:

Basic Generation:
  worksheet-engine --config="year3-addition-standard-average-5q"
  worksheet-engine --config="year4-multiplication-fluency-hard-10q" --assess

Golden Reference:
  worksheet-engine --create-golden --config="year3-addition-standard-average-5q" --source="./worksheet.pdf" --approve
  worksheet-engine --list-golden --filter="year3"
  worksheet-engine --validate-golden

A/B Testing:
  worksheet-engine --ab-test --config="year3-addition-standard-average-5q" --variants="baseline,enhanced-v1"
  worksheet-engine --batch-test --config-file="priority-configs.json" --variants="baseline,enhanced-v1,enhanced-v2"
  worksheet-engine --regression-test --baseline-dir="./golden-references" --new-variant="enhanced-v2"

Quality Gates:
  worksheet-engine --quality-gates --config="year3-addition-standard-average-5q"
  worksheet-engine --validate-deployment --config="year3-addition,year4-multiplication"
  worksheet-engine --batch-quality-gates --config-file="configs.json"

Reporting:
  worksheet-engine --generate-report --report-type="comprehensive" --time-range="30d"
  worksheet-engine --generate-report --report-type="ab-test" --time-range="2023-01-01:2023-12-31"
  worksheet-engine --aggregate-results --output-dir="./results" --time-range="7d"

CONFIGURATION FORMAT:
  Configuration IDs: yeargroup-topic-layout-difficulty-questioncount
  Examples: year3-addition-standard-average-5q, year4-multiplication-fluency-hard-10q

TIME RANGE FORMATS:
  - Days: 7d, 30d, 90d
  - Weeks: 2w, 4w
  - Date ranges: 2023-01-01:2023-12-31

For more information, visit: https://docs.example.com/worksheet-engine
`)
}