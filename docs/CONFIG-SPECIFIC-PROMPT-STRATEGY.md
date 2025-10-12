# Configuration-Specific Prompt Strategy & Implementation Plan

**Date:** 2025-10-11
**Status:** DRAFT - Awaiting Approval
**Total Configurations:** 78 (6 Reception → 18 Year 6)

---

## Executive Summary

This document outlines a **configuration-specific prompt engineering strategy** to achieve maximum worksheet quality by creating laser-focused, optimized prompts for each Year Group × Topic × Subtopic combination.

### Core Strategy
- **One prompt file per configuration** (78 total)
- **Isolated iteration** prevents breaking changes
- **Quality-first approach** using worksheet-quality-assessor agent
- **Gradual rollout**: Reception → Year 6
- **Parallel execution** capability for faster iteration

---

## 1. PROBLEM STATEMENT

### Current System Issues
1. **Generic prompts** trying to serve all 78 configurations
2. **Breaking changes** when improving one configuration affects others
3. **Pedagogical mismatches** (e.g., Reception gets Year 3 complexity)
4. **Token inefficiency** from irrelevant context
5. **Quality inconsistency** across different configurations

### Solution Benefits
✅ **Precision**: Each prompt tailored to specific learning objectives
✅ **Safety**: No cross-configuration breaking changes
✅ **Quality**: Focus on perfecting one config at a time
✅ **Performance**: Shorter, more relevant prompts = lower costs
✅ **Scalability**: Parallel agent execution on multiple configs

---

## 2. SYSTEM ARCHITECTURE

### 2.1 Prompt File Structure

```
src/lib/prompts/
├── base/                           # Shared foundations (reusable)
│   ├── core-pedagogy.md           # UK EYFS/National Curriculum principles
│   ├── html-structure.md          # Common HTML/CSS guidelines
│   ├── image-selection.md         # General image rules
│   └── quality-standards.md       # Assessment criteria
│
├── configurations/                 # Config-specific prompts (78 files)
│   ├── reception/
│   │   ├── number-counting/
│   │   │   ├── counting-to-10.md              ✅ P0 - Start here
│   │   │   ├── number-recognition.md          ✅ P0
│   │   │   └── more-or-less.md                🟠 P1
│   │   └── shape-space/
│   │       ├── basic-shapes.md                🟠 P1
│   │       ├── patterns.md                    🟢 P2
│   │       └── size-comparison.md             🟢 P2
│   │
│   ├── year1/
│   │   ├── number-place-value/
│   │   │   ├── numbers-to-20.md               🟠 P1
│   │   │   ├── counting-forwards-backwards.md 🟢 P2
│   │   │   └── number-bonds-10.md             🟠 P1
│   │   └── ... (9 configs)
│   │
│   ├── year2/ ... (9 configs)
│   ├── year3/ ... (12 configs)
│   ├── year4/ ... (12 configs)
│   ├── year5/ ... (12 configs)
│   └── year6/ ... (18 configs)
│
├── templates/
│   ├── question-templates.json    # Pre-approved question structures
│   ├── svg-library.json          # Simple SVG fallbacks per config
│   └── config-template.md        # Template for new config prompts
│
└── registry/
    └── config-index.json         # Central registry of all configs
```

### 2.2 Configuration Metadata

**File: `src/lib/prompts/registry/config-index.json`**

```json
{
  "configurations": [
    {
      "id": "reception-number-counting-counting-to-10",
      "yearGroup": "Reception",
      "ageRange": "4-5 years",
      "topic": "number-counting",
      "topicLabel": "Number and Counting",
      "subtopic": "counting-to-10",
      "subtopicLabel": "Counting to 10",
      "promptPath": "src/lib/prompts/configurations/reception/number-counting/counting-to-10.md",
      "priority": "P0",
      "status": "development",
      "qualityGate": {
        "minOverallScore": 85,
        "minCurriculumAlignment": 8,
        "minImageQuestionAlignment": 8,
        "minContentFreshness": 9,
        "maxTokensInput": 2000,
        "maxTokensOutput": 1000
      },
      "assessmentConfig": {
        "iterations": 5,
        "questionCount": 5,
        "baseUrl": "http://localhost:3000"
      }
    },
    // ... 77 more configs
  ],
  "priorityGroups": {
    "P0": ["reception-number-counting-counting-to-10", "reception-number-counting-number-recognition"],
    "P1": ["reception-number-counting-more-or-less", "year1-addition-subtraction-adding-to-20"],
    "P2": ["..."]
  }
}
```

