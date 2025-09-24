#!/usr/bin/env node

/**
 * Simple Baseline Generation
 * Generates exactly 2 worksheets per year group for quick testing
 * Clean, minimal setup with representative samples
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Simple Baseline Generation');
console.log('============================');
console.log('Generates 2 worksheets per year group for quick baseline testing');
console.log('Total: 14 PDFs across 7 year groups\n');

// Simple configurations - 2 representative worksheets per year group
const SIMPLE_CONFIGS = [
    // Reception (Ages 4-5) - 2 worksheets
    { name: 'reception-counting-to-10', yearGroup: 'Reception', topic: 'number-counting', subtopic: 'counting-to-10', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'reception-basic-shapes', yearGroup: 'Reception', topic: 'shape-space', subtopic: 'basic-shapes', difficulty: 'average', questionCount: 5, layout: 'standard' },

    // Year 1 (Ages 5-6) - 2 worksheets
    { name: 'year1-numbers-to-20', yearGroup: 'Year 1', topic: 'number-place-value', subtopic: 'numbers-to-20', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year1-adding-to-20', yearGroup: 'Year 1', topic: 'addition-subtraction', subtopic: 'adding-to-20', difficulty: 'average', questionCount: 5, layout: 'standard' },

    // Year 2 (Ages 6-7) - 2 worksheets
    { name: 'year2-numbers-to-100', yearGroup: 'Year 2', topic: 'number-place-value', subtopic: 'numbers-to-100', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year2-times-tables-2-5-10', yearGroup: 'Year 2', topic: 'multiplication-division', subtopic: 'times-tables-2-5-10', difficulty: 'average', questionCount: 5, layout: 'standard' },

    // Year 3 (Ages 7-8) - 2 worksheets
    { name: 'year3-numbers-to-1000', yearGroup: 'Year 3', topic: 'number-place-value', subtopic: 'numbers-to-1000', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year3-times-tables-3-4-8', yearGroup: 'Year 3', topic: 'multiplication-division', subtopic: 'times-tables-3-4-8', difficulty: 'average', questionCount: 5, layout: 'standard' },

    // Year 4 (Ages 8-9) - 2 worksheets
    { name: 'year4-four-digit-numbers', yearGroup: 'Year 4', topic: 'number-place-value', subtopic: 'four-digit-numbers', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year4-times-tables-to-12', yearGroup: 'Year 4', topic: 'multiplication-division', subtopic: 'times-tables-to-12', difficulty: 'average', questionCount: 5, layout: 'standard' },

    // Year 5 (Ages 9-10) - 2 worksheets
    { name: 'year5-numbers-to-million', yearGroup: 'Year 5', topic: 'number-place-value', subtopic: 'numbers-to-million', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year5-multiply-up-to-4-digits', yearGroup: 'Year 5', topic: 'multiplication-division', subtopic: 'multiply-up-to-4-digits', difficulty: 'average', questionCount: 5, layout: 'standard' },

    // Year 6 (Ages 10-11) - 2 worksheets
    { name: 'year6-numbers-to-10-million', yearGroup: 'Year 6', topic: 'number-place-value', subtopic: 'numbers-to-10-million', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year6-multiply-4-digits-by-2-digits', yearGroup: 'Year 6', topic: 'multiplication-division', subtopic: 'multiply-4-digits-by-2-digits', difficulty: 'average', questionCount: 5, layout: 'standard' }
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
SIMPLE_CONFIGS.forEach(config => {
    YEAR_GROUPS[config.yearGroup].push(config);
});

// Create results directory
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
const resultsDir = `./simple-baseline-pdfs-${timestamp}`;

if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
}

console.log(`📁 Results: ${resultsDir}`);
console.log(`📊 Total configurations: ${SIMPLE_CONFIGS.length}`);
console.log(`📚 Year groups: ${Object.keys(YEAR_GROUPS).length}`);
console.log(`✅ Simple coverage: 2 worksheets per year group`);
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
async function generateSimpleBaselines() {
    console.log('✅ Assuming Next.js server is running on port 3000\n');

    let successful = 0;
    const total = SIMPLE_CONFIGS.length;
    const startTime = Date.now();

    console.log('🎯 Starting simple baseline generation...\n');

    // Process each year group
    for (const [yearGroup, configs] of Object.entries(YEAR_GROUPS)) {
        if (configs.length === 0) continue;

        console.log(`\n🎯 ${yearGroup.toUpperCase()} (${configs.length} worksheets)`);
        console.log('='.repeat(50));

        // Process each configuration in the year group
        for (let i = 0; i < configs.length; i++) {
            const globalIndex = SIMPLE_CONFIGS.indexOf(configs[i]);
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

    console.log('\n🏁 SIMPLE BASELINE GENERATION COMPLETE');
    console.log('=====================================');
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

    // Create summary
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
    console.log('\n✨ Simple baseline generation complete!');
    console.log('🎯 RESULT: 2 worksheets per year group - quick baseline sample!');

    if (successful === total) {
        console.log('🏆 Perfect Success: All configurations generated successfully!');
    } else if (successful > total * 0.8) {
        console.log('🥉 Good Success: Most configurations generated. Review failed ones for retry.');
    } else {
        console.log('⚠️  Partial Success: Several configurations failed. Check API/server status.');
    }
}

// Start the generation process
generateSimpleBaselines().catch(error => {
    console.error('\n❌ Fatal Error:', error.message);
    process.exit(1);
});