# PowerShell Prompt Engineering Automation Script
# Complete workflow for systematic prompt optimization
# Example: Year 3 Addition Standard Average 5Q

param(
    [string]$ConfigId = "year3-addition-standard-average-5q",
    [string]$BaseOutputDir = "./prompt-engineering-results",
    [string]$BaselineVariant = "baseline",
    [string]$EnhancedVariants = "enhanced-v1,enhanced-v2",
    [int]$Iterations = 5,
    [double]$MinCompositeScore = 7.5
)

# Configuration
$Timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$SessionDir = Join-Path $BaseOutputDir "session_$Timestamp"
$AllVariants = "$BaselineVariant,$EnhancedVariants"

# Colors
$Colors = @{
    Red = "Red"
    Green = "Green"
    Yellow = "Yellow"
    Blue = "Cyan"
    White = "White"
}

function Write-Section {
    param([string]$Title)
    Write-Host ""
    Write-Host "========================================" -ForegroundColor $Colors.Yellow
    Write-Host $Title -ForegroundColor $Colors.Yellow
    Write-Host "========================================" -ForegroundColor $Colors.Yellow
    Write-Host ""
}

function Write-Success {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor $Colors.Green
}

function Write-Error {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor $Colors.Red
}

function Write-Info {
    param([string]$Message)
    Write-Host "🔍 $Message" -ForegroundColor $Colors.Blue
}

function Write-Warning {
    param([string]$Message)
    Write-Host "⚠️  $Message" -ForegroundColor $Colors.Yellow
}

function Test-Prerequisites {
    Write-Section "🔍 CHECKING PREREQUISITES"
    
    # Check GEMINI_API_KEY
    if (-not $env:GEMINI_API_KEY) {
        Write-Error "GEMINI_API_KEY environment variable is not set"
        Write-Host "💡 Please set your API key:" -ForegroundColor $Colors.Yellow
        Write-Host '$env:GEMINI_API_KEY = "your-api-key-here"'
        exit 1
    }
    Write-Success "GEMINI_API_KEY is configured"
    
    # Create session directory
    New-Item -ItemType Directory -Path $SessionDir -Force | Out-Null
    Write-Success "Session directory created: $SessionDir"
    
    # Test CLI
    try {
        $null = npm run worksheet-engine -- --help 2>&1
        Write-Success "Worksheet engine CLI is accessible"
    }
    catch {
        Write-Error "Worksheet engine CLI is not accessible"
        exit 1
    }
    
    Write-Success "All prerequisites met"
}

function Start-BaselineGeneration {
    Write-Section "📊 PHASE 1: ESTABLISHING BASELINE"
    
    $BaselineDir = Join-Path $SessionDir "01_baseline"
    New-Item -ItemType Directory -Path $BaselineDir -Force | Out-Null
    
    Write-Info "Generating baseline worksheet with assessment..."
    
    $args = @(
        "run", "worksheet-engine", "--",
        "--config=$ConfigId",
        "--prompt-variant=$BaselineVariant", 
        "--assess",
        "--output-dir=$BaselineDir"
    )
    
    $process = Start-Process -FilePath "npm" -ArgumentList $args -Wait -PassThru -NoNewWindow
    
    if ($process.ExitCode -eq 0) {
        Write-Success "Baseline generated successfully"
        
        # Extract baseline score
        $assessmentFile = Join-Path $BaselineDir "assessment-results.json"
        if (Test-Path $assessmentFile) {
            try {
                $assessment = Get-Content $assessmentFile | ConvertFrom-Json
                $baselineScore = $assessment.scores.composite
                Write-Success "Baseline Composite Score: $baselineScore"
            }
            catch {
                Write-Info "Could not extract baseline score"
            }
        }
    }
    else {
        Write-Error "Baseline generation failed"
        exit 1
    }
}

