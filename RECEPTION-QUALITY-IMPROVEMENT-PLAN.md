# Reception Worksheet Quality Improvement Plan

## Executive Summary

**Date:** 2025-10-11
**Status:** Critical Quality Issues Identified
**Priority:** HIGH - Affects pedagogical effectiveness for Reception (ages 4-5)

**Problem:** Current worksheets are constrained by available Scrapping Doodle images, leading to pedagogically unsound questions that confuse young learners.

**Solution:** Question-First approach with intelligent image fallback system.

---

## 1. PROBLEM ANALYSIS

### 1.1 Critical Issues Identified

#### Issue 1: Image-Question Mismatch
**Example:** Question asks "Count the flowers" but image shows frogs as main subject with tiny flowers in background.

**Why This is Bad:**
- Reception children (4-5 years) need clear, unambiguous visual cues
- Confusing images break one-to-one correspondence principle
- Children don't know what to count

**Root Cause:** LLM is creating questions around available Scrapping Doodle images instead of creating pedagogically sound questions first.

#### Issue 2: Complex Multi-Element Images
**Example:** Football + frogs in same image for counting question.

**Why This is Bad:**
- Reception counting should focus on ONE object type
- Multiple elements create cognitive overload for 4-5 year olds
- Violates EYFS best practice of "simple, clear, focused"

**Root Cause:** Using complex themed collections (e.g., "FroggyFun_Football") that mix multiple elements.

