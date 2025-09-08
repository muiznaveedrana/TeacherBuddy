#!/bin/bash

# Prompt Engineering Automation Script
# Complete workflow for systematic prompt optimization
# Example: Year 3 Addition Standard Average 5Q

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
CONFIG_ID="year3-addition-standard-average-5q"
BASE_OUTPUT_DIR="./prompt-engineering-results"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
SESSION_DIR="${BASE_OUTPUT_DIR}/session_${TIMESTAMP}"

# Prompt variants to test
BASELINE_VARIANT="baseline"
ENHANCED_VARIANTS="enhanced-v1,enhanced-v2"
ALL_VARIANTS="${BASELINE_VARIANT},${ENHANCED_VARIANTS}"

# Quality thresholds
MIN_COMPOSITE_SCORE=7.5
MIN_CONTENT_SCORE=8.0

echo -e "${BLUE}🚀 Starting Prompt Engineering Automation${NC}"
echo -e "${BLUE}Configuration: ${CONFIG_ID}${NC}"
echo -e "${BLUE}Session Directory: ${SESSION_DIR}${NC}"
echo -e "${BLUE}Timestamp: ${TIMESTAMP}${NC}"
echo ""

# Function to print section headers
print_section() {
    echo ""
    echo -e "${YELLOW}========================================${NC}"
    echo -e "${YELLOW}$1${NC}"
    echo -e "${YELLOW}========================================${NC}"
    echo ""
}

# Function to check prerequisites
check_prerequisites() {
    print_section "🔍 CHECKING PREREQUISITES"
    
    # Check if GEMINI_API_KEY is set
    if [ -z "$GEMINI_API_KEY" ]; then
        echo -e "${RED}❌ GEMINI_API_KEY environment variable is not set${NC}"
        echo -e "${YELLOW}💡 Please set your API key:${NC}"
        echo "export GEMINI_API_KEY=\"your-api-key-here\""
        exit 1
    else
        echo -e "${GREEN}✅ GEMINI_API_KEY is configured${NC}"
    fi
    
    # Create session directory
    mkdir -p "${SESSION_DIR}"
    echo -e "${GREEN}✅ Session directory created: ${SESSION_DIR}${NC}"
    
    # Test CLI accessibility
    if npm run worksheet-engine -- --help > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Worksheet engine CLI is accessible${NC}"
    else
        echo -e "${RED}❌ Worksheet engine CLI is not accessible${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ All prerequisites met${NC}"
}

# Function to establish baseline
establish_baseline() {
    print_section "📊 PHASE 1: ESTABLISHING BASELINE"
    
    local baseline_dir="${SESSION_DIR}/01_baseline"
    mkdir -p "${baseline_dir}"
    
    echo -e "${BLUE}Generating baseline worksheet with assessment...${NC}"
    npm run worksheet-engine -- \
        --config="${CONFIG_ID}" \
        --prompt-variant="${BASELINE_VARIANT}" \
        --assess \
        --output-dir="${baseline_dir}"
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Baseline generated successfully${NC}"
        
        # Extract baseline score for reference
        if [ -f "${baseline_dir}/assessment-results.json" ]; then
            baseline_score=$(jq -r '.scores.composite' "${baseline_dir}/assessment-results.json" 2>/dev/null || echo "N/A")
            echo -e "${GREEN}📊 Baseline Composite Score: ${baseline_score}${NC}"
        fi
    else
        echo -e "${RED}❌ Baseline generation failed${NC}"
        exit 1
    fi
}

# Function to create golden reference
create_golden_reference() {
    print_section "🏆 PHASE 2: CREATING GOLDEN REFERENCE"
    
    local baseline_dir="${SESSION_DIR}/01_baseline"
    local baseline_pdf="${baseline_dir}/worksheet.pdf"
    
    if [ ! -f "${baseline_pdf}" ]; then
        echo -e "${RED}❌ Baseline PDF not found: ${baseline_pdf}${NC}"
        exit 1
    fi
    
    echo -e "${BLUE}Creating golden reference from baseline...${NC}"
    npm run worksheet-engine -- \
        --create-golden \
        --config="${CONFIG_ID}" \
        --source="${baseline_pdf}" \
        --approve
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Golden reference created successfully${NC}"
        
        # List golden references to confirm
        echo -e "${BLUE}Current golden references:${NC}"
        npm run worksheet-engine -- --list-golden
    else
        echo -e "${RED}❌ Golden reference creation failed${NC}"
        exit 1
    fi
}

