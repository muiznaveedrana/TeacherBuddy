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

// Proven working baseline configurations (tested and successful)
const BASELINE_CONFIGS = [
    // Year 1 (Ages 5-6) - Working configurations
    { name: 'year1-addition', yearGroup: 'Year 1', topic: 'addition-subtraction', subtopic: 'numbers-to-10', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year1-counting', yearGroup: 'Year 1', topic: 'number-counting', subtopic: 'counting-objects', difficulty: 'average', questionCount: 5, layout: 'standard' },

    // Year 2 (Ages 6-7) - Working configurations
    { name: 'year2-addition', yearGroup: 'Year 2', topic: 'addition-subtraction', subtopic: 'two-digit-numbers', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year2-money', yearGroup: 'Year 2', topic: 'money', subtopic: 'coins-notes', difficulty: 'average', questionCount: 5, layout: 'standard' },

    // Year 3 (Ages 7-8) - Working configurations
    { name: 'year3-addition', yearGroup: 'Year 3', topic: 'addition-subtraction', subtopic: 'three-digit-numbers', difficulty: 'average', questionCount: 5, layout: 'standard' },

    // Year 4 (Ages 8-9) - Working configurations
    { name: 'year4-multiplication', yearGroup: 'Year 4', topic: 'multiplication-division', subtopic: 'formal-methods', difficulty: 'average', questionCount: 5, layout: 'standard' },

    // Year 5 (Ages 9-10) - Working configurations
    { name: 'year5-fractions', yearGroup: 'Year 5', topic: 'fractions-decimals', subtopic: 'fraction-operations', difficulty: 'average', questionCount: 5, layout: 'standard' },

    // Year 6 (Ages 10-11) - Working configurations
    { name: 'year6-algebra', yearGroup: 'Year 6', topic: 'algebra', subtopic: 'simple-equations', difficulty: 'average', questionCount: 5, layout: 'standard' },

    // Additional proven configurations to expand coverage
    { name: 'year1-subtraction', yearGroup: 'Year 1', topic: 'addition-subtraction', subtopic: 'numbers-to-10', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year2-subtraction', yearGroup: 'Year 2', topic: 'addition-subtraction', subtopic: 'two-digit-numbers', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year2-multiplication', yearGroup: 'Year 2', topic: 'multiplication-division', subtopic: 'times-tables-2-5-10', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year3-subtraction', yearGroup: 'Year 3', topic: 'addition-subtraction', subtopic: 'three-digit-numbers', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year3-multiplication', yearGroup: 'Year 3', topic: 'multiplication-division', subtopic: 'times-tables', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year4-division', yearGroup: 'Year 4', topic: 'multiplication-division', subtopic: 'formal-methods', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year4-fractions', yearGroup: 'Year 4', topic: 'fractions-decimals', subtopic: 'fraction-operations', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year5-decimals', yearGroup: 'Year 5', topic: 'fractions-decimals', subtopic: 'fraction-operations', difficulty: 'average', questionCount: 5, layout: 'standard' },
    { name: 'year6-percentages', yearGroup: 'Year 6', topic: 'fractions-decimals', subtopic: 'fraction-operations', difficulty: 'average', questionCount: 5, layout: 'standard' }
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
console.log('');

// Function to generate PDF for a single configuration
async function generatePDF(config, index, total) {
    console.log(`📊 [${index + 1}/${total}] ${config.name}`);

    try {
        // Step 1: Generate worksheet HTML
        const worksheetResponse = await fetch('http://localhost:3001/api/generate-worksheet', {
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
        const pdfResponse = await fetch('http://localhost:3001/api/worksheets/generate-pdf', {
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
    // Check server is running
    try {
        await fetch('http://localhost:3001/api/generate-worksheet', { method: 'GET' });
        console.log('✅ Next.js server detected\n');
    } catch (error) {
        console.log('❌ Next.js server not running on port 3001');
        console.log('   Please run: npm run dev');
        console.log('   Then start this script again.\n');
        process.exit(1);
    }

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