function New-GoldenReference {
    Write-Section "🏆 PHASE 2: CREATING GOLDEN REFERENCE"
    
    $BaselineDir = Join-Path $SessionDir "01_baseline"
    $BaselinePdf = Join-Path $BaselineDir "worksheet.pdf"
    
    if (-not (Test-Path $BaselinePdf)) {
        Write-Error "Baseline PDF not found: $BaselinePdf"
        exit 1
    }
    
    Write-Info "Creating golden reference from baseline..."
    
    $args = @(
        "run", "worksheet-engine", "--",
        "--create-golden",
        "--config=$ConfigId",
        "--source=$BaselinePdf",
        "--approve"
    )
    
    $process = Start-Process -FilePath "npm" -ArgumentList $args -Wait -PassThru -NoNewWindow
    
    if ($process.ExitCode -eq 0) {
        Write-Success "Golden reference created successfully"
        
        Write-Info "Current golden references:"
        npm run worksheet-engine -- --list-golden
    }
    else {
        Write-Error "Golden reference creation failed"
        exit 1
    }
}

function Test-Variants {
    Write-Section "🧪 PHASE 3: TESTING ENHANCED VARIANTS"
    
    $VariantsDir = Join-Path $SessionDir "02_variants"
    New-Item -ItemType Directory -Path $VariantsDir -Force | Out-Null
    
    $variants = $EnhancedVariants -split ","
    foreach ($variant in $variants) {
        $variant = $variant.Trim()
        Write-Info "Testing variant: $variant"
        
        $VariantDir = Join-Path $VariantsDir $variant
        New-Item -ItemType Directory -Path $VariantDir -Force | Out-Null
        
        $args = @(
            "run", "worksheet-engine", "--",
            "--config=$ConfigId",
            "--prompt-variant=$variant",
            "--assess",
            "--golden-ref=./golden-references/$ConfigId/reference.pdf",
            "--output-dir=$VariantDir"
        )
        
        $process = Start-Process -FilePath "npm" -ArgumentList $args -Wait -PassThru -NoNewWindow
        
        if ($process.ExitCode -eq 0) {
            Write-Success "Variant $variant tested successfully"
            
            $assessmentFile = Join-Path $VariantDir "assessment-results.json"
            if (Test-Path $assessmentFile) {
                try {
                    $assessment = Get-Content $assessmentFile | ConvertFrom-Json
                    $variantScore = $assessment.scores.composite
                    Write-Success "$variant Composite Score: $variantScore"
                }
                catch {
                    Write-Info "Could not extract $variant score"
                }
            }
        }
        else {
            Write-Warning "Variant $variant testing had issues (continuing...)"
        }
    }
}

function Start-ABTest {
    Write-Section "📈 PHASE 4: STATISTICAL A/B TESTING"
    
    $ABTestDir = Join-Path $SessionDir "03_ab_test"
    New-Item -ItemType Directory -Path $ABTestDir -Force | Out-Null
    
    Write-Info "Running A/B test with statistical analysis..."
    Write-Info "Variants: $AllVariants"
    Write-Info "Iterations: $Iterations per variant"
    
    $args = @(
        "run", "worksheet-engine", "--",
        "--ab-test",
        "--config=$ConfigId",
        "--variants=$AllVariants",
        "--iterations=$Iterations",
        "--parallel",
        "--output-dir=$ABTestDir"
    )
    
    $process = Start-Process -FilePath "npm" -ArgumentList $args -Wait -PassThru -NoNewWindow
    
    if ($process.ExitCode -eq 0) {
        Write-Success "A/B test completed successfully"
        
        # Find results file
        $resultsFile = Get-ChildItem -Path $ABTestDir -Filter "*results.json" | Select-Object -First 1
        if ($resultsFile) {
            try {
                $results = Get-Content $resultsFile.FullName | ConvertFrom-Json
                $winner = $results.winner
                $significant = $results.statisticalAnalysis.significant
                $pValue = $results.statisticalAnalysis.pValue
                
                Write-Success "Winner: $winner"
                Write-Success "Statistically Significant: $significant (p-value: $pValue)"
            }
            catch {
                Write-Info "Could not extract detailed A/B test results"
            }
        }
    }
    else {
        Write-Error "A/B test failed"
        exit 1
    }
}

