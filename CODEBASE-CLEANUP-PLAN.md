# 🧹 Codebase Cleanup Plan - Files to RETAIN

**Analysis Date**: 2025-10-12
**Current Status**: 100 changed files, 1487 MD files, 49 JS scripts, 47MB quality reports
**Goal**: Reduce to essential ~50-60 files by removing legacy, test, and obsolete artifacts

---

## 📊 Current State Analysis

- **Scripts**: 45 JavaScript files in `/scripts` (many legacy/test iterations)
- **Docs**: 1487 markdown files (massive doc sprawl)
- **Quality Reports**: 47MB of test iteration screenshots and JSON
- **Root Level**: 48 JS/MD files (test scripts, draft docs)
- **Git Status**: 100 files with changes, 90 untracked files

---

## ✅ CORE PRODUCTION FILES TO RETAIN

### 1. **Application Core** (src/)
**RETAIN ALL** - These are the production application

```
src/
├── app/                    # Next.js pages and API routes (ALL)
├── components/             # React components (ALL)
├── lib/
│   ├── services/          # Core services (ALL 13 files):
│   │   ├── promptService.ts          ✅ Main worksheet generation
│   │   ├── gemini.ts                 ✅ AI integration
│   │   ├── scrappingDoodleService.ts ✅ Image service
│   │   ├── configSpecificPromptLoader.ts ✅ Config system
│   │   ├── pdfGenerationService.ts   ✅ PDF generation
│   │   ├── qualityAssurance.ts       ✅ QA system
│   │   ├── imageIntegrationService.ts ✅ Image handling
│   │   ├── hybridSVGService.ts       ✅ SVG handling
│   │   ├── imageLibraryService.ts    ✅ Library management
│   │   ├── countingObjectsService.ts ✅ Object counting
│   │   ├── abTesting.ts              ✅ A/B testing
│   │   ├── rateLimit.ts              ✅ Rate limiting
│   │   └── worksheetObjectsService.ts ✅ Worksheet objects
│   ├── db/                # Database (ALL)
│   ├── hooks/             # React hooks (ALL)
│   ├── types/             # TypeScript types (ALL)
│   └── utils/             # Utilities (ALL)
└── middleware.ts          # Auth middleware
```

**Why**: Production application code - cannot remove anything

---

### 2. **Quality Assessment System** (scripts/)
**RETAIN: 8 files** (Remove 37 legacy/test files)

#### ✅ **Core QA Scripts (KEEP)**
```
scripts/
├── worksheet-quality-assessor.js          ✅ Autonomous wrapper (v2.0)
├── config-quality-assessor.js             ✅ Config-specific assessor
│
├── fixes/
│   ├── fix-registry.js                    ✅ Plugin-based fix system
│   └── prompt-auto-versioning.js          ✅ Auto-versioning
│
├── services/
│   └── vision-validator.js                ✅ Vision AI validation
│
├── analytics/
│   └── quality-trends.js                  ✅ Cross-config analytics
│
├── catalogs/
│   ├── master-vision-catalog.json         ✅ SINGLE source of truth
│   └── claude-vision-tasks.json           ✅ Vision tasks
│
└── consolidate-vision-catalog.js          ✅ Catalog management
```

**Why**: These 8 files form the complete autonomous quality system (v2.0)

#### ❌ **Legacy QA Scripts (DELETE 37 files)**
```
❌ reception-counting-to-10-qa.js          (old, uses page.click selector)
❌ reception-qa-simple.js                  (superseded by config-quality-assessor)
❌ reception-qa-fixed.js                   (superseded)
❌ reception-comprehensive-qa.js           (superseded)
❌ reception-quality-assessment.js         (superseded)
❌ reception-quality-assessment-v2.js      (superseded)
❌ reception-quality-assessment-final.js   (superseded)
❌ reception-quality-assessment-testids.js (superseded)
❌ reception-freshness-qa-comprehensive.js (superseded)
❌ reception-v1.2-assessment.js            (prompt version test)
❌ reception-v1.2-assessment-fixed.js      (prompt version test)
❌ reception-v12-quality-assessment.js     (prompt version test)
❌ reception-v2-quality-assessment.js      (prompt version test)
❌ test-reception-v1.0.js                  (prompt version test)
❌ v1-assessment-5-iterations.js           (prompt version test)
❌ v1.1-quality-assessment.js              (prompt version test)
❌ v1.1-quality-assessment-fixed.js        (prompt version test)
❌ verify-v1-prompt.js                     (prompt version test)
❌ analyze-worksheet-precision.js          (one-time analysis)
❌ quality-assessment-v2.js                (superseded)
❌ quality-assessment-fixes-verification.js(one-time verification)
❌ comprehensive-freshness-assessment.js   (superseded by quality-trends)
❌ worksheet-quality-assessment-vision-enhanced.js (superseded)
❌ worksheet-quality-assessment-with-diversity.js (superseded)
❌ enhanced-autonomous-qa.js               (superseded by worksheet-quality-assessor)
❌ autonomous-worksheet-quality-agent.js   (duplicate, old name)
❌ parallel-config-assessment.js           (experimental)
```

