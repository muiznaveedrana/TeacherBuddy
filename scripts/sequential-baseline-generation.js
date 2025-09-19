#!/usr/bin/env node

/**
 * Unified Sequential Baseline Generation
 * Generates ONLY PDF files for baseline worksheets across all year groups
 * Clean, organized results with comprehensive coverage
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Sequential Baseline Generation (Unified)');
console.log('===========================================');
console.log('Generates ONLY PDF files for all year groups and topics');
console.log('Clean results with no extra files\n');

// Complete baseline configurations covering all 78 topic-subtopic combinations
const BASELINE_CONFIGS = [
    // Reception (Ages 4-5) - 6 configurations
    { name: 'reception-counting-to-10', yearGroup: 'Reception', topic: 'number-counting', subtopic: 'counting-to-10', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'reception-number-recognition', yearGroup: 'Reception', topic: 'number-counting', subtopic: 'number-recognition', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'reception-more-or-less', yearGroup: 'Reception', topic: 'number-counting', subtopic: 'more-or-less', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'reception-basic-shapes', yearGroup: 'Reception', topic: 'shape-space', subtopic: 'basic-shapes', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'reception-patterns', yearGroup: 'Reception', topic: 'shape-space', subtopic: 'patterns', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'reception-size-comparison', yearGroup: 'Reception', topic: 'shape-space', subtopic: 'size-comparison', difficulty: 'average', questionCount: 5, layout: 'standard' },

    // Year 1 (Ages 5-6) - 9 configurations
    { name: 'year1-numbers-to-20', yearGroup: 'Year 1', topic: 'number-place-value', subtopic: 'numbers-to-20', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year1-counting-forwards-backwards', yearGroup: 'Year 1', topic: 'number-place-value', subtopic: 'counting-forwards-backwards', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year1-number-bonds-10', yearGroup: 'Year 1', topic: 'number-place-value', subtopic: 'number-bonds-10', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year1-adding-to-20', yearGroup: 'Year 1', topic: 'addition-subtraction', subtopic: 'adding-to-20', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year1-subtracting-within-20', yearGroup: 'Year 1', topic: 'addition-subtraction', subtopic: 'subtracting-within-20', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year1-word-problems-simple', yearGroup: 'Year 1', topic: 'addition-subtraction', subtopic: 'word-problems-simple', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year1-length-height', yearGroup: 'Year 1', topic: 'measurement', subtopic: 'length-height', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year1-weight-capacity', yearGroup: 'Year 1', topic: 'measurement', subtopic: 'weight-capacity', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year1-time-days-months', yearGroup: 'Year 1', topic: 'measurement', subtopic: 'time-days-months', difficulty: 'average', questionCount: 5, layout: 'standard' },

    // Year 2 (Ages 6-7) - 9 configurations
    { name: 'year2-numbers-to-100', yearGroup: 'Year 2', topic: 'number-place-value', subtopic: 'numbers-to-100', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year2-comparing-numbers', yearGroup: 'Year 2', topic: 'number-place-value', subtopic: 'comparing-numbers', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year2-rounding-nearest-10', yearGroup: 'Year 2', topic: 'number-place-value', subtopic: 'rounding-nearest-10', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year2-two-digit-numbers', yearGroup: 'Year 2', topic: 'addition-subtraction', subtopic: 'two-digit-numbers', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year2-mental-strategies', yearGroup: 'Year 2', topic: 'addition-subtraction', subtopic: 'mental-strategies', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year2-word-problems', yearGroup: 'Year 2', topic: 'addition-subtraction', subtopic: 'word-problems', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year2-times-tables-2-5-10', yearGroup: 'Year 2', topic: 'multiplication-division', subtopic: 'times-tables-2-5-10', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year2-equal-groups', yearGroup: 'Year 2', topic: 'multiplication-division', subtopic: 'equal-groups', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year2-sharing-grouping', yearGroup: 'Year 2', topic: 'multiplication-division', subtopic: 'sharing-grouping', difficulty: 'average', questionCount: 5, layout: 'standard' },

    // Year 3 (Ages 7-8) - 12 configurations
    { name: 'year3-numbers-to-1000', yearGroup: 'Year 3', topic: 'number-place-value', subtopic: 'numbers-to-1000', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year3-comparing-ordering', yearGroup: 'Year 3', topic: 'number-place-value', subtopic: 'comparing-ordering', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year3-rounding-nearest-100', yearGroup: 'Year 3', topic: 'number-place-value', subtopic: 'rounding-nearest-100', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year3-three-digit-numbers', yearGroup: 'Year 3', topic: 'addition-subtraction', subtopic: 'three-digit-numbers', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year3-written-methods', yearGroup: 'Year 3', topic: 'addition-subtraction', subtopic: 'written-methods', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year3-problem-solving', yearGroup: 'Year 3', topic: 'addition-subtraction', subtopic: 'problem-solving', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year3-times-tables-3-4-8', yearGroup: 'Year 3', topic: 'multiplication-division', subtopic: 'times-tables-3-4-8', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year3-written-methods-multiply', yearGroup: 'Year 3', topic: 'multiplication-division', subtopic: 'written-methods-multiply', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year3-division-remainders', yearGroup: 'Year 3', topic: 'multiplication-division', subtopic: 'division-remainders', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year3-unit-fractions', yearGroup: 'Year 3', topic: 'fractions', subtopic: 'unit-fractions', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year3-equivalent-fractions-simple', yearGroup: 'Year 3', topic: 'fractions', subtopic: 'equivalent-fractions-simple', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year3-comparing-fractions', yearGroup: 'Year 3', topic: 'fractions', subtopic: 'comparing-fractions', difficulty: 'average', questionCount: 5, layout: 'standard' },

    // Year 4 (Ages 8-9) - 12 configurations
    { name: 'year4-four-digit-numbers', yearGroup: 'Year 4', topic: 'number-place-value', subtopic: 'four-digit-numbers', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year4-negative-numbers', yearGroup: 'Year 4', topic: 'number-place-value', subtopic: 'negative-numbers', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year4-rounding-1000-10000', yearGroup: 'Year 4', topic: 'number-place-value', subtopic: 'rounding-1000-10000', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year4-four-digit-calculations', yearGroup: 'Year 4', topic: 'addition-subtraction', subtopic: 'four-digit-calculations', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year4-efficient-methods', yearGroup: 'Year 4', topic: 'addition-subtraction', subtopic: 'efficient-methods', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year4-multi-step-problems', yearGroup: 'Year 4', topic: 'addition-subtraction', subtopic: 'multi-step-problems', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year4-times-tables-to-12', yearGroup: 'Year 4', topic: 'multiplication-division', subtopic: 'times-tables-to-12', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year4-formal-written-methods', yearGroup: 'Year 4', topic: 'multiplication-division', subtopic: 'formal-written-methods', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year4-factor-pairs', yearGroup: 'Year 4', topic: 'multiplication-division', subtopic: 'factor-pairs', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year4-equivalent-fractions', yearGroup: 'Year 4', topic: 'fractions-decimals', subtopic: 'equivalent-fractions', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year4-decimal-tenths', yearGroup: 'Year 4', topic: 'fractions-decimals', subtopic: 'decimal-tenths', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year4-fraction-decimal-conversion', yearGroup: 'Year 4', topic: 'fractions-decimals', subtopic: 'fraction-decimal-conversion', difficulty: 'average', questionCount: 5, layout: 'standard' },

    // Year 5 (Ages 9-10) - 12 configurations
    { name: 'year5-numbers-to-million', yearGroup: 'Year 5', topic: 'number-place-value', subtopic: 'numbers-to-million', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year5-powers-of-10', yearGroup: 'Year 5', topic: 'number-place-value', subtopic: 'powers-of-10', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year5-negative-number-contexts', yearGroup: 'Year 5', topic: 'number-place-value', subtopic: 'negative-number-contexts', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year5-mental-methods-large-numbers', yearGroup: 'Year 5', topic: 'addition-subtraction', subtopic: 'mental-methods-large-numbers', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year5-multi-step-word-problems', yearGroup: 'Year 5', topic: 'addition-subtraction', subtopic: 'multi-step-word-problems', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year5-checking-strategies', yearGroup: 'Year 5', topic: 'addition-subtraction', subtopic: 'checking-strategies', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year5-multiply-up-to-4-digits', yearGroup: 'Year 5', topic: 'multiplication-division', subtopic: 'multiply-up-to-4-digits', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year5-divide-up-to-4-digits', yearGroup: 'Year 5', topic: 'multiplication-division', subtopic: 'divide-up-to-4-digits', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year5-factors-multiples-primes', yearGroup: 'Year 5', topic: 'multiplication-division', subtopic: 'factors-multiples-primes', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year5-improper-fractions-mixed', yearGroup: 'Year 5', topic: 'fractions-decimals-percentages', subtopic: 'improper-fractions-mixed', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year5-decimal-up-to-3-places', yearGroup: 'Year 5', topic: 'fractions-decimals-percentages', subtopic: 'decimal-up-to-3-places', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year5-percentage-equivalents', yearGroup: 'Year 5', topic: 'fractions-decimals-percentages', subtopic: 'percentage-equivalents', difficulty: 'average', questionCount: 5, layout: 'standard' },

    // Year 6 (Ages 10-11) - 18 configurations
    { name: 'year6-numbers-to-10-million', yearGroup: 'Year 6', topic: 'number-place-value', subtopic: 'numbers-to-10-million', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year6-rounding-any-degree', yearGroup: 'Year 6', topic: 'number-place-value', subtopic: 'rounding-any-degree', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year6-negative-number-calculations', yearGroup: 'Year 6', topic: 'number-place-value', subtopic: 'negative-number-calculations', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year6-mental-calculations-complex', yearGroup: 'Year 6', topic: 'addition-subtraction', subtopic: 'mental-calculations-complex', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year6-solve-multi-step-problems', yearGroup: 'Year 6', topic: 'addition-subtraction', subtopic: 'solve-multi-step-problems', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year6-use-estimation', yearGroup: 'Year 6', topic: 'addition-subtraction', subtopic: 'use-estimation', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year6-multiply-4-digits-by-2-digits', yearGroup: 'Year 6', topic: 'multiplication-division', subtopic: 'multiply-4-digits-by-2-digits', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year6-divide-4-digits-by-2-digits', yearGroup: 'Year 6', topic: 'multiplication-division', subtopic: 'divide-4-digits-by-2-digits', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year6-common-factors-multiples', yearGroup: 'Year 6', topic: 'multiplication-division', subtopic: 'common-factors-multiples', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year6-four-operations-fractions', yearGroup: 'Year 6', topic: 'fractions-decimals-percentages', subtopic: 'four-operations-fractions', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year6-decimal-calculations', yearGroup: 'Year 6', topic: 'fractions-decimals-percentages', subtopic: 'decimal-calculations', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year6-percentage-calculations', yearGroup: 'Year 6', topic: 'fractions-decimals-percentages', subtopic: 'percentage-calculations', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year6-simple-formulae', yearGroup: 'Year 6', topic: 'algebra', subtopic: 'simple-formulae', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year6-linear-sequences', yearGroup: 'Year 6', topic: 'algebra', subtopic: 'linear-sequences', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year6-missing-numbers', yearGroup: 'Year 6', topic: 'algebra', subtopic: 'missing-numbers', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year6-ratio-problems', yearGroup: 'Year 6', topic: 'ratio-proportion', subtopic: 'ratio-problems', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year6-scale-factors', yearGroup: 'Year 6', topic: 'ratio-proportion', subtopic: 'scale-factors', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year6-unequal-sharing', yearGroup: 'Year 6', topic: 'ratio-proportion', subtopic: 'unequal-sharing', difficulty: 'average', questionCount: 5, layout: 'standard' }
];

// Group configurations by year group for organized output
const YEAR_GROUPS = {
    'Reception': [],
    'Year 1': [],
    'Year 2': [],
    'Year 3': [],
    'Year 4': [],
    'Year 5': [],
    'Year 6': []
};

// Organize configs by year group
BASELINE_CONFIGS.forEach(config => {
    YEAR_GROUPS[config.yearGroup].push(config);
});

// Create results directory
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
const resultsDir = `./baseline-pdfs-${timestamp}`;

if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
}

console.log(`📁 Results: ${resultsDir}`);
console.log(`📊 Total configurations: ${BASELINE_CONFIGS.length}`);
console.log(`📚 Year groups: ${Object.keys(YEAR_GROUPS).length}`);
console.log(`✅ Complete coverage: All 78 topic-subtopic combinations included`);
console.log('');

// Function to generate PDF for a single configuration
async function generatePDF(config, index, total) {
    console.log(`📊 [${index + 1}/${total}] ${config.name}`);

    try {
        // Step 1: Generate worksheet HTML
        const worksheetResponse = await fetch('http://localhost:3000/api/generate-worksheet', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                layout: config.layout,
                topic: config.topic,
                subtopic: config.subtopic,
                difficulty: config.difficulty,
                questionCount: config.questionCount,
                yearGroup: config.yearGroup,
                nameList: 'year3-class-a'
            })
        });

        if (!worksheetResponse.ok) {
            throw new Error(`Worksheet API error ${worksheetResponse.status}`);
        }

        const worksheetData = await worksheetResponse.json();
        if (!worksheetData.success) {
            throw new Error(`Generation failed: ${worksheetData.message}`);
        }

        // Step 2: Generate PDF from HTML
        const pdfResponse = await fetch('http://localhost:3000/api/worksheets/generate-pdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer mock-session-token'
            },
            body: JSON.stringify({
                config: {
                    layout: config.layout,
                    topic: config.topic,
                    subtopic: config.subtopic,
                    difficulty: config.difficulty,
                    questionCount: config.questionCount,
                    yearGroup: config.yearGroup,
                    studentNames: ['Emma', 'Oliver', 'Sophie', 'James', 'Lily']
                },
                generatedContent: worksheetData.worksheet.html,
                title: worksheetData.worksheet.title
            })
        });

        if (!pdfResponse.ok) {
            throw new Error(`PDF API error ${pdfResponse.status}`);
        }

        // Step 3: Save PDF in organized structure
        const yearDir = path.join(resultsDir, config.yearGroup.toLowerCase().replace(' ', ''));
        if (!fs.existsSync(yearDir)) {
            fs.mkdirSync(yearDir, { recursive: true });
        }

        const filename = `${config.name}.pdf`;
        const filepath = path.join(yearDir, filename);
        const pdfBuffer = Buffer.from(await pdfResponse.arrayBuffer());
        fs.writeFileSync(filepath, pdfBuffer);

        const sizeKB = Math.round(pdfBuffer.length / 1024);
        console.log(`  ✅ ${filename} (${sizeKB}KB)`);
        return true;

    } catch (error) {
        console.log(`  ❌ ${error.message}`);
        return false;
    }
}

// Main execution function
async function generateAllBaselines() {
    // Skip server check for now - assume server is running
    console.log('✅ Assuming Next.js server is running on port 3000\n');

    let successful = 0;
    const total = BASELINE_CONFIGS.length;
    const startTime = Date.now();

    console.log('🎯 Starting sequential baseline generation...\n');

    // Process each year group
    for (const [yearGroup, configs] of Object.entries(YEAR_GROUPS)) {
        if (configs.length === 0) continue;

        console.log(`\n🎯 ${yearGroup.toUpperCase()} (${configs.length} topics)`);
        console.log('='.repeat(50));

        // Process each configuration in the year group
        for (let i = 0; i < configs.length; i++) {
            const globalIndex = BASELINE_CONFIGS.indexOf(configs[i]);
            const success = await generatePDF(configs[i], globalIndex, total);
            if (success) successful++;

            // Small delay between requests
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        // Year group summary
        const yearSuccessful = configs.filter(config => {
            const yearDir = path.join(resultsDir, yearGroup.toLowerCase().replace(' ', ''));
            const filepath = path.join(yearDir, `${config.name}.pdf`);
            return fs.existsSync(filepath);
        }).length;

        console.log(`📊 ${yearGroup} Complete: ${yearSuccessful}/${configs.length} PDFs generated`);
    }

    const duration = Math.round((Date.now() - startTime) / 1000);

    console.log('\n🏁 SEQUENTIAL BASELINE GENERATION COMPLETE');
    console.log('==========================================');
    console.log(`📊 Success Rate: ${successful}/${total} PDFs generated`);
    console.log(`⏱️  Total Time: ${Math.floor(duration / 60)}m ${duration % 60}s`);
    console.log(`📁 Results: ${resultsDir}\n`);

    // Show organized file structure
    console.log('📋 Generated PDF Structure:');
    Object.keys(YEAR_GROUPS).forEach(yearGroup => {
        const yearDir = path.join(resultsDir, yearGroup.toLowerCase().replace(' ', ''));
        if (fs.existsSync(yearDir)) {
            console.log(`📂 ${yearGroup}/`);
            const files = fs.readdirSync(yearDir).filter(f => f.endsWith('.pdf'));
            files.forEach(file => {
                const stats = fs.statSync(path.join(yearDir, file));
                const sizeKB = Math.round(stats.size / 1024);
                console.log(`   📄 ${file} (${sizeKB}KB)`);
            });
        }
    });

    // Create comprehensive summary
    const summary = {
        generatedAt: new Date().toISOString(),
        totalConfigurations: total,
        successfulGenerations: successful,
        failedGenerations: total - successful,
        generationTimeSeconds: duration,
        resultsDirectory: resultsDir,
        yearGroupBreakdown: {}
    };

    // Calculate year group breakdown
    Object.keys(YEAR_GROUPS).forEach(yearGroup => {
        const yearDir = path.join(resultsDir, yearGroup.toLowerCase().replace(' ', ''));
        const pdfCount = fs.existsSync(yearDir) ?
            fs.readdirSync(yearDir).filter(f => f.endsWith('.pdf')).length : 0;

        summary.yearGroupBreakdown[yearGroup] = {
            expectedConfigurations: YEAR_GROUPS[yearGroup].length,
            generatedPDFs: pdfCount,
            successRate: `${pdfCount}/${YEAR_GROUPS[yearGroup].length}`
        };
    });

    // Save summary
    fs.writeFileSync(
        path.join(resultsDir, 'generation-summary.json'),
        JSON.stringify(summary, null, 2)
    );

    console.log(`\n📄 Summary: ${path.join(resultsDir, 'generation-summary.json')}`);
    console.log('\n✨ Sequential baseline generation complete!');
    console.log('🎯 RESULT: Clean directories with ONLY PDF files organized by year group!');

    if (successful === total) {
        console.log('🏆 Perfect Success: All configurations generated successfully!');
    } else if (successful > total * 0.8) {
        console.log('🥉 Good Success: Most configurations generated. Review failed ones for retry.');
    } else {
        console.log('⚠️  Partial Success: Several configurations failed. Check API/server status.');
    }
}

// Start the generation process
generateAllBaselines().catch(error => {
    console.error('\n❌ Fatal Error:', error.message);
    process.exit(1);
});