---

## 3. CONFIGURATION-SPECIFIC PROMPT TEMPLATE

### Example: Reception Counting to 10

**File: `src/lib/prompts/configurations/reception/number-counting/counting-to-10.md`**

```markdown
# Reception: Counting to 10 - Worksheet Generation Prompt

## Configuration Metadata
- **ID**: reception-number-counting-counting-to-10
- **Year Group**: Reception (Ages 4-5)
- **Topic**: Number and Counting
- **Subtopic**: Counting to 10
- **Learning Objective**: Count reliably with one-to-one correspondence to 10
- **EYFS Goal**: Numbers ELG - Subitising and cardinality

---

## 🎓 RECEPTION PEDAGOGY (Ages 4-5) - NON-NEGOTIABLE RULES

### Rule 1: Object Quantities
- **MUST**: Use 1-10 objects ONLY (NO exceptions)
- **WHY**: Reception curriculum focuses on counting to 10 maximum
- **CHECK**: Count objects in each question - must be ≤10

### Rule 2: One Object Type Per Question
- **MUST**: Count apples OR carrots, NEVER "apples and carrots"
- **WHY**: Cognitive load reduction for 4-5 year olds
- **BAD**: "Count the frogs playing football" (2 object types)
- **GOOD**: "Count the apples. How many apples?" (1 object type)

### Rule 3: Identical, Repeated Objects
- **MUST**: Repeat SAME image file (apple.png × 8)
- **NEVER**: Mix variations (apple1.png, apple2.png, apple3.png)
- **WHY**: Visual consistency aids one-to-one correspondence

### Rule 4: Real-World Contexts
- **MUST**: Use scenarios children experience
- **GOOD**: "apples in basket", "flowers in garden", "pencils on desk"
- **BAD**: "school cows", "mice in flowerpots" (nonsensical)

### Rule 5: Clear Visual Hierarchy
- **MUST**: Main counting object = 80%+ of visual weight
- **MUST**: Objects ≥80×80px minimum size
- **NEVER**: Tiny objects in background

---

## 📝 APPROVED QUESTION TEMPLATES

### Template 1: Direct Counting (Most Common)
```
Count the [objects].
How many [objects] are there?
```
**Visual**: 5-10 identical objects in grid layout
**Example**: "Count the apples. How many apples are there?" + 7 apple images

### Template 2: Number Matching
```
Circle the group that shows [number] [objects].
```
**Visual**: Two groups - one correct, one different quantity
**Example**: "Circle the group that shows 6 carrots" + Group A (6 carrots), Group B (4 carrots)

### Template 3: More/Less (Use sparingly - more advanced)
```
Which group has more [objects]?
```
**Visual**: Two clear groups with different quantities
**Limit**: Only for confident counters (late Reception)

---

## 🎨 IMAGE SELECTION PRIORITY

### STEP 1: Check Reception-Safe Collections FIRST
**Curated List** (High Priority - Score ≥90):
1. `Fruit_by_ScrappinDoodles` → apple, banana, orange (BEST for counting)
2. `Vegetables` → carrot, tomato (EXCELLENT - simple, clear)
3. `School_Supplies` → pencil, eraser, crayon (GOOD - familiar)
4. `BasicShapes` → circle, square, triangle (GOOD for shape counting)

### STEP 2: Quality Check
- Is it a SINGLE object type? (not "fruit salad" or "garden scene")
- Is object CLEAR, SIMPLE, and LARGE?
- Can we repeat SAME image file?

### STEP 3: Scoring Decision
- **Score ≥90**: Use Scrapping Doodle ✅
- **Score 70-89**: Use Scrapping Doodle with caution ⚠️
- **Score <70**: Generate simple SVG instead 🎨

### STEP 4: Fallback to SVG
When no good match exists, use pre-defined SVG templates:

**Available SVG Objects**:
- apple, banana, orange (fruit)
- ball, star, heart (shapes)
- flower, tree, sun (nature)
- pencil, book, crayon (school)

**SVG Usage**:
```html
<!-- Repeat SAME SVG 7 times -->
<div class="counting-grid">
  {SIMPLE_SVG_APPLE} × 7