**Why**: All replaced by the 3-file system: `worksheet-quality-assessor.js` + `config-quality-assessor.js` + `fix-registry.js`

---

### 3. **Catalog & Image Management** (scripts/)
**RETAIN: 5 files**

```
✅ scripts/build-image-library-ai-validated.js    (Vision AI catalog builder)
✅ scripts/map-scrapping-doodle-images.js         (Image mapping)
✅ scripts/setup-worksheet-objects.js             (Worksheet objects setup)
✅ scripts/apply-catalog-fixes.js                 (Manual catalog fixes)
✅ scripts/vision-catalog-claude.js               (Claude vision processing)
```

#### ❌ **DELETE 3 legacy files**
```
❌ build-image-library.js                  (superseded by AI-validated version)
❌ build-image-library-with-validation.js  (superseded)
❌ audit-available-objects.js              (one-time audit)
❌ update-catalogs-with-files.js           (one-time update)
```

---

### 4. **Utilities & Automation** (scripts/)
**RETAIN: 3 files**

```
✅ scripts/prompt-engineering-automation.js       (Story Engine 1.1-1.3)
✅ scripts/sequential-baseline-generation.js      (Baseline generation)
✅ scripts/patch-prompt-service-config-specific.js(Config patching)
```

#### ❌ **DELETE 3 files**
```
❌ simple-baseline-generation.js           (superseded by sequential)
❌ test-cli.js                             (test file)
❌ scan-template-quality.js                (one-time scan)
```

---

### 5. **Documentation** (Root & docs/)
**RETAIN: 12 critical docs** (Delete ~1475 files)

#### ✅ **Keep Core Docs**
```
Root Level:
✅ CLAUDE.md                                   (Claude Code instructions)
✅ README.md                                   (Project readme)
✅ DEPLOYMENT.md                               (Deployment guide)
✅ ENHANCED-AUTONOMOUS-SYSTEM-GUIDE.md         (v2.0 QA system guide)
✅ IMPLEMENTATION-COMPLETE.md                  (Implementation status)

docs/:
✅ docs/vision-catalog-process.md              (Vision catalog process)
✅ docs/WORKSHEET-QUALITY-METRICS.md           (Quality metrics)
✅ docs/AUTONOMOUS-QUALITY-AGENT.md            (Agent documentation)
✅ docs/prompt-engineering-guide.md            (Prompt engineering)

.claude/agents/:
✅ .claude/agents/worksheet-quality-assessor.md (Claude agent config)
```

#### ❌ **DELETE Root Docs (35 files)**
```
❌ CATALOG-AUDIT-REPORT.md                 (one-time audit)
❌ CATALOG-SYSTEM-ARCHITECTURE-CLARIFICATION.md (superseded by guide)
❌ CRITICAL-IMAGE-QUALITY-ISSUES.md        (historical)
❌ ENHANCED-QA-EXECUTION-SUMMARY.md        (execution log)
❌ FRESHNESS-PROBLEM-ANALYSIS.md           (historical analysis)
❌ PROJECT-AUTOMATION-SUMMARY.md           (summary)
❌ RECEPTION-QUALITY-IMPROVEMENT-PLAN.md   (plan doc)
❌ TEST-EXECUTION-SUMMARY.md               (test log)
❌ VOCABULARY-ROTATION-*.md (4 files)      (feature-specific docs)
❌ V1.0-ASSESSMENT-EXECUTIVE-SUMMARY.md    (version-specific)
❌ WORKSHEET-QUALITY-ASSESSOR-GUIDE.md     (superseded by ENHANCED guide)
❌ CRITICAL-FIXES-SUMMARY.md               (fix log)
❌ FINAL-FIXES-COMPLETE.md                 (fix log)

All test scripts in root:
❌ quality-assessment-*.js (7 files)       (test iterations)
❌ reception-quality-assessment*.js (2)    (test iterations)
❌ test-*.js (6 files)                     (test scripts)
❌ fresh-start-test.js                     (test)
❌ final-layout-test.js                    (test)
❌ mobile-test.js                          (test)
❌ quick-visual-test.js                    (test)
❌ add-freshness-logging.js                (one-time patch)
❌ implement-vocabulary-rotation.js        (one-time implementation)
❌ nul                                     (empty file)
```