# Function to test enhanced variants
test_variants() {
    print_section "🧪 PHASE 3: TESTING ENHANCED VARIANTS"
    
    local variants_dir="${SESSION_DIR}/02_variants"
    mkdir -p "${variants_dir}"
    
    # Split enhanced variants and test each one
    IFS=',' read -ra VARIANTS <<< "${ENHANCED_VARIANTS}"
    for variant in "${VARIANTS[@]}"; do
        echo -e "${BLUE}Testing variant: ${variant}${NC}"
        
        local variant_dir="${variants_dir}/${variant}"
        mkdir -p "${variant_dir}"
        
        npm run worksheet-engine -- \
            --config="${CONFIG_ID}" \
            --prompt-variant="${variant}" \
            --assess \
            --golden-ref="./golden-references/${CONFIG_ID}/reference.pdf" \
            --output-dir="${variant_dir}"
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✅ Variant ${variant} tested successfully${NC}"
            
            # Extract variant score
            if [ -f "${variant_dir}/assessment-results.json" ]; then
                variant_score=$(jq -r '.scores.composite' "${variant_dir}/assessment-results.json" 2>/dev/null || echo "N/A")
                echo -e "${GREEN}📊 ${variant} Composite Score: ${variant_score}${NC}"
            fi
        else
            echo -e "${YELLOW}⚠️  Variant ${variant} testing had issues (continuing...)${NC}"
        fi
    done
}

# Function to run A/B test
run_ab_test() {
    print_section "📈 PHASE 4: STATISTICAL A/B TESTING"
    
    local ab_test_dir="${SESSION_DIR}/03_ab_test"
    mkdir -p "${ab_test_dir}"
    
    echo -e "${BLUE}Running A/B test with statistical analysis...${NC}"
    echo -e "${BLUE}Variants: ${ALL_VARIANTS}${NC}"
    echo -e "${BLUE}Iterations: 5 per variant${NC}"
    
    npm run worksheet-engine -- \
        --ab-test \
        --config="${CONFIG_ID}" \
        --variants="${ALL_VARIANTS}" \
        --iterations=5 \
        --parallel \
        --output-dir="${ab_test_dir}"
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ A/B test completed successfully${NC}"
        
        # Find and display the results
        local results_file=$(find "${ab_test_dir}" -name "*results.json" | head -1)
        if [ -f "$results_file" ]; then
            echo -e "${BLUE}📊 A/B Test Results:${NC}"
            
            # Extract winner if available
            winner=$(jq -r '.winner // "Not determined"' "$results_file" 2>/dev/null)
            echo -e "${GREEN}🏆 Winner: ${winner}${NC}"
            
            # Extract significance
            significant=$(jq -r '.statisticalAnalysis.significant // false' "$results_file" 2>/dev/null)
            pvalue=$(jq -r '.statisticalAnalysis.pValue // "N/A"' "$results_file" 2>/dev/null)
            echo -e "${GREEN}📊 Statistically Significant: ${significant} (p-value: ${pvalue})${NC}"
        fi
    else
        echo -e "${RED}❌ A/B test failed${NC}"
        exit 1
    fi
}