</div>
```

---

## ✅ QUALITY SELF-CHECK (Before Output)

Before finalizing worksheet, verify:

1. **Quantity Check**: All questions have ≤10 objects? ✓
2. **Single Object**: Each question counts ONE object type only? ✓
3. **Image Clarity**: Main object is obvious and large? ✓
4. **Repetition**: Using SAME image file repeated (not variations)? ✓
5. **Context**: Scenario makes real-world sense? ✓
6. **Language**: Simple, clear, age-appropriate? ✓

If ANY check fails → REVISE before output.

---

## 📊 TOKEN BUDGET & PERFORMANCE

- **Target Input**: ≤2000 tokens
- **Target Output**: ≤1000 tokens
- **Total Budget**: ≤3000 tokens per worksheet
- **Generation Time**: <10 seconds ideal

**Optimization Tips**:
- Reuse approved templates (saves tokens)
- Reference SVG library by name (not full code)
- Avoid verbose explanations in output

---

## 🔍 ASSESSMENT CRITERIA (How You'll Be Judged)

### Scoring Dimensions (from worksheet-quality-assessor):

1. **Curriculum Alignment** (30% weight)
   - Target: 8-10/10
   - Checks: Numbers 1-10 only, visual support, age-appropriate language

2. **Presentation Quality** (25% weight)
   - Target: 8-10/10
   - Checks: Clear structure, images load correctly, not text-heavy

3. **Content-Config Match** (25% weight)
   - Target: 9-10/10
   - Checks: Counting context, no numbers >10, correct question count

4. **Image-Question Alignment** (20% weight)
   - Target: 9-10/10
   - Checks: Images match question text, all images visible

5. **Content Freshness** (Iteration 2+)
   - Target: 9-10/10
   - Checks: <30% similarity with previous worksheets

6. **Image Diversity** (Iteration 2+)
   - Target: 8-10/10
   - Checks: <50% image reuse across iterations

**Overall Score Target**: ≥85/100 to pass quality gate

---

## 📚 EXAMPLES

### Example 1: Perfect Worksheet

**Question 1**:
```
Count the apples. How many apples are there?
```
**Image**: Fruit_apple.png repeated 8 times in 3×3 grid
**Score**: ✅ 95/100 (Single object, clear, simple, perfect alignment)

**Question 2**:
```
Count the carrots. How many carrots are there?
```
**Image**: vegetable_carrot.png repeated 6 times
**Score**: ✅ 93/100

---

### Example 2: Poor Worksheet (What NOT to do)

**Question 1** (BAD):
```
Count the frogs playing football.
```
**Image**: FroggyFun_Football (frogs + footballs mixed)
**Score**: ❌ 45/100 (Two object types, confusing for Reception)

**Fix**:
```
Count the footballs. How many footballs are there?
```
**Image**: Simple_ball.svg repeated 5 times
**Score**: ✅ 88/100

---

## 🚦 QUALITY GATE THRESHOLDS

### Automatic PASS Criteria:
- Overall Score ≥85/100 ✅
- All dimension scores ≥7/10 ✅
- Image load success ≥90% ✅
- Content freshness ≥80% unique ✅

### Automatic FAIL Triggers:
- Any dimension score <5/10 ❌
- Numbers beyond 1-10 found ❌
- Mixed object types in counting ❌
- Nonsensical scenarios ❌
- Image load failure >30% ❌

### Manual Review Required:
- Overall score 70-84 ⚠️
- Dimension scores 5-6/10 ⚠️
- Edge cases or innovative approaches ⚠️

---

## 📝 CHANGELOG & ITERATION HISTORY

### Version 1.0 (2025-10-11)
- Initial prompt created
- Baseline assessment: TBD
- Status: Ready for testing

### Version 1.1 (TBD)
- Refinements based on assessor agent feedback
- Improved: [specific areas]
- Quality score: [baseline → improved]

---

## 🔗 RELATED CONFIGURATIONS

**Similar Configs** (Can borrow patterns from):
- reception-number-counting-number-recognition
- year1-number-place-value-numbers-to-20

**Dependencies**:
- Requires: Reception-Safe Collections curated list
- Requires: Simple SVG template library

---

**Last Updated**: 2025-10-11
**Prompt Engineer**: [Your Name]
**Status**: Draft - Awaiting Baseline Assessment
```

---

## 4. WORKSHEET-QUALITY-ASSESSOR AGENT INTEGRATION

### 4.1 Current Agent Capabilities

**Location**: `scripts/reception-quality-assessment-v2.js`