#### ❌ **DELETE docs/ subdirectories (Retain only ~10 files)**
```
❌ docs/architecture/        (~50 files - comprehensive but outdated)
❌ docs/analysis/            (~20 files - historical analysis)
❌ docs/OPTION-1-*.md        (option analysis docs)
❌ docs/QA-REVIEW-*.md       (review docs)
❌ docs/SUBTOPIC-GUIDANCE-*.md (feature docs)
❌ docs/TEMPLATE-AUDIT-*.md   (audit docs)
❌ docs/QUESTION-TEMPLATE-AUDIT.md (audit)
❌ docs/IMPLEMENTATION-PLAN-APPROVED.md (historical)
❌ docs/AGENT-WORKFLOW-COMPLETE.md (historical)
❌ docs/ASSESSOR-ENHANCEMENT-SUMMARY.md (historical)
❌ docs/FRESHNESS-TRACKING-*.md (2 files - feature-specific)
❌ docs/PLAYWRIGHT-DROPDOWN-GUIDE.md (guide - can be in code comments)
❌ docs/QUALITY-ASSESSMENT-WITH-DIVERSITY.md (superseded)
❌ docs/QUALITY-GATES-COMPREHENSIVE.md (superseded by quality-metrics)
❌ docs/WORKSHEET-OBJECTS-IMPLEMENTATION.md (superseded)
```

**Why**: Docs should be lean. Keep only essential guides, remove historical analysis/execution logs.

---

### 6. **Quality Reports & Test Data**
**RETAIN: Latest session only** (~1MB instead of 47MB)

#### ✅ **Keep Latest Autonomous Session**
```
✅ worksheet-quality-reports/autonomous-sessions/reception-counting-to-10-2025-10-12T14-23-21-651Z/
   (Most recent autonomous run for reference)
```

#### ❌ **DELETE All Other Reports (~46MB)**
```
❌ worksheet-quality-reports/enhanced-autonomous/        (multiple old sessions)
❌ worksheet-quality-reports/final-freshness-*/          (test runs)
❌ worksheet-quality-reports/freshness-test-*/           (test runs)
❌ worksheet-quality-reports/*.png                       (loose screenshots)
❌ worksheet-quality-reports/*.json                      (loose assessments)
```

**Why**: Historical test runs not needed. Keep only latest for reference.

---

### 7. **Catalog Batch Data**
**RETAIN: Consolidated results only**

#### ✅ **Keep**
```
✅ scripts/catalogs/master-vision-catalog.json          (PRIMARY)
✅ scripts/catalogs/claude-vision-tasks.json            (tasks)
✅ scripts/catalogs/master-vision-catalog.backup.json   (backup)
```

#### ❌ **DELETE Batch Processing Data (~900KB)**
```
❌ scripts/catalogs/batch-results/        (raw batch results)
❌ scripts/catalogs/batch-prompts/        (batch prompts)
❌ scripts/catalogs/BATCH-COMPLETION-STATUS.md (status log)
❌ scripts/catalogs/skipped-images-log.md (log)
```

**Why**: Batch processing complete, keep only final consolidated catalog.

---

### 8. **Test Images & Screenshots**
**RETAIN: None in root**

#### ❌ **DELETE All Test Images**
```
❌ ./debug-*.png (5 files)                  (debug screenshots)
❌ ./error.png                              (error screenshot)
❌ ./v1-verification-screenshot.png         (verification)
❌ worksheet-quality-reports/*.png          (loose test screenshots)
```

**Why**: Test artifacts, not needed for production.

---

### 9. **Prompt Files**
**RETAIN: Latest version only per config**

```
✅ prompts/config-specific/
   ├── reception-number-counting-counting-to-10-v1.0.ts  ✅ Latest
   └── [other configs latest version only]                ✅
```

#### ❌ **DELETE**
```
❌ prompts/config-specific/*-v0.*.ts       (older versions)
❌ prompts/generic/                        (legacy generic prompts)
❌ prompt-suggestions/                     (untracked, suggestions awaiting review)
```

**Why**: Version control handles history. Keep only production prompts.

---

### 10. **Python Scripts**
**RETAIN: 2 audit scripts**

```
✅ scripts/audit-question-templates.py     (template audit tool)
✅ scripts/apply-template-fixes.py         (template fix tool)
```

#### ❌ **DELETE (if exists)**
```
❌ scripts/verify-template-fixes.py        (one-time verification)
```

---

## 📋 FILES TO RETAIN SUMMARY

### **Total: ~60 Essential Files**

| Category | Files to Keep | Files to Delete | Retention % |
|----------|--------------|-----------------|-------------|
| **src/** | ALL (~100 files) | 0 | 100% |
| **scripts/QA** | 8 | 37 | 18% |
| **scripts/Catalog** | 5 | 3 | 63% |
| **scripts/Utils** | 3 | 3 | 50% |
| **scripts/Python** | 2 | 1 | 67% |
| **Root Docs/Scripts** | 5 | 43 | 10% |
| **docs/** | 10 | ~1477 | <1% |
| **Quality Reports** | 1 session | 43 sessions | <5% |
| **Catalog Data** | 3 JSON | batch-results/ | ~3% |
| **Prompts** | Latest only | Old versions | ~50% |

**Total Size Reduction**: ~47MB → ~2MB (95% reduction in artifacts)

---

## 🎯 RETENTION RATIONALE

### Why These Files?

1. **Production Code** (src/): Cannot remove - this IS the application
2. **Core QA System** (8 scripts): Autonomous v2.0 system with Vision AI, fix registry, analytics
3. **Catalog Management** (5 scripts): AI-validated catalog building and maintenance
4. **Automation** (3 scripts): Prompt engineering and baseline generation
5. **Essential Docs** (12 MD): Core guides only - CLAUDE.md, deployment, v2.0 guide
6. **Latest Session** (1): Most recent autonomous run for debugging reference
7. **Master Catalog** (3 JSON): Single source of truth + backup + tasks

### What Gets Removed?

1. **37 Legacy QA Scripts**: Superseded by 3-file v2.0 system
2. **1475+ Historical Docs**: Execution logs, analysis docs, outdated architecture
3. **43 Test Sessions** (~46MB): Historical quality assessment runs
4. **Batch Processing Data** (~900KB): Raw batch results (consolidated into master catalog)
5. **48 Root Test Files**: Test scripts, one-time patches, execution summaries
6. **Old Prompt Versions**: Git handles version history
7. **Test Screenshots**: Debug/error/verification images

---

## ⚠️ PRE-DELETION CHECKLIST

Before deleting, verify:

- [x] All QA runs use `config-quality-assessor.js` (not legacy scripts)
- [x] Master vision catalog consolidated from all batch results
- [x] Latest prompts backed up in Git
- [x] Core docs saved: ENHANCED-AUTONOMOUS-SYSTEM-GUIDE.md, CLAUDE.md
- [x] One recent quality report session retained for reference
- [ ] User approval on this retention list

---

## 🚀 NEXT STEPS

Once approved:

1. **Archive** (don't delete immediately)
   ```bash
   # Create archive of deleted files
   mkdir ../worksheetgenerator-ai-archive
   # Move files to archive
   ```

2. **Delete in Phases**
   - Phase 1: Test images and loose screenshots
   - Phase 2: Legacy QA scripts
   - Phase 3: Historical docs
   - Phase 4: Old quality reports
   - Phase 5: Batch processing data

3. **Verify System**
   - Run autonomous QA on test config
   - Verify worksheet generation works
   - Check catalog loading
   - Test prompt engineering automation

4. **Commit Clean State**
   ```bash
   git add -A
   git commit -m "chore: remove legacy artifacts, retain essential ~60 files"
   ```

---

**Decision Required**: Please review this list and confirm before deletion.