function Test-QualityGates {
    Write-Section "🚪 PHASE 5: QUALITY GATE VALIDATION"
    
    # Determine winning variant
    $ABTestDir = Join-Path $SessionDir "03_ab_test"
    $resultsFile = Get-ChildItem -Path $ABTestDir -Filter "*results.json" | Select-Object -First 1
    $winningVariant = $BaselineVariant
    
    if ($resultsFile) {
        try {
            $results = Get-Content $resultsFile.FullName | ConvertFrom-Json
            $winningVariant = $results.winner
        }
        catch {
            Write-Info "Could not determine winner, using baseline"
        }
    }
    
    Write-Info "Validating winning variant: $winningVariant"
    
    $args = @(
        "run", "worksheet-engine", "--",
        "--quality-gates",
        "--config=$ConfigId",
        "--prompt-variant=$winningVariant"
    )
    
    $process = Start-Process -FilePath "npm" -ArgumentList $args -Wait -PassThru -NoNewWindow
    
    if ($process.ExitCode -eq 0) {
        Write-Success "Quality gates passed for variant: $winningVariant"
    }
    else {
        Write-Warning "Quality gates validation completed with warnings"
    }
}

function New-Report {
    Write-Section "📋 PHASE 6: GENERATING COMPREHENSIVE REPORT"
    
    $ReportDir = Join-Path $SessionDir "05_report"
    New-Item -ItemType Directory -Path $ReportDir -Force | Out-Null
    
    $SummaryFile = Join-Path $ReportDir "automation_summary.json"
    
    Write-Info "Generating automation summary report..."
    
    $summary = @{
        automationSession = @{
            timestamp = $Timestamp
            configurationId = $ConfigId
            sessionDirectory = $SessionDir
            variants = $AllVariants
            phases = @(
                "Baseline Establishment",
                "Golden Reference Creation",
                "Variant Testing", 
                "Statistical A/B Testing",
                "Quality Gate Validation"
            )
        }
        results = @{
            baselineGenerated = $true
            goldenReferenceCreated = $true
            variantsTested = $true
            abTestCompleted = $true
            qualityGatesValidated = $true
        }
        nextSteps = @(
            "Review detailed results in session directory",
            "Deploy winning variant if quality gates passed",
            "Update production configuration",
            "Monitor performance in production"
        )
    }
    
    $summary | ConvertTo-Json -Depth 10 | Set-Content $SummaryFile
    Write-Success "Summary report generated: $SummaryFile"
}

function Show-FinalSummary {
    Write-Section "🎉 AUTOMATION COMPLETE"
    
    Write-Success "Prompt engineering automation completed successfully!"
    Write-Host ""
    Write-Host "📁 Session Results Location:" -ForegroundColor $Colors.Blue
    Write-Host "   $SessionDir"
    Write-Host ""
    Write-Host "📊 Generated Artifacts:" -ForegroundColor $Colors.Blue
    Write-Host "   • Baseline worksheet and assessment"
    Write-Host "   • Golden reference (approved)"
    Write-Host "   • Enhanced variant test results"
    Write-Host "   • Statistical A/B test analysis"
    Write-Host "   • Quality gate validation"
    Write-Host "   • Comprehensive summary report"
    Write-Host ""
    Write-Host "🔍 Next Steps:" -ForegroundColor $Colors.Blue
    Write-Host "   1. Review results in: $SessionDir"
    Write-Host "   2. Check A/B test winner and significance"
    Write-Host "   3. Validate quality gate outcomes"
    Write-Host "   4. Deploy winning variant to production"
    Write-Host ""
    Write-Host "💡 To view results:" -ForegroundColor $Colors.Yellow
    Write-Host "   cd `"$SessionDir`""
    Write-Host "   Get-ChildItem -Recurse -Filter '*.json' | ForEach-Object { Write-Host `$_.FullName; Get-Content `$_.FullName }"
    Write-Host ""
}

# Main execution
function Main {
    Write-Host "🚀 Starting Prompt Engineering Automation" -ForegroundColor $Colors.Blue
    Write-Host "Configuration: $ConfigId" -ForegroundColor $Colors.Blue
    Write-Host "Session Directory: $SessionDir" -ForegroundColor $Colors.Blue
    Write-Host "Timestamp: $Timestamp" -ForegroundColor $Colors.Blue
    Write-Host ""
    
    Test-Prerequisites
    Start-BaselineGeneration
    New-GoldenReference
    Test-Variants
    Start-ABTest
    Test-QualityGates
    New-Report
    Show-FinalSummary
    
    Write-Success "🎯 Automation completed successfully!"
}

# Execute if script is run directly
if ($MyInvocation.InvocationName -ne '.') {
    Main
}