**Current Features**:
- ✅ Playwright-based UI automation
- ✅ Screenshot capture per iteration
- ✅ 6 quality dimensions scored
- ✅ Iterative assessment (5 iterations default)
- ✅ Content freshness tracking
- ✅ Image diversity analysis
- ✅ Performance metrics (generation time, success rate)
- ✅ Markdown report generation

**Quality Scoring**:
1. **Curriculum Alignment** (0-10): Age-appropriate content, visual support
2. **Presentation Quality** (0-10): Clear structure, images load
3. **Content-Config Match** (0-10): Counting context, number ranges
4. **Image-Question Alignment** (0-10): Visual-text matching
5. **Content Freshness** (0-10): Uniqueness across iterations
6. **Image Diversity** (0-10): New images each iteration

**Quality Gates** (Lines 509-516):
- ≥80/100 → "YES - Would use in classroom" ✅
- 60-79/100 → "WITH MODIFICATIONS" ⚠️
- <60/100 → "NO - Needs revision" ❌

### 4.2 Enhanced Agent for Config-Specific Testing

**New Features Needed**:

1. **Configuration Parameter Support**
```javascript
const CONFIG = {
  configId: 'reception-number-counting-counting-to-10', // NEW
  yearGroup: 'Reception',
  yearGroupSelect: 'Reception (Ages 4-5)',
  topic: 'Number and Counting',
  subtopic: 'Counting to 10',
  promptVersion: 'v1.0', // NEW - track prompt iterations
  qualityGate: {        // NEW - config-specific thresholds
    minOverallScore: 85,
    minCurriculumAlignment: 8,
    minImageAlignment: 8
  }
};
```

2. **Prompt Version Tracking**
- Track which prompt version generated each worksheet
- Compare quality across prompt iterations
- A/B testing: baseline vs enhanced prompts

3. **Configuration-Specific Quality Checks**
```javascript
// Reception-specific checks
function assessReceptionSpecificQuality(content, config) {
  const checks = {
    numbersInRange: checkNumberRange(content, 1, 10),
    singleObjectType: checkSingleObject(content),
    realWorldContext: checkContextSensibility(content),
    visualClarity: checkImageSize(content)
  };

  return {
    score: calculateScore(checks),
    details: checks
  };
}
```

4. **Comparative Analysis**
```javascript
// Compare current config against similar configs
function compareWithSimilarConfigs(currentScore, configId) {
  const similar = [
    'reception-number-counting-number-recognition',
    'year1-number-place-value-numbers-to-20'
  ];

  return {
    currentScore,
    similarConfigsAvgScore,
    ranking: 'above average' / 'below average'
  };
}
```

### 4.3 Agent Execution Modes

**Mode 1: Baseline Assessment**
```bash
node scripts/config-quality-assessor.js \
  --config=reception-number-counting-counting-to-10 \
  --mode=baseline \
  --iterations=5
```
Output: Baseline quality report before any prompt changes

**Mode 2: Iterative Testing (Prompt Development)**
```bash
node scripts/config-quality-assessor.js \
  --config=reception-number-counting-counting-to-10 \
  --promptVersion=v1.1 \
  --iterations=5 \
  --compare=baseline
```
Output: Improvement report (v1.1 vs baseline)

**Mode 3: Quality Gate Validation**
```bash
node scripts/config-quality-assessor.js \
  --config=reception-number-counting-counting-to-10 \
  --mode=quality-gate \
  --iterations=10
```
Output: PASS/FAIL decision based on quality gates

**Mode 4: Parallel Multi-Config Testing**
```bash
# Terminal 1
node scripts/config-quality-assessor.js \
  --config=reception-number-counting-counting-to-10 \
  --async

# Terminal 2
node scripts/config-quality-assessor.js \
  --config=reception-number-counting-number-recognition \
  --async
```

---

## 5. IMPLEMENTATION ROADMAP

### Phase 0: Foundation (Week 1)

**Deliverables**:
- [ ] Create prompt directory structure
- [ ] Build config-index.json registry (78 configs)
- [ ] Create prompt template (config-template.md)
- [ ] Enhance worksheet-quality-assessor agent
- [ ] Define quality gates per year group

**Tasks**:
1. `mkdir -p src/lib/prompts/{base,configurations,templates,registry}`
2. Generate config-index.json from curriculum.ts
3. Create enhanced assessor: `scripts/config-quality-assessor.js`
4. Set up reporting structure

---

### Phase 1: Reception Pilot (Weeks 2-3)

**Target Configs** (6 total):
1. ✅ **P0-1**: reception-number-counting-counting-to-10
2. ✅ **P0-2**: reception-number-counting-number-recognition
3. 🟠 **P1-1**: reception-number-counting-more-or-less
4. 🟠 **P1-2**: reception-shape-space-basic-shapes
5. 🟢 **P2-1**: reception-shape-space-patterns
6. 🟢 **P2-2**: reception-shape-space-size-comparison

**Workflow Per Config**:

**Day 1: Baseline**
```bash
# 1. Run baseline assessment (current generic prompt)
node scripts/config-quality-assessor.js \
  --config=reception-number-counting-counting-to-10 \
  --mode=baseline \
  --iterations=5

# Expected Output:
# - Baseline score: ~65-75/100
# - Specific failure patterns identified
# - Screenshots in: worksheet-quality-reports/baseline/
```

**Day 2: Create Config-Specific Prompt**
```bash
# 2. Create prompt file using template
cp src/lib/prompts/templates/config-template.md \
   src/lib/prompts/configurations/reception/number-counting/counting-to-10.md

# 3. Customize prompt based on baseline findings
# - Add Reception-specific pedagogy rules
# - Define approved question templates
# - Specify image selection criteria
```

**Day 3-4: Iterative Improvement**
```bash
# 4. Test v1.0 of prompt
node scripts/config-quality-assessor.js \
  --config=reception-number-counting-counting-to-10 \
  --promptVersion=v1.0 \
  --iterations=5 \
  --compare=baseline

# 5. Review results, identify issues
# 6. Create v1.1 with refinements
# 7. Repeat until quality gate passes
```

**Day 5: Quality Gate Validation**
```bash
# 8. Final validation (10 iterations for confidence)
node scripts/config-quality-assessor.js \
  --config=reception-number-counting-counting-to-10 \
  --mode=quality-gate \
  --iterations=10

# Success Criteria:
# - Overall score ≥85/100 on all 10 iterations
# - All dimension scores ≥7/10
# - Content freshness ≥80%
# - Image load success ≥90%
```

**Deliverables per Config**:
- ✅ Config-specific prompt file (tested & validated)
- ✅ Quality assessment reports (baseline → final)
- ✅ Screenshot evidence (before/after)
- ✅ Lessons learned document

---

### Phase 2: Year 1 Expansion (Weeks 4-5)

**Target Configs** (9 total - prioritized 3 first):
1. 🟠 year1-addition-subtraction-adding-to-20
2. 🟠 year1-number-place-value-numbers-to-20
3. 🟠 year1-number-place-value-number-bonds-10

**Strategy**:
- Reuse learnings from Reception phase
- Adapt pedagogy for Year 1 (Ages 5-6)
- Parallel execution on 2 configs simultaneously

---

### Phase 3: Year 2-6 Gradual Rollout (Weeks 6-16)

**Batch Approach**:
- **Batch 1** (Week 6-7): Year 2 (9 configs)
- **Batch 2** (Week 8-9): Year 3 (12 configs)
- **Batch 3** (Week 10-11): Year 4 (12 configs)
- **Batch 4** (Week 12-13): Year 5 (12 configs)
- **Batch 5** (Week 14-16): Year 6 (18 configs)

**Parallel Execution**:
- 2 agents initially (your capacity)
- Scale to 4-6 agents as process matures
- Stagger start times to avoid server overload

---

### Phase 4: Maintenance & Monitoring (Ongoing)

**Monthly Quality Audits**:
```bash
# Run random sample checks on all configs
node scripts/audit-all-configs.js --sample=10 --iterations=3
```

**Continuous Improvement**:
- Track quality scores over time
- Identify degrading configs
- Update prompts based on user feedback
- Expand SVG library as needed

---

## 6. QUALITY GATE DEFINITIONS

### Reception (Ages 4-5)
```json
{
  "qualityGate": {
    "minOverallScore": 85,
    "minDimensionScores": {
      "curriculumAlignment": 8,
      "presentationQuality": 7,
      "contentConfigMatch": 9,
      "imageQuestionAlignment": 9,
      "contentFreshness": 9,
      "imageDiversity": 8
    },
    "maxNumberRange": 10,
    "requiredVisualSupport": true,
    "maxQuestionComplexity": "simple"
  }
}
```

### Year 1-2 (Ages 5-7)
```json
{
  "qualityGate": {
    "minOverallScore": 80,
    "minDimensionScores": {
      "curriculumAlignment": 8,
      "presentationQuality": 7,
      "contentConfigMatch": 8,
      "imageQuestionAlignment": 7,
      "contentFreshness": 8,
      "imageDiversity": 7
    },
    "maxNumberRange": "configSpecific",
    "requiredVisualSupport": true,
    "maxQuestionComplexity": "moderate"
  }
}
```

### Year 3-6 (Ages 7-11)
```json
{
  "qualityGate": {
    "minOverallScore": 75,
    "minDimensionScores": {
      "curriculumAlignment": 7,
      "presentationQuality": 7,
      "contentConfigMatch": 8,
      "imageQuestionAlignment": 6,
      "contentFreshness": 7,
      "imageDiversity": 6
    },
    "requiredVisualSupport": "optional",
    "maxQuestionComplexity": "complex"
  }
}
```

---

## 7. PARALLEL AGENT EXECUTION STRATEGY

### 7.1 Agent Orchestration

**Orchestrator Script**: `scripts/parallel-config-assessment.js`

```javascript
const configs = [
  'reception-number-counting-counting-to-10',
  'reception-number-counting-number-recognition'
];

// Launch agents in parallel
const agents = configs.map(configId => {
  return spawn('node', [
    'scripts/config-quality-assessor.js',
    '--config', configId,
    '--iterations', '5',
    '--async'
  ]);
});

// Monitor progress
agents.forEach(agent => {
  agent.stdout.on('data', data => {
    console.log(`[${agent.config}]: ${data}`);
  });
});

// Wait for all to complete
await Promise.all(agents.map(a => a.promise));

// Generate combined report
generateCrossConfigReport(configs);
```

### 7.2 Resource Management

**Port Allocation**:
```javascript
// Avoid port conflicts when running parallel tests
const portMap = {
  'reception-number-counting-counting-to-10': 3000,
  'reception-number-counting-number-recognition': 3001,
  // ... assign unique ports
};
```

**Browser Instances**:
- Each agent gets isolated Playwright browser context
- Headless mode for parallel runs (faster)
- Headed mode for debugging single config

### 7.3 Reporting Dashboard

**Real-time Progress**:
```
┌─────────────────────────────────────────────────────┐
│ Parallel Config Assessment - Live Progress         │
├─────────────────────────────────────────────────────┤
│ reception-number-counting-counting-to-10            │
│ [████████████░░░░░░░░] Iteration 3/5 (Score: 87)   │
│                                                     │
│ reception-number-counting-number-recognition        │
│ [██████████████████░░] Iteration 4/5 (Score: 82)   │
└─────────────────────────────────────────────────────┘
```

---

## 8. SUCCESS METRICS & KPIs

### Per-Configuration Metrics
- **Quality Score**: Baseline → Current (track improvement)
- **Pass Rate**: % of iterations passing quality gate
- **Consistency**: Standard deviation of scores across iterations
- **Performance**: Avg generation time per worksheet
- **Freshness**: % unique content across iterations

### System-Wide Metrics
- **Coverage**: % of 78 configs with dedicated prompts
- **Overall Quality**: Average score across all configs
- **Reliability**: % of configs consistently passing quality gate
- **Efficiency**: Avg tokens per worksheet (cost tracking)

### Dashboard View
```
┌─────────────────────────────────────────────────────────┐
│ Configuration-Specific Prompts - System Dashboard      │
├─────────────────────────────────────────────────────────┤
│ Total Configs: 78                                       │
│ Completed: 12 (15%)  In Progress: 3  Pending: 63       │
│                                                         │
│ Quality Overview:                                       │
│ - Average Score: 86.3/100  (Target: ≥85)    ✅         │
│ - Pass Rate: 92%           (Target: ≥90%)   ✅         │
│ - Consistency: 8.7/10      (Target: ≥8.0)   ✅         │
│                                                         │
│ Top Performers:                                         │
│ 1. reception-counting-to-10        (94.2/100) 🏆       │
│ 2. year1-number-bonds-10           (91.8/100) 🥈       │
│ 3. reception-number-recognition    (89.5/100) 🥉       │
│                                                         │
│ Needs Attention:                                        │
│ - year3-fractions-comparing        (72.1/100) ⚠️       │
└─────────────────────────────────────────────────────────┘
```