#### Issue 3: Nonsensical Scenarios
**Examples:**
- "Count the school cows" (schools don't have cows)
- "Count the mice in the flowerpots" (mice don't live in flowerpots)

**Why This is Bad:**
- Reception learning should connect to real-world experiences
- Nonsensical scenarios confuse rather than educate
- Undermines credibility with teachers

**Root Cause:** LLM forcing questions to match oddly-named image collections.

#### Issue 4: Varied Image Presentation
**Example:** Counting frogs but each frog is in different pose/context/setting.

**Why This is Bad:**
- Reception children learn counting with IDENTICAL repeated objects
- Visual consistency helps pattern recognition
- Varied images make one-to-one correspondence harder

**Root Cause:** Using varied image files from collections instead of repeating single simple image.

---

## 2. RESEARCH FINDINGS - RECEPTION BEST PRACTICES

### 2.1 UK EYFS Framework Requirements

**Source:** GOV.UK Early Years Foundation Stage (EYFS) Framework 2025

**Mathematics Development Goals:**
- Develop number sense through practical, hands-on counting
- Use one-to-one correspondence with concrete objects
- Progress from counting to 5, then to 10
- Oral and practical counting is PRIMARY at this age

### 2.2 The Three Counting Principles

1. **One-One Principle**: Each object gets one number word
2. **Stable-Order Principle**: Number words always in same sequence
3. **Cardinal Principle**: Last number = total quantity

**Implication for Worksheets:**
- Images must support one-to-one correspondence
- Objects must be clearly distinct and countable
- Visual clarity is ESSENTIAL

### 2.3 Professional Worksheet Characteristics

**Analysis of Twinkl, Oxford Owl, Star Worksheets:**

✅ **What They Do:**
- Simple, identical objects repeated (e.g., 7 identical red apples)
- Clear questions: "Count the apples. How many are there?"
- One object type per question
- Sensible real-world contexts (apples in basket, flowers in garden)
- Clean, uncluttered layout
- Main object is OBVIOUS, not hidden or tiny

❌ **What They NEVER Do:**
- Mix object types in counting questions
- Use varied poses/contexts for same object
- Create nonsensical scenarios
- Have tiny/background objects as counting target
- Use overly complex themed scenes

### 2.4 Age-Appropriate Object Selection

**Good Objects for Reception Counting:**
- Common foods: apples, bananas, cookies, carrots
- School items: pencils, books, crayons, erasers
- Nature: flowers, leaves, stones, shells
- Toys: balls, blocks, toy cars, teddy bears
- Animals: Simple clear animals (chicks, butterflies, fish)

**Objects to AVOID:**
- Abstract concepts
- Items children haven't experienced
- Objects with unclear boundaries (clouds, water)
- Scary/inappropriate items

---

## 3. CURRENT SYSTEM ARCHITECTURE

### 3.1 How It Works Now (PROBLEM FLOW)

```
1. System selects 30 Scrapping Doodle collections
2. Passes collections to LLM with image paths
3. LLM creates questions constrained by available images
4. Result: Questions forced to fit images (backwards!)
```

**Key Files:**
- `src/lib/services/promptService.ts` - Generates prompts
- `src/lib/services/scrappingDoodleService.ts` - Manages image collections
- `src/lib/services/gemini.ts` - Calls LLM with prompt

**Problem Location:**
Lines 1659-1720 in `promptService.ts` - Provides collections BEFORE question creation, forcing image-first approach.

### 3.2 Scrapping Doodle Collections Structure

**Location:** `scripts/catalogs/master-vision-catalog.json`

**Total Collections:** 365

**Structure Example:**
```json
{
  "FarmAnimalsAndBabies_byScrappinDoodles": {
    "name": "FarmAnimalsAndBabies_byScrappinDoodles",
    "path": "/images/SCRAPPING DOODLE/FarmAnimalsAndBabies_byScrappinDoodles",
    "primaryObjects": ["cow", "pig", "chicken", "sheep"],
    "imageFiles": ["Cow.png", "Cow2.png", "Pig.png", ...]
  }
}
```

**Key Insight:** Many collections have multiple elements (FroggyFun_Football has frogs AND footballs), leading to mixed images.

---

## 4. PROPOSED SOLUTION

### 4.1 Core Strategy: Question-First, Image-Second with Fallback

**New Flow:**
```
1. LLM creates pedagogically sound question FIRST
   - "Count the apples. How many are there?"

2. Extract object from question (e.g., "apples")

3. Intelligent Image Selection:
   a) Search Scrapping Doodle for matching simple image
   b) Quality score match (is it JUST apples? Clear? Simple?)
   c) If match score ≥70% → Use Scrapping Doodle
   d) If match score <70% → Generate simple SVG

4. Result: High-quality question with appropriate image
```

**Key Principle:** NEVER compromise question quality to use available images.

### 4.2 Three-Phase Implementation Plan

---

#### PHASE 1: Strengthen Question Quality Rules (QUICK WIN)
**Effort:** Low (Prompt changes only)
**Impact:** High (Immediate quality improvement)
**Timeline:** 1 day

**Changes Required:**

1. **Add Reception-Specific Pedagogy Rules to Prompt**

Location: `src/lib/services/promptService.ts` lines 210-330

**New Rules to Add:**
```markdown
**🎓 RECEPTION PEDAGOGY RULES (AGES 4-5) - ABSOLUTE REQUIREMENTS:**

1. **ONE OBJECT TYPE PER QUESTION - NO EXCEPTIONS**
   - ✅ CORRECT: "Count the apples. How many apples are there?" (ONLY apples shown)
   - ❌ WRONG: "Count the frogs playing football" (frogs + footballs = confusing)
   - ❌ WRONG: "Count the flowers in the garden" (if frogs are main image)

2. **SIMPLE, IDENTICAL, REPEATED OBJECTS**
   - ✅ CORRECT: Show 7 identical apple images (same apple.png repeated 7 times)
   - ❌ WRONG: Show 7 different apple variations (apple.png, apple2.png, apple3.png mixed)
   - ❌ WRONG: Show apples in different contexts (tree, basket, ground)

3. **SENSIBLE REAL-WORLD CONTEXTS ONLY**
   - ✅ CORRECT: "Count the flowers in the garden"
   - ✅ CORRECT: "Count the pencils on the desk"
   - ❌ WRONG: "Count the school cows" (schools don't have cows)
   - ❌ WRONG: "Count the mice in flowerpots" (mice don't live there)

4. **MAIN OBJECT MUST BE OBVIOUS AND LARGE**
   - Objects should be 80x80px minimum
   - Main counting target = 80%+ of image visual weight
   - ❌ WRONG: Tiny flowers in background with large frog in foreground

5. **SIMPLE QUESTION WORDING**
   - Use: "Count the [objects]. How many [objects] are there?"
   - Avoid complex phrases, multiple clauses, or story scenarios
   - ONE clear instruction only

6. **APPROPRIATE QUANTITIES FOR RECEPTION**
   - Early Reception (counting to 5): Use 1-5 objects
   - Late Reception (counting to 10): Use 5-10 objects
   - NEVER exceed 10 objects for Reception
```

2. **Update Collection Selection Logic**

Add filter to EXCLUDE multi-element collections for counting:

```markdown
**EXCLUDED COLLECTIONS FOR RECEPTION COUNTING:**
- Any collection name containing "Fun" (e.g., FroggyFun_Football) - usually mixed
- Collections with "&" or "and" in name - indicates multiple elements
- Collections with multiple primaryObjects (select only single-object collections)
```

3. **Add Fallback Instruction**

```markdown
**IF NO SUITABLE SCRAPPING DOODLE IMAGE EXISTS:**
- Generate simple SVG instead
- Use basic shapes and colors
- NEVER force a question to fit a bad image match
- Quality over Scrapping Doodle usage

Example SVG for apples:
```svg
<svg width="80" height="80" viewBox="0 0 80 80">
  <circle cx="40" cy="45" r="25" fill="#ff0000"/>
  <rect x="38" y="15" width="4" height="15" fill="#8B4513"/>
  <ellipse cx="45" cy="20" rx="8" ry="4" fill="#228B22"/>
</svg>
```
```

**Testing After Phase 1:**
Run worksheet-quality-assessor for 5 iterations and check:
- [ ] All questions have single object type
- [ ] No nonsensical scenarios
- [ ] Images match question text clearly
- [ ] Objects are simple and identical

---

#### PHASE 2: Smart Image Matching with Quality Threshold (MODERATE)
**Effort:** Medium (Code changes, scoring logic)
**Impact:** High (Prevents bad matches)
**Timeline:** 3-5 days

**Changes Required:**

1. **Create Image Quality Scorer**

New file: `src/lib/services/imageQualityScorer.ts`

```typescript
export interface ImageMatchScore {
  collectionName: string;
  imagePath: string;
  score: number; // 0-100
  matchReason: string;
  issues: string[];
}

export class ImageQualityScorer {
  /**
   * Score how well an image collection matches a question object
   */
  static scoreMatch(
    questionObject: string, // "apples"
    collection: CollectionMetadata,
    forAgeGroup: string // "Reception"
  ): ImageMatchScore {
    let score = 0;
    const issues: string[] = [];

    // 1. Object match (0-40 points)
    if (collection.primaryObjects.includes(questionObject.toLowerCase())) {
      score += 40;
    } else if (collection.primaryObjects.some(obj =>
      obj.includes(questionObject) || questionObject.includes(obj)
    )) {
      score += 20;
    } else {
      issues.push(`Primary objects don't match question object`);
    }

    // 2. Simplicity (0-30 points)
    if (collection.primaryObjects.length === 1) {
      score += 30; // Single object = simple
    } else if (collection.primaryObjects.length === 2) {
      score += 10; // 2 objects = acceptable
      issues.push(`Multiple objects in collection (${collection.primaryObjects.length})`);
    } else {
      issues.push(`Too many objects in collection (${collection.primaryObjects.length})`);
    }

    // 3. Age appropriateness (0-20 points)
    if (collection.ageGroups.includes(forAgeGroup)) {
      score += 20;
    } else {
      score += 5;
      issues.push(`Not specifically tagged for ${forAgeGroup}`);
    }

    // 4. Penalize complex themed collections (0-10 points penalty)
    if (collection.name.toLowerCase().includes('fun') ||
        collection.name.toLowerCase().includes('school_') &&
        !questionObject.includes('school')) {
      score -= 10;
      issues.push(`Themed collection may have mixed elements`);
    }

    return {
      collectionName: collection.name,
      imagePath: collection.path,
      score: Math.max(0, Math.min(100, score)),
      matchReason: `Match for "${questionObject}"`,
      issues
    };
  }

  /**
   * Determine if match is good enough to use
   */
  static isAcceptableMatch(matchScore: ImageMatchScore): boolean {
    return matchScore.score >= 70 && matchScore.issues.length <= 1;
  }
}
```

2. **Update promptService.ts to Use Scoring**

Modify `getScrappingDoodleGuidance()`:

```typescript
// BEFORE: Provide all 30 collections
// AFTER: Provide only HIGH-QUALITY matches