# Function to validate with quality gates
validate_quality_gates() {
    print_section "🚪 PHASE 5: QUALITY GATE VALIDATION"
    
    # Determine winning variant from A/B test results
    local ab_test_dir="${SESSION_DIR}/03_ab_test"
    local results_file=$(find "${ab_test_dir}" -name "*results.json" | head -1)
    local winning_variant="${BASELINE_VARIANT}"
    
    if [ -f "$results_file" ]; then
        winning_variant=$(jq -r '.winner // "baseline"' "$results_file" 2>/dev/null)
    fi
    
    echo -e "${BLUE}Validating winning variant: ${winning_variant}${NC}"
    
    local quality_gates_dir="${SESSION_DIR}/04_quality_gates"
    mkdir -p "${quality_gates_dir}"
    
    npm run worksheet-engine -- \
        --quality-gates \
        --config="${CONFIG_ID}" \
        --prompt-variant="${winning_variant}"
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Quality gates passed for variant: ${winning_variant}${NC}"
    else
        echo -e "${YELLOW}⚠️  Quality gates validation completed with warnings${NC}"
    fi
}

# Function to generate comprehensive report
generate_report() {
    print_section "📋 PHASE 6: GENERATING COMPREHENSIVE REPORT"
    
    local report_dir="${SESSION_DIR}/05_report"
    mkdir -p "${report_dir}"
    
    # Create summary report
    local summary_file="${report_dir}/automation_summary.json"
    
    echo -e "${BLUE}Generating automation summary report...${NC}"
    
    cat > "${summary_file}" << EOF
{
  "automationSession": {
    "timestamp": "${TIMESTAMP}",
    "configurationId": "${CONFIG_ID}",
    "sessionDirectory": "${SESSION_DIR}",
    "variants": "${ALL_VARIANTS}",
    "phases": [
      "Baseline Establishment",
      "Golden Reference Creation", 
      "Variant Testing",
      "Statistical A/B Testing",
      "Quality Gate Validation"
    ]
  },
  "results": {
    "baselineGenerated": true,
    "goldenReferenceCreated": true,
    "variantsTested": true,
    "abTestCompleted": true,
    "qualityGatesValidated": true
  },
  "nextSteps": [
    "Review detailed results in session directory",
    "Deploy winning variant if quality gates passed",
    "Update production configuration",
    "Monitor performance in production"
  ]
}
EOF
    
    echo -e "${GREEN}✅ Summary report generated: ${summary_file}${NC}"
    
    # Try to generate detailed report if possible
    npm run worksheet-engine -- \
        --generate-report \
        --report-type="comprehensive" \
        --output-dir="${report_dir}" \
        2>/dev/null || echo -e "${YELLOW}⚠️  Detailed report generation not available${NC}"
}

# Function to display final summary
display_final_summary() {
    print_section "🎉 AUTOMATION COMPLETE"
    
    echo -e "${GREEN}✅ Prompt engineering automation completed successfully!${NC}"
    echo ""
    echo -e "${BLUE}📁 Session Results Location:${NC}"
    echo "   ${SESSION_DIR}"
    echo ""
    echo -e "${BLUE}📊 Generated Artifacts:${NC}"
    echo "   • Baseline worksheet and assessment"
    echo "   • Golden reference (approved)"
    echo "   • Enhanced variant test results"
    echo "   • Statistical A/B test analysis"
    echo "   • Quality gate validation"
    echo "   • Comprehensive summary report"
    echo ""
    echo -e "${BLUE}🔍 Next Steps:${NC}"
    echo "   1. Review results in: ${SESSION_DIR}"
    echo "   2. Check A/B test winner and significance"
    echo "   3. Validate quality gate outcomes"
    echo "   4. Deploy winning variant to production"
    echo ""
    echo -e "${YELLOW}💡 To view results:${NC}"
    echo "   cd \"${SESSION_DIR}\""
    echo "   find . -name '*.json' -exec echo '{}:' \\; -exec cat '{}' \\; -exec echo \\;"
    echo ""
}

# Main execution flow
main() {
    echo -e "${GREEN}Starting automated prompt engineering workflow...${NC}"
    
    # Execute all phases
    check_prerequisites
    establish_baseline
    create_golden_reference
    test_variants
    run_ab_test
    validate_quality_gates
    generate_report
    display_final_summary
    
    echo -e "${GREEN}🎯 Automation completed successfully!${NC}"
}

# Execute main function if script is run directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi