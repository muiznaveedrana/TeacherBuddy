# Matching Questions - Add Reference Labels for Interactive Mode

**Date:** 2025-11-22
**Issue:** Matching questions lack reference labels (A, B, C or 1, 2, 3), making it impossible for children to write answers in interactive mode
**Solution:** Add visual labels to all matching question items so children can type: `1-B, 2-D, 3-C, 4-A`

---

## 🎯 Problem Statement

### **Current State (Broken for Interactive Mode)**

Example from `numbers-to-20-COMPRESSED.md`:

```html
<div class="matching-activity">
    <div class="matching-column">
        <div class="match-item number">11</div>
        <div class="match-item number">15</div>
        <div class="match-item number">18</div>
        <div class="match-item number">20</div>
    </div>
    <div class="matching-column">
        <div class="match-item word">twenty</div>
        <div class="match-item word">eleven</div>
        <div class="match-item word">eighteen</div>
        <div class="match-item word">fifteen</div>
    </div>
</div>
```

**❌ Problem:**
- Left column: `11, 15, 18, 20` (no labels - how does child reference them?)
- Right column: `twenty, eleven, eighteen, fifteen` (no labels)
- **Print mode:** Child draws lines with pencil ✅ Works
- **Interactive mode:** Child must type answer in box ❌ **HOW?**
  - Type "11-eleven"? (error-prone, spelling mistakes)
  - Type "first-second"? (ambiguous)
  - **NO CLEAR WAY TO REFERENCE ITEMS!**

---

## ✅ Solution: Add Reference Labels

### **Updated Template (Works for Both Print & Interactive)**

```html
<div class="matching-activity">
    <div class="matching-column">
        <div class="match-item number">
            <span class="match-label">1</span>
            <span class="match-content">11</span>
        </div>
        <div class="match-item number">
            <span class="match-label">2</span>
            <span class="match-content">15</span>
        </div>
        <div class="match-item number">
            <span class="match-label">3</span>
            <span class="match-content">18</span>
        </div>
        <div class="match-item number">
            <span class="match-label">4</span>
            <span class="match-content">20</span>
        </div>
    </div>
    <div class="matching-column">
        <div class="match-item word">
            <span class="match-label">A</span>
            <span class="match-content">twenty</span>
        </div>
        <div class="match-item word">
            <span class="match-label">B</span>
            <span class="match-content">eleven</span>
        </div>
        <div class="match-item word">
            <span class="match-label">C</span>
            <span class="match-content">eighteen</span>
        </div>
        <div class="match-item word">
            <span class="match-label">D</span>
            <span class="match-content">fifteen</span>
        </div>
    </div>
</div>
<p class="answer-prompt">Write your matches (e.g., 1-B, 2-C): <span class="answer-box"></span></p>
```

**✅ Result:**
- **Print mode:** Child draws lines from numbers (1,2,3,4) to letters (A,B,C,D) ✅ Works
- **Interactive mode:** Child types `1-B, 2-D, 3-C, 4-A` in answer box ✅ **Works!**

---

## 🎨 CSS Updates Required

Add to ALL matching question CSS blocks:

```css
.match-label {
    display: inline-block;
    width: 32px;
    height: 32px;
    background: #4169E1;
    color: white;
    border-radius: 50%;
    text-align: center;
    line-height: 32px;
    font-weight: bold;
    margin-right: 10px;
    font-size: 14pt;
    flex-shrink: 0;
}

.match-content {
    font-size: 14pt;
    font-weight: bold;
    flex: 1;
}

.match-item {
    padding: 12px;
    border: 2px solid #333;
    border-radius: 8px;
    font-weight: bold;
    font-size: 14pt;
    display: flex;
    align-items: center;
    gap: 10px;
}

.answer-prompt {
    font-weight: bold;
    margin-top: 15px;
    font-size: 14pt;
}

.answer-box {
    display: inline-block;
    border-bottom: 2px solid #333;
    min-width: 200px;
    height: 30px;
    vertical-align: middle;
    margin-left: 5px;
}
```

---

## 📝 Prompt Updates (ALL Configs with Matching Questions)

### **Affected Configurations:**

| Year Group | Config File | Question # | Type |
|------------|-------------|------------|------|
| **Year 1** | `numbers-to-20-COMPRESSED.md` | Q5 | Number-word matching |
| **Year 1** | (Check all Year 1 configs) | Various | Matching activities |
| **Year 2** | `numbers-to-100-COMPRESSED.md` | Q4 | Number-word matching |
| **Year 2** | (Check all Year 2 configs) | Various | Matching activities |
| **Reception** | `size-comparison-COMPRESSED.md` | Q4 | Size ordering (similar pattern) |

