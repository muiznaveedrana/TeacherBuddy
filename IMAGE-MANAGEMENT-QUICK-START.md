# Image Management System - Quick Start Guide

**For**: Developers needing immediate fixes
**Read Time**: 5 minutes
**Full Plan**: See `IMAGE-MANAGEMENT-IMPROVEMENT-PLAN.md`

---

## Current State (October 14, 2025)

### What's Working ✅
- 67 verified images in WORKSHEET_OBJECTS directory
- 100% image loading success (no broken paths)
- Clean, organized structure by curriculum topic
- Reception counting-to-10 prompt uses new system

### What's Broken ❌
- **Doll image shows dollar sign ($)** instead of toy doll
- **Dual catalog confusion**: Fix Registry uses old catalog that worksheets don't reference
- **28% object pool utilization**: Only 19/67 objects being used
- **No automated catalog updates**: Must manually edit JSON

---

## Quick Fixes (Do These First)

### Fix 1: Replace Broken Doll Image (15 minutes)

```bash
# 1. View current image (it shows "$")
# Use Claude Code vision or open in image viewer:
# public/images/WORKSHEET_OBJECTS/counting/toys/doll.png

# 2. Find correct doll image in source collections
find "public/images/SCRAPPING DOODLE" -name "*.png" | grep -i doll

# 3. Manually review candidates and copy the correct one
# (Look for toy doll, not currency symbol)

# 4. Replace
cp "public/images/SCRAPPING DOODLE/[collection]/[correct-doll].png" \
   public/images/WORKSHEET_OBJECTS/counting/toys/doll.png
```

### Fix 2: Verify Football Image (10 minutes)

```bash
# 1. Check if football.png shows footballs (not sailors)
# View: public/images/WORKSHEET_OBJECTS/counting/sports/football.png

# 2. If incorrect, replace from correct collection
cp "public/images/SCRAPPING DOODLE/Football_Kids_by_ScrappinDoodles/football.png" \
   public/images/WORKSHEET_OBJECTS/counting/sports/football.png
```

### Fix 3: Test with Autonomous Agent (5 minutes)

```bash
node scripts/autonomous-worksheet-quality-agent.js \
  reception-number-counting-counting-to-10 \
  --iterations=2
```

**Expected Improvement**: Score increases from 71.9 to ~75-78

---

## System Architecture Overview

### Current Workflow (Simplified)

```
1. Prompt references: /images/WORKSHEET_OBJECTS/counting/fruits/apple.png
2. LLM generates HTML with that path
3. Autonomous Agent checks: img.isVisible() ✅
4. But CANNOT verify: apple image actually shows apples ❓
```

### The Problem

```
┌──────────────────────────────────────────────────┐
│ Fix Registry modifies: master-vision-catalog.json │
│ (SCRAPPING DOODLE collections)                    │
└──────────────────────────────────────────────────┘
                    ⬇️ NO CONNECTION
┌──────────────────────────────────────────────────┐
│ Worksheets use: WORKSHEET_OBJECTS directory      │
│ (Simple topic-based structure)                    │
└──────────────────────────────────────────────────┘
```

**Result**: Fixes don't affect actual worksheets!

---

## Adding New Images (Current Process)

**Scenario**: Teacher wants "teddy bear" for counting

### Current (Manual - 20 minutes):
1. Find source image in SCRAPPING DOODLE
2. Copy to WORKSHEET_OBJECTS/counting/toys/
3. **Manually edit catalog JSON** (error-prone!)
4. Update prompt vocabulary list
5. Test with agent

### Proposed (Automated - 5 minutes):
1. Copy image to WORKSHEET_OBJECTS/counting/toys/teddy_bear.png
2. Run: `node scripts/services/generate-worksheet-objects-catalog.js`
3. Catalog auto-updates from filesystem scan!
4. Update prompt vocabulary list
5. Test with agent

**Key Improvement**: Eliminates manual JSON editing

---

## Implementation Roadmap (4 Weeks)

### Week 1: Foundation (CRITICAL)
- [ ] Build automated catalog generator (2h)
- [ ] Fix doll and football images (30min)
- [ ] Update Fix Registry for WORKSHEET_OBJECTS (1h)
- [ ] Test with autonomous agent (30min)

**Deliverable**: +6 points to quality score

### Week 2: Validation
- [ ] Build image content validator (2h)
- [ ] Validate all 67 images (2h manual review)
- [ ] Replace incorrect images (1h)

**Deliverable**: 100% image content accuracy

### Week 3-4: Automation
- [ ] Integrate with autonomous agent (3h)
- [ ] Add usage tracking (2h)
- [ ] Create visual catalog preview (1h)

**Deliverable**: Fully automated image management

---

## Key Files Reference

