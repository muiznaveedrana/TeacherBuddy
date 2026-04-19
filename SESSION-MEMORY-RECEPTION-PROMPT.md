# Session Memory: Reception Counting Worksheet

## Purpose
Testing Reception-level math prompts by creating deployable HTML worksheets and previewing on mobile devices.

## Current Branch
`claude/check-reception-prompt-01CU4vp1GNNFvKum9JhcHixS`

## What Was Done

### 1. Explored Reception Prompts
Found 15 Reception prompts at `src/lib/prompts/configurations/reception/`:
- **Measurement**: capacity, length-comparison, time-concepts, weight-comparison
- **Number & Counting**: counting-to-10, early-addition, early-subtraction, more-or-less, number-bonds, number-recognition, subitising
- **Shape & Space**: basic-shapes, patterns, position-direction, size-comparison

### 2. Generated Worksheet from `counting-to-10-COMPRESSED.md`
Prompt rules followed:
- 5 questions, range 1-10, RANDOMIZED (not sequential): 7, 3, 9, 5, 2
- Different object per question: apples, butterflies, stars, cars, ducks
- Varied templates: "How many X?", "Count the X", "Name is counting X. How many?"
- Backgrounds: #FFF9C4, #F1F8E9, #E3F2FD, #FCE4EC, #FFF3E0
- Answer key included

### 3. Files Created
- `public/worksheets/reception-counting-to-10.html` - Uses `/images/` paths (needs server)
- `public/worksheets/reception-counting-standalone.html` - Base64 embedded images (6.5MB, works anywhere)
- `public/images/` - Created by copying from `public/images-org-backup2025-11-22/`

### 4. Font Fixes
**Issue discovered:** Prompt CSS uses `Comic Sans MS` which doesn't exist on Android.
**App actually uses** (from `src/app/layout.tsx` and `src/app/globals.css`):
- **Mulish** (formerly Muli) - body text via `--font-mulish`
- **Kalam** - handwritten/playful headers via `--font-kalam`
- Both loaded from Google Fonts

**Fixed standalone worksheet** to use Mulish + Kalam via Google Fonts CDN.

### 5. UX Fix
Removed duplicate underline: had both `border-bottom` CSS AND `_______` underscores on answer lines.

### 6. Deployment
**Netlify Site:**
- URL: https://teacherbuddy-worksheet.netlify.app/reception-counting-standalone.html
- Site ID: `b74dffe7-b5b7-4235-9924-fcaafa848c6c`
- Account slug: `naveed-idrees`
- Auth token: stored separately (NOT in git - user has it)

**Deploy command (via API):**
```bash
cd public/worksheets && \
zip -r /tmp/deploy.zip . && \
curl -X POST \
  -H "Authorization: Bearer $NETLIFY_TOKEN" \
  -H "Content-Type: application/zip" \
  --data-binary @/tmp/deploy.zip \
  "https://api.netlify.com/api/v1/sites/b74dffe7-b5b7-4235-9924-fcaafa848c6c/deploys"
```

## Commits This Session
```
bc7ef50 Fix answer line - remove duplicate underscores
ca783c5 Update worksheet fonts to Mulish and Kalam
e9e8706 Add standalone worksheet with embedded base64 images
34809e3 Add Reception counting-to-10 worksheet HTML
```

## Key Observations / TODOs

### Prompt Inconsistency
The prompt file `counting-to-10-COMPRESSED.md` specifies `font-family:'Comic Sans MS',sans-serif`, but the app uses **Mulish + Kalam**. All Reception prompts likely have the same issue.

**Potential action:** Update Reception prompt files to use Mulish/Kalam for consistency with the app.

### Image Path
Prompt uses `/images/` - this folder didn't exist; had to copy from `images-org-backup2025-11-22`. User wants `/public/images/` as the canonical location.

### Testing Other Prompts
Could apply the same deployment workflow to test other Reception prompts:
- early-addition, early-subtraction, number-bonds
- basic-shapes, size-comparison, position-direction
- capacity, length-comparison, weight-comparison

## Useful Project Context
- Dev server: `npm run dev` on port 3000 (kill 3000-3005 first)
- Use `/public/images/` folder (NOT `/images-flat/`)
- Project uses Next.js 14.2.15
- CLAUDE.md has "yolo" directive and strict worksheet assessment criteria
- Strict criteria: 95+ score, zero critical issues, all images must load

## Quick Continue Commands
```bash
# View current worksheet
open https://teacherbuddy-worksheet.netlify.app/reception-counting-standalone.html

# Redeploy after changes
cd /home/user/TeacherBuddy/public/worksheets && \
rm -f /tmp/deploy.zip && zip -r /tmp/deploy.zip . && \
curl -X POST -H "Authorization: Bearer $NETLIFY_TOKEN" \
  -H "Content-Type: application/zip" --data-binary @/tmp/deploy.zip \
  "https://api.netlify.com/api/v1/sites/b74dffe7-b5b7-4235-9924-fcaafa848c6c/deploys"

# Check branch
git log --oneline -5
```