### **Update Instructions for Each Matching Question:**

1. **Add reference labels:**
   - Left column: Use **numbers** (1, 2, 3, 4, etc.)
   - Right column: Use **letters** (A, B, C, D, etc.)

2. **Wrap content in spans:**
   ```html
   <div class="match-item number">
       <span class="match-label">1</span>
       <span class="match-content">11</span>
   </div>
   ```

3. **Add answer prompt with box:**
   ```html
   <p class="answer-prompt">Write your matches (e.g., 1-B, 2-C): <span class="answer-box"></span></p>
   ```

4. **Update answer key:**
   ```html
   <p><strong>5.</strong> 1-B, 2-D, 3-C, 4-A</p>
   ```

---

## 🔧 Specific Prompt File Updates

### **1. numbers-to-20-COMPRESSED.md**

**Current Q5 Template (Lines 220-238):**
```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> Draw lines to match the numbers to the words.</p>
    <div class="matching-activity">
        <div class="matching-column">
            <div class="match-item number">11</div>
            <div class="match-item number">15</div>
            <div class="match-item number">18</div>
            <div class="match-item number">20</div>
        </div>
        <div class="matching-column">
            <div class="match-item word">twenty</div>
            <div class="match-item word">eleven</div>
            <div class="match-item word">eighteen</div>
            <div class="match-item word">fifteen</div>
        </div>
    </div>
</div>
```

**Updated Q5 Template (WITH LABELS):**
```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> Match the numbers to the words.</p>
    <div class="matching-activity">
        <div class="matching-column">
            <div class="match-item number">
                <span class="match-label">1</span>
                <span class="match-content">11</span>
            </div>
            <div class="match-item number">
                <span class="match-label">2</span>
                <span class="match-content">15</span>
            </div>
            <div class="match-item number">
                <span class="match-label">3</span>
                <span class="match-content">18</span>
            </div>
            <div class="match-item number">
                <span class="match-label">4</span>
                <span class="match-content">20</span>
            </div>
        </div>
        <div class="matching-column">
            <div class="match-item word">
                <span class="match-label">A</span>
                <span class="match-content">twenty</span>
            </div>
            <div class="match-item word">
                <span class="match-label">B</span>
                <span class="match-content">eleven</span>
            </div>
            <div class="match-item word">
                <span class="match-label">C</span>
                <span class="match-content">eighteen</span>
            </div>
            <div class="match-item word">
                <span class="match-label">D</span>
                <span class="match-content">fifteen</span>
            </div>
        </div>
    </div>
    <p class="answer-prompt">Write your matches (e.g., 1-B, 2-C): <span class="answer-box"></span></p>
</div>
```

**CSS Update (Add after line 281):**
```css
.match-label{display:inline-block;width:32px;height:32px;background:#4169E1;color:white;border-radius:50%;text-align:center;line-height:32px;font-weight:bold;margin-right:10px;font-size:14pt;flex-shrink:0;}
.match-content{font-size:14pt;font-weight:bold;flex:1;}
.match-item{padding:12px;border:2px solid #333;border-radius:8px;font-weight:bold;font-size:14pt;display:flex;align-items:center;gap:10px;}
.answer-prompt{font-weight:bold;margin-top:15px;font-size:14pt;}
```

**Answer Key Update (Line 258):**
```html
<!-- BEFORE -->
<p><strong>5.</strong> 11-eleven, 15-fifteen, 18-eighteen, 20-twenty</p>

<!-- AFTER -->
<p><strong>5.</strong> 1-B, 2-D, 3-C, 4-A</p>
```

---

### **2. numbers-to-100-COMPRESSED.md** (Year 2)

Same pattern as above - add labels to Q4 matching question.

---

### **3. size-comparison-COMPRESSED.md** (Reception Q4)

**Current Q4 (Ordering):**
Uses similar matching structure but for size ordering. Update with labels:

```html
<div class="ordering-activity">
    <div class="animals-unsorted">
        <div class="animal-box">
            <span class="match-label">1</span>
            <img src="/images/block.png" width="75" height="75" alt="Block" />
        </div>
        <div class="animal-box">
            <span class="match-label">2</span>
            <img src="/images/block.png" width="50" height="50" alt="Block" />
        </div>
        <div class="animal-box">
            <span class="match-label">3</span>
            <img src="/images/block.png" width="100" height="100" alt="Block" />
        </div>
    </div>
    <div class="size-labels">
        <div class="size-box"><span class="match-label">A</span> Smallest</div>
        <div class="size-box"><span class="match-label">B</span> Medium</div>
        <div class="size-box"><span class="match-label">C</span> Biggest</div>
    </div>
</div>
<p class="answer-prompt">Write your matches (e.g., 1-A, 2-B): <span class="answer-box"></span></p>
```

---

## 📊 Implementation Strategy

### **Phase 1: Identify All Matching Questions**

**Search command:**
```bash
grep -r "matching-activity\|Draw lines to match\|Match the" src/lib/prompts/configurations/ --include="*.md"
```

**Expected results:**
- ~5-10 configurations with matching questions
- Most common in Year 1 and Year 2
- Possibly in Reception (size ordering, shape matching)

### **Phase 2: Update Prompts (Manual)**

For each config file with matching questions:

1. **Find matching question section** (usually Q4 or Q5)
2. **Add reference labels** (1,2,3,4 left / A,B,C,D right)
3. **Update CSS** (add .match-label, .match-content styles)
4. **Add answer-prompt** with answer-box
5. **Update answer key** (use 1-B format, not 11-eleven format)

### **Phase 3: Test Generation**

```bash
# Test configs with matching questions
node scripts/batch-parallel-agent.js year1-number-place-value-numbers-to-20 --batch-size=1
node scripts/batch-parallel-agent.js year2-number-place-value-numbers-to-100 --batch-size=1
```

**Verify:**
- ✅ Labels visible in print mode (1,2,3,4 and A,B,C,D)
- ✅ Answer box present for typing
- ✅ Answer key uses 1-B format
- ✅ Interactive mode allows typing matches

---

## ✅ Success Criteria

**For each matching question:**
- [ ] Left column items have numbered labels (1, 2, 3, 4)
- [ ] Right column items have lettered labels (A, B, C, D)
- [ ] Labels are visually distinct (colored circle background)
- [ ] Answer-prompt present with answer-box for typing
- [ ] Answer key uses reference format (e.g., "1-B, 2-D, 3-C, 4-A")
- [ ] Works in print mode (draw lines)
- [ ] Works in interactive mode (type matches)

---

## 🎯 Expected Impact

### **Before Fix:**
- ❌ Interactive mode broken for matching questions
- ❌ Children cannot type answers (no reference system)
- ❌ Must rely on spelling words correctly ("11-eleven")

### **After Fix:**
- ✅ Interactive mode works perfectly
- ✅ Children type simple codes: `1-B, 2-D, 3-C, 4-A`
- ✅ No spelling required (just numbers + letters)
- ✅ Print mode still works (draw lines between labels)

---

## 📝 Instruction Updates for Prompts

Add this section to ALL configs with matching questions:

```markdown
## Matching Questions - Interactive Mode Support

**CRITICAL:** All matching questions MUST include reference labels for interactive mode.

### Label System:
- **Left column:** Number labels (1, 2, 3, 4, etc.) in blue circles
- **Right column:** Letter labels (A, B, C, D, etc.) in blue circles
- **Answer box:** Children type matches like: `1-B, 2-D, 3-C, 4-A`

### Template:
```html
<div class="match-item">
    <span class="match-label">1</span>
    <span class="match-content">[content]</span>
</div>
```

### Print Mode:
- Child draws lines from numbers (1,2,3) to letters (A,B,C)

### Interactive Mode:
- Child types matches in answer box: `1-B, 2-D, 3-C, 4-A`

**Both modes work with same worksheet!**
```

---

## 🚀 Next Steps

1. ✅ **Document created** (this file)
2. **Search for all matching questions** across 53 configs
3. **Update each config** with reference labels
4. **Test 3 sample configs** (one per year group)
5. **Rollout to all affected configs**
6. **Regenerate worksheets** to verify fix works

**Timeline:** ~2-3 hours to update all affected configs
**Priority:** HIGH (critical for interactive mode functionality)
**Risk:** LOW (additive change, improves both print and interactive modes)

---

**Status:** ✅ READY TO IMPLEMENT
**Reviewed By:** Claude Code Quality Agent
**Approved For:** Production Deployment