private static async getScrappingDoodleGuidance(
  config: EnhancedPromptConfig,
  options?: { previousWorksheets?: Array<...> }
): Promise<string> {
  // ... existing code ...

  // NEW: Score each collection for Reception suitability
  const scoredCollections = diverseCollections.map(collection => ({
    collection,
    score: ImageQualityScorer.scoreMatch(
      'generic', // We don't know object yet
      collection,
      config.yearGroup
    )
  }));

  // Filter to only high-quality collections (score ≥60 for general use)
  const qualityCollections = scoredCollections
    .filter(item => item.score.score >= 60)
    .map(item => item.collection);

  console.log(`✂️ Quality filter: ${diverseCollections.length} → ${qualityCollections.length} collections`);

  // Continue with qualityCollections instead of diverseCollections
  // ...
}
```

3. **Add Instruction for LLM to Use Scoring Logic**

```markdown
**🎯 IMAGE SELECTION PRIORITY FOR RECEPTION:**

1. **FIRST: Check if simple matching collection exists**
   - Question: "Count the apples"
   - Look for collection with PRIMARY object = "apple" or "fruit"
   - Must be SINGLE object type only (not "fruit salad" or "apple tree scene")

2. **EVALUATE image quality:**
   - Is the object CLEAR and SIMPLE?
   - Is it the MAIN subject (not background)?
   - Are images IDENTICAL (same file repeated)?