---

## 9. ROLLOUT RISK MITIGATION

### Risk 1: Breaking Existing Functionality
**Mitigation**:
- Gradual rollout (Reception first)
- Keep old generic prompt as fallback
- Feature flag per config: `useConfigSpecificPrompt: true/false`

### Risk 2: Quality Regression
**Mitigation**:
- Baseline assessment before changes
- A/B testing (50% old prompt, 50% new prompt)
- Rollback procedure documented

### Risk 3: Maintenance Burden (78 Prompt Files)
**Mitigation**:
- Shared base templates reduce duplication
- Automated testing via assessor agent
- Version control tracks all changes
- Quarterly review cycle

### Risk 4: Agent Capacity Bottleneck
**Mitigation**:
- Start with 2 parallel agents
- Scale gradually based on success
- Queue system for configs
- Prioritization matrix (P0 > P1 > P2)

---

## 10. DEPLOYMENT STRATEGY

### Development Environment
```bash
# 1. Create feature branch
git checkout -b feature/config-specific-prompts

# 2. Implement for 1 config (pilot)
# Create: src/lib/prompts/configurations/reception/number-counting/counting-to-10.md

# 3. Update promptService.ts to load config-specific prompts
function getPromptForConfig(configId) {
  const configPath = getPromptPath(configId);
  return fs.readFileSync(configPath, 'utf-8');
}

# 4. Test with assessor agent
node scripts/config-quality-assessor.js --config=reception-number-counting-counting-to-10

# 5. If passes → commit; if fails → iterate
```

### Staging Environment
```bash
# 1. Deploy to staging with feature flag
ENABLE_CONFIG_SPECIFIC_PROMPTS=true npm run deploy:staging

# 2. A/B test (50/50 split)
# - 50% users get new config-specific prompt
# - 50% users get old generic prompt

# 3. Monitor metrics for 1 week
# - Quality scores
# - User feedback
# - Error rates

# 4. If successful → proceed to production
```

### Production Rollout
```bash
# Gradual rollout by priority
# Week 1: P0 configs only (2 configs)
# Week 2: P0 + P1 configs (10 configs)
# Week 3: All Reception configs (6 configs)
# Week 4+: Expand to Year 1, Year 2, etc.
```

---

## 11. TEAM COLLABORATION

### Roles & Responsibilities

**You (Product Owner / Prompt Engineer)**:
- Review and approve config-specific prompts
- Run assessor agent tests
- Prioritize configurations
- Make final quality gate decisions

**Claude (AI Assistant)**:
- Create initial config-specific prompt drafts
- Implement agent enhancements
- Generate quality reports
- Suggest improvements based on data

### Communication Protocol

**Daily Standup** (Async via Slack/Notes):
```
Config: reception-number-counting-counting-to-10
Status: Iteration 3 testing
Current Score: 78/100 (need 85 to pass)
Issues: Image-question alignment low (6/10)
Next: Refine image selection rules in prompt v1.1
ETA: Tomorrow
```

**Weekly Review**:
- Completed configs this week
- Quality trends
- Blockers & solutions
- Next week priorities

---

## 12. COST & RESOURCE ESTIMATES

### Time Investment

**Per Configuration**:
- Initial prompt creation: 1-2 hours
- Baseline assessment: 30 mins (automated)
- Iterative testing (3-5 iterations): 2-4 hours
- Quality gate validation: 1 hour
- **Total: 5-8 hours per config**

**Full Rollout** (78 configs):
- Optimistic (parallel, efficient): 6-8 weeks
- Realistic (learning curve, iterations): 12-16 weeks
- Conservative (issues, rework): 20-24 weeks

### Token Costs

**Current (Generic Prompt)**:
- ~2500 tokens/worksheet × 78 configs × 5 iterations
- = ~975,000 tokens for full baseline

**Optimized (Config-Specific)**:
- ~1800 tokens/worksheet (28% reduction)
- = ~702,000 tokens for testing
- **Savings**: ~273,000 tokens (~$4-8 depending on model)

**Long-term**:
- Lower tokens per worksheet in production
- Higher quality = fewer regenerations
- **ROI**: Cost savings + quality improvement

---

## 13. NEXT ACTIONS

### Immediate (Today)
- [x] Review and approve this plan document
- [ ] Decision: Proceed with implementation? (Yes/No)
- [ ] If Yes: Choose starting config (recommend: reception-number-counting-counting-to-10)

