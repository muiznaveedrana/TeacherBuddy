# Complete Interactive Workflow Test - Fix Documentation

## Overview
This document describes the fixes applied to `complete-interactive-workflow.spec.ts` to make it pass successfully.

## Test Purpose
Automate the complete end-to-end workflow:
1. Generate a worksheet on the create page
2. Parse the answer key from the generated worksheet
3. Open the interactive mode in a popup
4. Fill in all answers correctly
5. Submit and verify 100% score

## Key Fixes Applied

### Fix #1: Removed Discouraged `networkidle` Usage
**Lines affected**: 132, 179, 200

Playwright discourages `networkidle` as it can cause flakiness. Changed to use default `'load'` state.

```typescript
// ❌ Before
await page.goto('http://localhost:3000/create', { waitUntil: 'networkidle' })
await popup.waitForLoadState('networkidle')

// ✅ After
await page.goto('http://localhost:3000/create')
await popup.waitForLoadState('load')
```

### Fix #2: Corrected Input Field Selectors
**Lines affected**: 104-109

The test was using incorrect selectors. The actual implementation uses `id="input-{subId}"` format.

```typescript
// ❌ Before
const input = popup.locator(`input[data-question-id="${qId}"]`)
  .or(popup.locator(`input[name="question-${qId}"]`))
  .or(popup.locator(`#question-${qId}-input`))

// ✅ After
const inputSelector = `#input-${qId}`
const input = popup.locator(inputSelector).first()
```

**Source**: `src/components/worksheet/QuestionInput.tsx:130`
```typescript
id={`input-${field.subId}`}
```

### Fix #3: Enhanced Answer Key Parsing
**Lines affected**: 58-118

Added robust fallback logic and error handling for parsing answers from the create page.

```typescript
// ✅ New implementation
// 1. Try .answer-key-content
let answerKeyContent = page.locator('.worksheet-preview .answer-key-content')
let exists = await answerKeyContent.count() > 0

// 2. Fallback to .answer-key parent
if (!exists) {
  const answerKeyParent = page.locator('.worksheet-preview .answer-key')
  exists = await answerKeyParent.count() > 0
  if (exists) {
    answerKeyContent = answerKeyParent
  }
}

// 3. Throw clear error if not found
if (!exists) {
  throw new Error('Answer key section not found in worksheet preview')
}
```

### Fix #4: Fixed Celebration Overlay Detection
**Lines affected**: 240-259

Updated to match the actual DOM structure from `CelebrationOverlay.tsx`.

```typescript
// ❌ Before
const celebrationOverlay = popup.locator('.celebration-overlay')

// ✅ After
const celebrationOverlay = popup.locator('.fixed.inset-0.z-50')
```

**Source**: `src/components/worksheet/CelebrationOverlay.tsx:43`
```typescript
<div className="fixed inset-0 z-50 flex items-center justify-center...">
```

### Fix #5: Updated Score Verification Logic
**Lines affected**: 247-259

Changed to match the actual celebration overlay format.

```typescript
// ❌ Before
const scoreElement = popup.locator('text=/Score:|Your Score:|\\d+\\/\\d+/')

// ✅ After
const scoreElement = popup.locator('text=/\\d+%/').first()
expect(scoreText).toContain('100%')

const correctText = popup.locator(`text=/You got.*${totalQuestions}.*out of.*${totalQuestions}.*correct/i`)
```

**Source**: `src/components/worksheet/CelebrationOverlay.tsx:72-78`
```typescript
<div className={`text-7xl font-bold mb-4 ${color}`}>
  {score}%
</div>
<p className="text-2xl text-gray-600 mb-6">
  You got <span className="font-bold text-green-600">{correct}</span> out of{' '}
  <span className="font-bold text-gray-800">{total}</span> correct!
</p>
```

### Fix #6: Added Debug Screenshots
**Lines affected**: 197-201, 226-230, 264-268

Added three strategic screenshots to help debug failures:

1. **After worksheet generation** - Verify answer key is visible
2. **After filling answers** - Verify all inputs were filled correctly
3. **Final celebration screen** - Verify score display

## Technical Architecture

### Workflow Flow
```
Create Page
    ↓
Generate Worksheet (with answer key in HTML)
    ↓
Click "Interactive Printable" button
    ↓
Store HTML in sessionStorage ('previewWorksheetHtml')
    ↓
Open /preview/interactive in new tab
    ↓
Read HTML from sessionStorage
    ↓
Parse with structuredWorksheetParser
    ↓
Render InteractiveModeV2 with controlled inputs
    ↓
User fills inputs (id="input-{subId}")
    ↓
Submit answers
    ↓
Calculate score with answerValidator
    ↓