3. **IF GOOD MATCH (score ≥70%):**
   - Use Scrapping Doodle collection
   - Repeat SAME image file multiple times (apple.png × 7)

4. **IF POOR MATCH (score <70%):**
   - Generate simple SVG instead
   - Better to have perfect SVG than confusing photo

5. **FALLBACK to SVG is ENCOURAGED for quality**
```

**Testing After Phase 2:**
- [ ] System logs quality scores for each collection
- [ ] Low-scoring collections are filtered out
- [ ] Counting questions use simpler, clearer images
- [ ] Teachers report improved clarity

---

#### PHASE 3: Prefer Simple Object Collections + SVG Fallback (FULL SOLUTION)
**Effort:** Medium-High (Collection curation + SVG templates)
**Impact:** Maximum (Professional quality)
**Timeline:** 1-2 weeks

**Changes Required:**

1. **Curate "Reception-Safe" Collection Subset**

New file: `src/lib/data/receptionSafeCollections.ts`

```typescript
/**
 * Curated list of collections verified safe for Reception counting
 * Criteria:
 * - Single object type only
 * - Simple, clear, uncluttered images
 * - Age-appropriate subjects
 * - Identical or near-identical image files
 */
export const RECEPTION_SAFE_COLLECTIONS = [
  {
    name: 'Fruit_by_ScrappinDoodles',
    recommendedObjects: ['apple', 'banana', 'orange', 'strawberry'],
    imageFiles: {
      apple: ['fruit_apple.png'], // Use THIS file only
      banana: ['fruit_banana.png'],
      orange: ['fruit_orange.png']
    },
    notes: 'Simple fruit images, clear and distinct'
  },
  {
    name: 'FoodGroup_Vegetables_byScrappinDoodles',
    recommendedObjects: ['carrot', 'tomato', 'corn'],
    imageFiles: {
      carrot: ['vegetable_carrot.png'],
      tomato: ['vegetable_tomato.png']
    },
    notes: 'Clear vegetable images'
  },
  // ... add 15-20 verified collections
];

/**
 * Check if collection is Reception-safe
 */
export function isReceptionSafe(collectionName: string): boolean {
  return RECEPTION_SAFE_COLLECTIONS.some(c => c.name === collectionName);
}

/**
 * Get recommended image file for object
 */
export function getRecommendedImageFile(
  object: string,
  collection: string
): string | null {
  const safeCollection = RECEPTION_SAFE_COLLECTIONS.find(c => c.name === collection);
  if (!safeCollection) return null;

  const files = safeCollection.imageFiles[object];
  return files ? files[0] : null; // Always return first (best) file
}
```

2. **Create SVG Template Library**

New file: `src/lib/templates/simpleSVGObjects.ts`

```typescript
/**
 * Simple SVG templates for common Reception counting objects
 * Use when Scrapping Doodle doesn't have suitable match
 */