### Tomorrow (If Approved)
- [ ] Create directory structure
- [ ] Build config-index.json
- [ ] Enhance worksheet-quality-assessor agent
- [ ] Run baseline assessment on first config

### This Week (Phase 0)
- [ ] Complete foundation setup
- [ ] Test enhanced agent
- [ ] Finalize quality gate thresholds
- [ ] Create first config-specific prompt

### Next 2 Weeks (Phase 1 Pilot)
- [ ] Complete all 6 Reception configs
- [ ] Document lessons learned
- [ ] Refine process based on pilot
- [ ] Prepare for Year 1 expansion

---

## 14. QUESTIONS FOR YOU

Before proceeding, please clarify:

1. **Approval**: Do you approve this strategy? Any changes needed?

2. **Starting Point**: Confirm starting with `reception-number-counting-counting-to-10`?

3. **Quality Gates**: Are the threshold scores acceptable?
   - Reception: ≥85/100 overall
   - Year 1-2: ≥80/100
   - Year 3-6: ≥75/100

4. **Timeline**: Realistic timeline preference?
   - Aggressive (8 weeks)
   - Balanced (12-16 weeks)
   - Conservative (20-24 weeks)

5. **Agent Capacity**: Start with 2 parallel agents, scale to how many?

6. **Token Budget**: Any constraints on assessment costs?

7. **Deployment**: Feature flag approach acceptable? A/B testing required?

---

## 15. APPENDIX

### A. Full Configuration List (78 Total)

**Reception (6)**:
1. reception-number-counting-counting-to-10
2. reception-number-counting-number-recognition
3. reception-number-counting-more-or-less
4. reception-shape-space-basic-shapes
5. reception-shape-space-patterns
6. reception-shape-space-size-comparison

**Year 1 (9)**:
7. year1-number-place-value-numbers-to-20
8. year1-number-place-value-counting-forwards-backwards
9. year1-number-place-value-number-bonds-10
10. year1-addition-subtraction-adding-to-20
11. year1-addition-subtraction-subtracting-within-20
12. year1-addition-subtraction-word-problems-simple
13. year1-measurement-length-height
14. year1-measurement-weight-capacity
15. year1-measurement-time-days-months

**Year 2 (9)**:
16-24. [Similar structure]

**Year 3 (12)**:
25-36. [Including fractions]

**Year 4 (12)**:
37-48. [Including decimals]

**Year 5 (12)**:
49-60. [Including percentages]

**Year 6 (18)**:
61-78. [Including algebra, ratio]

### B. Agent Commands Reference

```bash
# Baseline assessment
node scripts/config-quality-assessor.js \
  --config=<config-id> \
  --mode=baseline \
  --iterations=5

# Iterative testing
node scripts/config-quality-assessor.js \
  --config=<config-id> \
  --promptVersion=v1.0 \
  --iterations=5 \
  --compare=baseline

# Quality gate validation
node scripts/config-quality-assessor.js \
  --config=<config-id> \
  --mode=quality-gate \
  --iterations=10

# Parallel execution
node scripts/parallel-config-assessment.js \
  --configs=config1,config2 \
  --iterations=5
```

### C. Quality Report Template

```markdown
# Config Quality Report: [config-id]

## Summary
- Config: [id]
- Prompt Version: v[X.Y]
- Test Date: [date]
- Iterations: [N]

## Scores
- Overall: [score]/100
- Curriculum Alignment: [score]/10
- Presentation Quality: [score]/10
- Content-Config Match: [score]/10
- Image-Question Alignment: [score]/10
- Content Freshness: [score]/10
- Image Diversity: [score]/10

## Quality Gate: [PASS/FAIL]

## Key Findings
- [Finding 1]
- [Finding 2]

## Recommendations
- [Action 1]
- [Action 2]

## Next Steps
- [ ] [Step 1]
- [ ] [Step 2]
```

---

**Document Version:** 1.0
**Last Updated:** 2025-10-11
**Status:** DRAFT - AWAITING APPROVAL
**Next Review:** After Phase 1 Pilot Completion

---

## ✅ APPROVAL SECTION

**Reviewed By**: _________________
**Date**: _________________
**Decision**: [ ] Approved [ ] Approved with Changes [ ] Rejected
**Comments**: _________________

**Approved to Proceed**: [ ] Yes [ ] No
**Starting Config**: _________________
**Target Completion**: _________________
