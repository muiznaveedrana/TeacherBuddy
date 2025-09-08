# Prompt Engineering Automation - Quick Start Guide

## 🚀 One-Command Complete Automation

This guide shows you how to run the **complete prompt engineering workflow** for the Year 3 Addition configuration with a single command.

## Prerequisites

1. **Set your API key:**
   ```bash
   # Windows (PowerShell)
   $env:GEMINI_API_KEY = "your-api-key-here"
   
   # Windows (Command Prompt)
   set GEMINI_API_KEY=your-api-key-here
   
   # macOS/Linux (Bash)
   export GEMINI_API_KEY="your-api-key-here"
   ```

2. **Ensure you're in the project root:**
   ```bash
   cd M:\ClaudeCodeProjects\worksheetgenerator-ai
   ```

## 🎯 Run Complete Automation

Choose your preferred method:

### Option 1: Node.js (Cross-Platform) ⭐ **Recommended**
```bash
npm run prompt-automation
```

### Option 2: PowerShell (Windows)
```powershell
npm run prompt-automation:powershell
```

### Option 3: Bash (macOS/Linux/WSL)
```bash
npm run prompt-automation:bash
```

## 🔧 Customization

### Environment Variables
You can customize the automation by setting environment variables:

```bash
# Custom configuration
CONFIG_ID=year4-multiplication-fluency-easy-10q npm run prompt-automation

# Custom variants
ENHANCED_VARIANTS=enhanced-v1,enhanced-v2,experimental-v3 npm run prompt-automation

# More iterations for better statistics
ITERATIONS=10 npm run prompt-automation

# Custom output directory
BASE_OUTPUT_DIR=./my-prompt-tests npm run prompt-automation
```

### All Available Variables
| Variable | Default | Description |
|----------|---------|-------------|
| `CONFIG_ID` | `year3-addition-standard-average-5q` | Worksheet configuration to test |
| `BASELINE_VARIANT` | `baseline` | Baseline prompt variant |
| `ENHANCED_VARIANTS` | `enhanced-v1,enhanced-v2` | Comma-separated enhanced variants |
| `ITERATIONS` | `5` | Number of iterations per A/B test |
| `MIN_COMPOSITE_SCORE` | `7.5` | Minimum quality score threshold |
| `PARALLEL` | `true` | Enable parallel processing |
| `BASE_OUTPUT_DIR` | `./prompt-engineering-results` | Output directory |

## 📊 What The Automation Does

The automation runs a **complete 6-phase workflow**:

### Phase 1: 📊 Baseline Establishment
- Generates baseline worksheet with quality assessment
- Creates structured output directory with:
  - `worksheet.pdf` - Generated worksheet
  - `assessment-results.json` - Quality scores
  - `generation-log.json` - Generation metadata

### Phase 2: 🏆 Golden Reference Creation
- Creates approved golden reference from baseline
- Stores in `./golden-references/` directory
- Sets quality benchmark for future comparisons

### Phase 3: 🧪 Enhanced Variant Testing
- Tests each enhanced variant against golden reference
- Generates quality assessments for comparison
- Identifies best-performing variants

### Phase 4: 📈 Statistical A/B Testing
- Runs multiple iterations of each variant (default: 5)
- Performs statistical significance testing
- Calculates effect sizes and confidence intervals
- Determines statistical winner

### Phase 5: 🚪 Quality Gate Validation
- Validates winning variant against quality thresholds
- Checks for regression from baseline
- Ensures production-ready quality standards

### Phase 6: 📋 Report Generation
- Creates comprehensive automation summary
- Aggregates all results and statistics
- Provides actionable recommendations

## 📁 Output Structure

After automation completes, you'll find results in:
```
./prompt-engineering-results/session_YYYYMMDD_HHMMSS/
├── 01_baseline/
│   ├── worksheet.pdf
│   ├── assessment-results.json
│   └── generation-log.json
├── 02_variants/
│   ├── enhanced-v1/
│   │   ├── worksheet.pdf
│   │   └── assessment-results.json
│   └── enhanced-v2/
│       ├── worksheet.pdf
│       └── assessment-results.json
├── 03_ab_test/
│   ├── ab-test-results.json
│   └── [individual test results]
├── 04_quality_gates/
│   └── validation-results.json
└── 05_report/
    └── automation_summary.json
```

## 📈 Reading the Results

### Key Files to Check:

1. **A/B Test Winner:**
   ```bash
   # Check the statistical winner
   cat ./prompt-engineering-results/session_*/03_ab_test/*results.json | jq '.winner'
   ```

2. **Quality Scores:**
   ```bash
   # Compare all variant scores
   find ./prompt-engineering-results/session_*/0*_* -name "assessment-results.json" -exec echo "{}:" \; -exec jq '.scores.composite' {} \;
   ```

3. **Statistical Significance:**
   ```bash
   # Check if results are statistically significant
   cat ./prompt-engineering-results/session_*/03_ab_test/*results.json | jq '.statisticalAnalysis'
   ```

## 🎯 Example Run

Here's what a complete automation run looks like:

```bash
$ npm run prompt-automation

🚀 Starting Prompt Engineering Automation
Configuration: year3-addition-standard-average-5q
Session Directory: ./prompt-engineering-results/session_2025-01-09_14-30-45
Timestamp: 2025-01-09_14-30-45

========================================
🔍 CHECKING PREREQUISITES
========================================

✅ GEMINI_API_KEY is configured
✅ Session directory created: ./prompt-engineering-results/session_2025-01-09_14-30-45
✅ Worksheet engine CLI is accessible
✅ All prerequisites met

========================================
📊 PHASE 1: ESTABLISHING BASELINE
========================================

🔍 Generating baseline worksheet with assessment...
✅ Baseline generated successfully
✅ Baseline Composite Score: 7.8

========================================
🏆 PHASE 2: CREATING GOLDEN REFERENCE
========================================

🔍 Creating golden reference from baseline...
✅ Golden reference created successfully

... [continues through all phases] ...

========================================
🎉 AUTOMATION COMPLETE
========================================

✅ Prompt engineering automation completed successfully!

📁 Session Results Location:
   ./prompt-engineering-results/session_2025-01-09_14-30-45

📊 Generated Artifacts:
   • Baseline worksheet and assessment
   • Golden reference (approved)
   • Enhanced variant test results
   • Statistical A/B test analysis
   • Quality gate validation
   • Comprehensive summary report

🔍 Next Steps:
   1. Review results in: ./prompt-engineering-results/session_2025-01-09_14-30-45
   2. Check A/B test winner and significance
   3. Validate quality gate outcomes
   4. Deploy winning variant to production

✅ 🎯 Automation completed successfully!
```

## 🐛 Troubleshooting

### Common Issues:

1. **API Key Not Set:**
   ```
   ❌ GEMINI_API_KEY environment variable is not set
   ```
   **Solution:** Set your API key using the commands above

2. **CLI Not Accessible:**
   ```
   ❌ Worksheet engine CLI is not accessible
   ```
   **Solution:** Run `npm install` and ensure all dependencies are installed

3. **Permission Issues (Windows):**
   ```
   PowerShell execution policy error
   ```
   **Solution:** Run PowerShell as Administrator or use the Node.js version

4. **Port Already in Use:**
   ```
   Error: Port 3000 is already in use
   ```
   **Solution:** Kill existing processes:
   ```bash
   npx kill-port 3000
   npx kill-port 3001
   ```

## 🚀 Advanced Usage

### Testing Different Configurations
```bash
# Test Year 4 Multiplication instead
CONFIG_ID=year4-multiplication-fluency-easy-10q npm run prompt-automation

# Test Year 5 Fractions
CONFIG_ID=year5-fractions-reasoning-easy-3q npm run prompt-automation
```

### High-Precision Testing
```bash
# Run 10 iterations for better statistical power
ITERATIONS=10 npm run prompt-automation
```

### Testing Multiple Variants
```bash
# Test 4 different prompt variants
ENHANCED_VARIANTS=enhanced-v1,enhanced-v2,experimental-v1,experimental-v2 npm run prompt-automation
```

## 🎯 Production Deployment

Once automation identifies a winning variant:

1. **Review Results:** Check statistical significance and quality scores
2. **Validate Quality:** Ensure winner meets quality gates
3. **Deploy Gradually:** Test in staging before full production
4. **Monitor:** Track performance metrics post-deployment

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review the automation logs in the session directory
3. Ensure all dependencies are properly installed
4. Verify your GEMINI_API_KEY is valid

---

**🎉 You now have a complete, automated prompt engineering pipeline!**

This automation transforms manual prompt testing into a systematic, statistical process that gives you confidence in your prompt optimization decisions.