export const SIMPLE_SVG_TEMPLATES = {
  apple: {
    svg: `<svg width="80" height="80" viewBox="0 0 80 80">
      <circle cx="40" cy="45" r="28" fill="#ff3333"/>
      <rect x="38" y="12" width="4" height="18" fill="#8B4513"/>
      <ellipse cx="46" cy="18" rx="10" ry="5" fill="#228B22" transform="rotate(-20 46 18)"/>
    </svg>`,
    alt: 'Red apple',
    keywords: ['apple', 'apples', 'fruit']
  },

  flower: {
    svg: `<svg width="80" height="80" viewBox="0 0 80 80">
      <!-- Center -->
      <circle cx="40" cy="40" r="8" fill="#FFD700"/>
      <!-- Petals -->
      <circle cx="40" cy="25" r="10" fill="#FF69B4"/>
      <circle cx="55" cy="40" r="10" fill="#FF69B4"/>
      <circle cx="40" cy="55" r="10" fill="#FF69B4"/>
      <circle cx="25" cy="40" r="10" fill="#FF69B4"/>
      <circle cx="48" cy="30" r="10" fill="#FF69B4"/>
      <circle cx="48" cy="50" r="10" fill="#FF69B4"/>
      <circle cx="32" cy="50" r="10" fill="#FF69B4"/>
      <circle cx="32" cy="30" r="10" fill="#FF69B4"/>
    </svg>`,
    alt: 'Pink flower',
    keywords: ['flower', 'flowers']
  },

  ball: {
    svg: `<svg width="80" height="80" viewBox="0 0 80 80">
      <circle cx="40" cy="40" r="30" fill="#FF4444"/>
      <circle cx="40" cy="40" r="30" fill="none" stroke="#CC0000" stroke-width="2"/>
      <path d="M 15 40 Q 40 20, 65 40" fill="none" stroke="#CC0000" stroke-width="2"/>
      <path d="M 15 40 Q 40 60, 65 40" fill="none" stroke="#CC0000" stroke-width="2"/>
    </svg>`,
    alt: 'Red ball',
    keywords: ['ball', 'balls']
  },

  star: {
    svg: `<svg width="80" height="80" viewBox="0 0 80 80">
      <path d="M 40 10 L 46 30 L 68 30 L 50 44 L 56 64 L 40 50 L 24 64 L 30 44 L 12 30 L 34 30 Z"
            fill="#FFD700" stroke="#FFA500" stroke-width="2"/>
    </svg>`,
    alt: 'Yellow star',
    keywords: ['star', 'stars']
  },

  // Add 15-20 more common objects
};

export function getSVGTemplate(objectName: string): string | null {
  const template = Object.values(SIMPLE_SVG_TEMPLATES).find(t =>
    t.keywords.some(k => k === objectName.toLowerCase() ||
                         objectName.toLowerCase().includes(k))
  );
  return template?.svg || null;
}
```

3. **Update Prompt with Fallback Logic**

```markdown
**🎨 IMAGE SELECTION FLOWCHART FOR RECEPTION:**

STEP 1: Create pedagogically sound question
- "Count the apples. How many apples are there?"

STEP 2: Extract object from question
- Object = "apples"

STEP 3: Check Reception-Safe Collections FIRST
- Look in curated list for "apples"
- Found: Fruit_by_ScrappinDoodles/fruit_apple.png
- Quality score: 95/100 ✅

STEP 4: Use best option:
- IF Reception-Safe collection found (score ≥90): Use Scrapping Doodle ✅
- ELSE IF General collection found (score 70-89): Use Scrapping Doodle with caution
- ELSE IF SVG template exists (score 60-69): Use SVG template
- ELSE: Generate custom simple SVG

STEP 5: Repeat SAME image multiple times
- Use fruit_apple.png × 7 (not apple1, apple2, apple3)

**EXAMPLES:**

Example 1: Perfect match
- Question: "Count the carrots"
- Match: FoodGroup_Vegetables/vegetable_carrot.png (score: 98)
- Action: Use Scrapping Doodle, repeat same file
- HTML: <img src="...vegetable_carrot.png" /> × 8

Example 2: Poor match (fallback to SVG)
- Question: "Count the unicorns"
- Match: None found (unicorns not in collections)
- Action: Generate simple unicorn SVG
- HTML: <svg>...simple unicorn...</svg> × 5