### Current Files
```
public/images/WORKSHEET_OBJECTS/
├── counting/
│   ├── fruits/       (10 images)
│   ├── garden/       (9 images)
│   ├── school_supplies/ (9 images)
│   └── ... (7 more categories)

scripts/catalogs/
└── master-vision-catalog.json    # OLD - used by Fix Registry
                                   # DISCONNECTED from worksheets

src/lib/prompts/configurations/reception/number-counting/
└── counting-to-10.md             # References WORKSHEET_OBJECTS ✅
```

### Files to Create (Week 1)
```
scripts/services/
└── generate-worksheet-objects-catalog.js   # Auto-generate catalog

scripts/catalogs/
└── worksheet-objects-catalog.json          # NEW unified catalog
```

---

## Common Issues & Solutions

### Issue 1: "Image shows wrong content"
**Example**: Doll shows dollar sign

**Root Cause**: Wrong source image copied from SCRAPPING DOODLE

**Fix**:
1. Find correct image in source collections
2. Replace file in WORKSHEET_OBJECTS
3. No catalog update needed (path stays same)

### Issue 2: "Object diversity declining"
**Example**: Iteration 5 reused 4/5 objects from previous iterations

**Root Cause**: LLM prefers common objects (apples, cookies, stars)

**Fix** (in prompt):
- Add explicit "forbidden objects" list
- Add freshness scoring system
- Boost less-common objects (worms, geese, glue)

**See**: `IMAGE-MANAGEMENT-IMPROVEMENT-PLAN.md` Part 3.4

### Issue 3: "Fix Registry not working"
**Example**: Applied football→sailor fix, but still wrong

**Root Cause**: Fix Registry modifies master-vision-catalog.json, but worksheets use WORKSHEET_OBJECTS

**Fix**:
1. Update Fix Registry to use worksheet-objects-catalog.json
2. Add FIX 7: WORKSHEET_OBJECTS Image Validation

**See**: `IMAGE-MANAGEMENT-IMPROVEMENT-PLAN.md` Part 3.3

---

## Quick Commands

```bash
# Generate catalog (after building generator)
node scripts/services/generate-worksheet-objects-catalog.js

# Validate images (after building validator)
node scripts/services/image-content-validator.js

# Run quality assessment
node scripts/autonomous-worksheet-quality-agent.js \
  reception-number-counting-counting-to-10 \
  --iterations=5 \
  --auto-fix=true

# Count available images
find public/images/WORKSHEET_OBJECTS -name "*.png" | wc -l
# Output: 67

# List all objects
ls public/images/WORKSHEET_OBJECTS/counting/*/
```

---

## Success Metrics

### Before Fixes (Current State)
- Image Content Accuracy: **~97%** (2 known issues: doll, possibly football)
- Object Pool Utilization: **28%** (19/67 objects used)
- Overall Quality Score: **71.9/100**
- Pass Rate: **0%**

### After Phase 1 (Week 1)
- Image Content Accuracy: **100%** (doll and football fixed)
- Object Pool Utilization: **28%** (same, but validated)
- Overall Quality Score: **~78/100** (+6 points)
- Pass Rate: **~60%**

### After Phase 2 (Week 2)
- Image Content Accuracy: **100%** (all 67 validated)
- Object Pool Utilization: **50%** (improved prompts)
- Overall Quality Score: **~85/100** (+13 points)
- Pass Rate: **~90%** (production ready!)

---

## Next Steps

1. **Read this guide** (5 minutes) ✅ You are here
2. **Read full plan** (`IMAGE-MANAGEMENT-IMPROVEMENT-PLAN.md`) - 30 minutes
3. **Fix doll and football images** (25 minutes)
4. **Build automated catalog generator** (2 hours)
5. **Test with autonomous agent** (30 minutes)

**Total Time to Production Ready**: ~20 hours over 4 weeks

**Key Milestone**: After Week 1, expect +6 point quality increase

---

## Questions?

**Q: Can I just fix the images and skip the automation?**
A: Yes, but you'll need to manually edit JSON for every new image. Automation saves 75% time long-term.

**Q: Why not use master-vision-catalog.json for everything?**
A: Too complex (80+ collections), prompts already migrated to WORKSHEET_OBJECTS, and curriculum-aligned structure is clearer.

**Q: How do I verify image content without vision API?**
A: Manual review (one-time for 67 images = 2 hours). See image-content-validator.js for structured approach.

**Q: What if I need to add 50+ new images quickly?**
A: Week 1 automation pays off immediately. After setup, adding 50 images = 50 files + 1 command (vs 50 × 20min manual).

---

**Document Version**: 1.0
**Full Plan**: `IMAGE-MANAGEMENT-IMPROVEMENT-PLAN.md`
**Date**: October 14, 2025