Show CelebrationOverlay
```

### Key Files
- `src/app/create/page.tsx:1454-1471` - Interactive button click handler
- `src/app/preview/interactive/page.tsx:14` - Read from sessionStorage
- `src/components/worksheet/InteractiveModeV2.tsx` - Main interactive component
- `src/lib/utils/structuredWorksheetParser.ts` - Parse worksheet HTML
- `src/components/worksheet/QuestionInput.tsx` - Controlled input rendering
- `src/components/worksheet/CelebrationOverlay.tsx` - Score display

### Input ID Format
- **Single-input questions**: `input-1`, `input-2`, `input-3`
- **Multi-input questions**: `input-4-0`, `input-4-1` (e.g., "1 less" and "1 more")

### Answer Key Format
Located in `.answer-key-content` div, with paragraphs like:
```
1. 5
2. 10
3. 15
```

Or with colons:
```
1: 5
2: 10
3: 15
```

## Running the Test

### Prerequisites
1. Dev server running on `localhost:3000`
2. Admin account credentials:
   - Email: `naveed.idrees@gmail.com`
   - Password: `mysupabase`

### Command
```bash
# Using npm script
npm run test:e2e -- tests/e2e/complete-interactive-workflow.spec.ts --project=chromium-desktop

# Using Playwright CLI directly
npx playwright test tests/e2e/complete-interactive-workflow.spec.ts --project=chromium-desktop

# Using helper script (if bash not available)
node run-interactive-test.js
```

### Expected Duration
- **Total**: ~120 seconds (2 minutes)
- Worksheet generation: ~90 seconds
- Interactive flow: ~30 seconds

## Expected Output

### Console Log
```
================================================================================
🎯 COMPLETE INTERACTIVE WORKFLOW TEST
================================================================================

✅ Step 1: Logged in
✅ Step 2: On create page
✅ Step 3: Configured worksheet (Reception, first topic/subtopic)
✅ Step 4: Show Answers is ON
⏳ Step 5: Generating worksheet...
✅ Step 5: Worksheet generated
📸 Screenshot saved: generated-worksheet-with-answers.png
📋 Parsing answer key from worksheet preview...
📋 Found 5 answer paragraphs
  ✅ Q1: "13"
  ✅ Q2: "14"
  ✅ Q3: "17"
  ✅ Q4: "14, 16"
  ✅ Q5: "11-eleven, 14-fourteen, 16-sixteen, 20-twenty"
📋 Parsed 5 answers
✅ Step 6: Parsed 5 answers from answer key
✅ Step 7: Interactive mode opened in popup
✅ Interactive worksheet loaded
✏️ Filling in answers in interactive mode...
  ✅ Filled Q1: "13"
  ✅ Filled Q2: "14"
  ✅ Filled Q3: "17"
  ✅ Filled Q4: "14, 16"
  ✅ Filled Q5: "11-eleven, 14-fourteen, 16-sixteen, 20-twenty"
✅ All 5 answers filled
✅ Step 8: All answers filled
📸 Screenshot saved: interactive-filled-answers.png
✅ Step 9: Answers submitted
🎉 Celebration overlay visible
📊 Score displayed: "100%"
✅ Step 10: Verified 100% score (5/5)
✅ Step 11: Screenshot saved to tests/e2e/screenshots/complete-interactive-100-percent.png

================================================================================
🎉 TEST COMPLETE: Successfully filled worksheet and achieved 100% score!
================================================================================
```

### Generated Screenshots
1. `tests/e2e/screenshots/generated-worksheet-with-answers.png`
2. `tests/e2e/screenshots/interactive-filled-answers.png`
3. `tests/e2e/screenshots/complete-interactive-100-percent.png`

## Troubleshooting

### Issue: "Answer key section not found"
**Cause**: `showAnswers` toggle is OFF
**Solution**: Test automatically enables it at line 182, but verify the toggle exists

### Issue: Input field not found
**Cause**: Wrong input selector or question format changed
**Solution**: Check screenshot #2 to see if inputs were rendered, verify `id="input-{N}"` format

### Issue: Celebration overlay not visible
**Cause**: Answers were incorrect or score calculation failed
**Solution**: Check screenshot #2 to verify answers match, review console logs for validation errors

### Issue: Test timeout
**Cause**: Worksheet generation taking >90 seconds
**Solution**: Increase timeout on line 193 or use a simpler topic (Reception has fewer images)

## Success Indicators
✅ All 11 steps complete without errors
✅ 3 screenshots generated
✅ Console shows "100%" score
✅ Celebration overlay visible
✅ Test passes in <120 seconds

## Maintenance Notes

### If Input Format Changes
Update line 104: `const inputSelector = \`#input-${qId}\``

### If Celebration Overlay Changes
Update line 241: `const celebrationOverlay = popup.locator('.fixed.inset-0.z-50')`

### If Answer Key Format Changes
Update lines 68-80 in `parseAnswerKeyFromCreatePage()` function

### If Score Display Format Changes
Update lines 247-259 to match new format

## Related Files
- **Test file**: `tests/e2e/complete-interactive-workflow.spec.ts`
- **Summary**: `TEST-FIXES-SUMMARY.md`
- **Helper script**: `run-interactive-test.js`
- **Screenshots dir**: `tests/e2e/screenshots/`

## Version
- **Fixed**: 2025-11-19
- **Test timeout**: 120 seconds
- **Playwright version**: ^1.56.1
- **Target browser**: chromium-desktop