Example 3: Ambiguous match (use SVG for clarity)
- Question: "Count the flowers"
- Match: Spring_Garden (but has flowers + bees + butterflies, score: 45)
- Action: Use simple flower SVG template instead
- HTML: <svg>...simple flower...</svg> × 6
```

**Testing After Phase 3:**
- [ ] 90%+ questions use appropriate images
- [ ] SVG fallback working correctly
- [ ] No nonsensical scenarios
- [ ] Teachers rate worksheets 8+/10 for clarity

---

## 5. SUCCESS CRITERIA

### 5.1 Quantitative Metrics

| Metric | Current | Target | How to Measure |
|--------|---------|--------|----------------|
| Image-Question Match | ~50% | ≥90% | Manual review of 20 worksheets |
| Single Object Per Question | ~60% | 100% | Automated check of question text |
| Appropriate Quantities (≤10) | ~70% | 100% | Count objects in generated images |
| No Nonsensical Scenarios | ~75% | 100% | Teacher review panel |
| Teacher Quality Rating | 6.5/10 | 8.5+/10 | Survey 10 Reception teachers |

### 5.2 Qualitative Criteria

**A worksheet is "Reception-Ready" when:**
- [ ] A Reception teacher would confidently use it in class
- [ ] Questions are clear, simple, one-instruction only
- [ ] Images are unambiguous (obvious what to count)
- [ ] Objects are identical and repeated (not varied)
- [ ] Scenarios make real-world sense
- [ ] Quantity appropriate (≤10 objects for counting to 10)
- [ ] Layout is clean and uncluttered
- [ ] Child can complete independently with minimal support

### 5.3 Testing Protocol

**After each phase, run:**

1. **Automated Quality Check**
```bash
npm run test:reception-quality
```
Checks:
- Question count accuracy
- Single object per question
- Quantity ranges
- Collection quality scores

2. **Visual Inspection (5 Sample Worksheets)**
- Generate 5 worksheets
- Screenshots reviewed by developer
- Check against "Reception-Ready" criteria

3. **Teacher Panel Review (Phase 3 only)**
- Generate 10 worksheets
- 3 Reception teachers rate each worksheet 1-10
- Collect qualitative feedback
- Target: Average rating ≥8.5/10

---

## 6. IMPLEMENTATION TIMELINE

### Week 1: Phase 1 (Prompt Improvements)
- **Days 1-2:** Update prompts with Reception pedagogy rules
- **Day 3:** Add collection filtering logic
- **Days 4-5:** Testing and refinement

**Deliverable:** 20% improvement in question clarity

### Week 2: Phase 2 (Smart Matching)
- **Days 1-3:** Build ImageQualityScorer
- **Days 4-5:** Integrate scoring into promptService
- **Days 6-7:** Testing and threshold tuning

**Deliverable:** 50% improvement in image-question match

### Weeks 3-4: Phase 3 (Full Solution)
- **Days 1-5:** Curate Reception-Safe collections
- **Days 6-10:** Create SVG template library
- **Days 11-12:** Integration and testing
- **Days 13-14:** Teacher panel review and refinements

**Deliverable:** Production-ready Reception worksheets (8.5+/10 quality)

---

## 7. ROLLBACK PLAN

**If quality degrades or issues arise:**

### Immediate Rollback (< 5 minutes)
```bash
git revert <commit-hash>
npm run dev
```

### Gradual Rollback
1. Disable new rules in prompt (comment out sections)
2. Revert to previous collection count (30 → 6)
3. Fall back to previous prompt version

### Monitoring During Rollout
- Monitor Sentry for errors
- Check generation times (target: <30s)
- Track teacher feedback scores
- Review sample worksheets daily

---

## 8. KNOWN LIMITATIONS & FUTURE WORK

### Current Limitations

1. **Scrapping Doodle Collection Quality Varies**
   - Some collections have mixed elements
   - Not all collections tagged accurately
   - Manual curation needed

2. **SVG Generation Quality**
   - LLM-generated SVGs can be inconsistent
   - Template library will be limited initially
   - May need iterations to perfect

3. **No Automatic Quality Assessment**
   - Manual review still required
   - Teacher feedback needed for validation
   - Quality score is heuristic, not proven

### Future Enhancements

**Post-Launch Improvements:**

1. **Machine Learning Quality Scoring**
   - Train model on teacher-rated worksheets
   - Predict quality score automatically
   - Continuous improvement loop

2. **Expanded SVG Library**
   - 100+ simple object templates
   - Color variations
   - Different styles (cartoon, realistic, minimalist)

3. **Personalization**
   - Track what images work best for each child
   - Adapt to learning pace
   - Interest-based object selection

4. **Multi-Language Support**
   - Welsh medium education
   - EAL learners
   - Simplified English

---

## 9. TEAM ROLES & RESPONSIBILITIES

### Development
- **Lead Developer:** Implement phases 1-3
- **QA Engineer:** Testing protocol execution
- **DevOps:** Deployment and monitoring

### Stakeholders
- **Product Owner:** Approve design decisions
- **Reception Teachers (3):** Review and feedback
- **Curriculum Expert:** EYFS compliance validation

### Communication
- **Daily:** Slack updates on progress
- **Weekly:** Demo of improvements
- **Bi-weekly:** Teacher feedback sessions

---

## 10. REFERENCE MATERIALS

### Code Locations
- **Prompt Service:** `src/lib/services/promptService.ts` (lines 1650-1750)
- **Scrapping Doodle Service:** `src/lib/services/scrappingDoodleService.ts`
- **Collection Catalog:** `scripts/catalogs/master-vision-catalog.json`
- **Quality Assessment:** `worksheet-quality-reports/`

### External Resources
- [EYFS Framework 2025](https://www.gov.uk/government/publications/early-years-foundation-stage-framework--2)
- [Mastering Number (NCETM)](https://www.ncetm.org.uk/maths-hubs-projects/mastering-number-at-reception-and-ks1/)
- [Star Worksheets Examples](https://starworksheets.co.uk/maths/reception/counting-and-numbers/)

### Design Principles
1. **Child-First:** Every decision prioritizes child learning
2. **Evidence-Based:** Align with EYFS and research
3. **Teacher-Validated:** Real teachers must approve
4. **Simple is Better:** When in doubt, simplify
5. **Quality over Features:** One perfect worksheet > 100 mediocre ones

---

## 11. APPENDIX: PROMPT EXAMPLES

### Example A: BEFORE (Current - Poor Quality)

**Prompt Extract:**
```
Use available collections to create counting questions.
Available: FroggyFun_Football, Spring_Garden, School_Cows...
Create 5 engaging questions using diverse collections.
```

**Result:**
```
Q1: Count the frogs playing football (confusing - 2 objects)
Q2: Count the flowers (but image shows frogs + tiny flowers)
Q3: Count the school cows (nonsensical scenario)
```

### Example B: AFTER Phase 1 (Improved)

**Prompt Extract:**
```
RECEPTION PEDAGOGY RULES:
1. ONE object type per question
2. Simple, identical, repeated objects
3. Sensible real-world contexts only
4. Main object must be obvious and large

Create 5 questions following these rules strictly.
```

**Result:**
```
Q1: Count the apples. How many apples? (✅ clear, simple)
Q2: Count the pencils. How many pencils? (✅ clear, simple)
Q3: Count the flowers. How many flowers? (✅ clear, simple)
```

### Example C: AFTER Phase 3 (Optimal)

**Prompt Extract:**
```
STEP 1: Create pedagogically sound question
STEP 2: Find Reception-Safe collection OR use SVG
STEP 3: Repeat SAME simple image

Question: "Count the carrots. How many carrots are there?"
Match: FoodGroup_Vegetables/vegetable_carrot.png (score: 98)
Action: Use vegetable_carrot.png × 8

HTML:
<p>Count the carrots. How many carrots are there?</p>
<div class="counting-objects-grid">
  <img src="...vegetable_carrot.png" width="80" height="80" alt="Carrot"/>
  <img src="...vegetable_carrot.png" width="80" height="80" alt="Carrot"/>
  ... (×8)
</div>
```

---

## 12. GLOSSARY

**EYFS:** Early Years Foundation Stage - UK curriculum for ages 0-5

**One-to-One Correspondence:** Matching each object with one number word

**Reception:** UK school year for ages 4-5 (equivalent to Kindergarten)

**Scrapping Doodle:** Collection of 365 educational image collections

**SVG:** Scalable Vector Graphics - code-based images

**LLM:** Large Language Model (Gemini 2.5 Flash)

**Pedagogically Sound:** Following best teaching practices

---

**Document Version:** 1.0
**Last Updated:** 2025-10-11
**Author:** Development Team
**Status:** APPROVED FOR IMPLEMENTATION

---

## NEXT ACTIONS

**Immediate (Today):**
- [ ] Review and approve this plan
- [ ] Set up development branch: `feature/reception-quality-improvements`
- [ ] Create GitHub issues for each phase

**Phase 1 Start (Tomorrow):**
- [ ] Backup current promptService.ts
- [ ] Begin implementing Reception pedagogy rules
- [ ] Create test suite for validation

**Questions/Concerns:**
- Contact: [Dev Team] for technical questions
- Contact: [Product Owner] for scope questions
- Contact: [Curriculum Expert] for EYFS questions
