# Worksheet Generation Skill

## Overview
Generate educational worksheets for UK primary curriculum (Reception to Year 6) using prompt configurations, preview them, and save to Supabase library.

## Directory Structure
```
/src/lib/prompts/configurations/     # Prompt templates by year group
/public/images/                       # Image assets for worksheets
/public/preview-worksheet.html        # Preview file (overwrite each time)
/scripts/claude-save-to-library.js    # Save to Supabase script
```

## Workflow

### Step 1: Select Configuration
User specifies: year group, topic, subtopic
```
Example: "reception, number-counting, counting-to-10"
```

Find prompt at:
```
/src/lib/prompts/configurations/{year_group}/{topic}/{subtopic}-COMPRESSED.md
```

### Step 2: Read & Follow Prompt
1. Read the COMPRESSED.md file completely
2. Follow ALL rules exactly:
   - Question types and order
   - HTML structure
   - CSS styles
   - Background colors per question
   - Image paths: `/images/{object}.png`
   - Answer key format

### Step 3: Generate HTML
Create complete HTML file with:
- DOCTYPE and html/head/body tags
- CSS in `<style>` tag (from prompt)
- Title `<h1>`
- Questions with correct backgrounds
- Images using `/images/{object}.png` paths
- Answer key at bottom

### Step 4: Save for Preview
Save to: `/public/preview-worksheet.html`

Tell user to open: `http://localhost:3000/preview-worksheet.html`

### Step 5: User Review
Wait for user feedback. **ONLY proceed to Step 6 when user explicitly says one of these:**
- "Save to library"
- "Save it"
- "Happy, save"
- "Approved, save"
- "Looks good, save to library"

**If user says changes needed** → Make changes and go back to Step 4

**If user just says "happy" or "looks good" without "save"** → Ask: "Great! Should I save it to the library?"

### Step 6: Save to Library
**ONLY execute this step after explicit save confirmation from user.**

Run command:
```powershell
cd M:\ClaudeCodeProjects\worksheetgenerator-ai
node -e "const {saveFromFile} = require('./scripts/claude-save-to-library.js'); saveFromFile('public/preview-worksheet.html', {title: '<TITLE>', year_group: '<YEAR>', topic: '<TOPIC>', subtopic: '<SUBTOPIC>', difficulty: '<DIFFICULTY>', question_count: <COUNT>, layout_type: 'standard', tags: [<TAGS>]})"
```

Metadata fields:
- **title**: Descriptive title based on content (e.g., "Counting to 10 - Animals and Fruits")
- **year_group**: reception, year1, year2, year3, year4, year5, year6
- **topic**: From folder name (e.g., "number-counting")
- **subtopic**: From file name (e.g., "counting-to-10")
- **difficulty**: easy, average, hard (based on prompt or default to "average")
- **question_count**: Number of questions in worksheet
- **layout_type**: "standard" (default)
- **tags**: Relevant keywords as array

After successful save, show:
- ✅ Saved confirmation
- Slug
- URL to view: `http://localhost:3000/worksheets/{slug}`

## Available Year Groups
- reception
- year1
- year2
- year3
- year4
- year5
- year6

## Quick Commands

### List available prompts for a year group:
```powershell
Get-ChildItem -Recurse "M:\ClaudeCodeProjects\worksheetgenerator-ai\src\lib\prompts\configurations\{year_group}" -Filter "*-COMPRESSED.md"
```

### Check available images:
```powershell
Get-ChildItem "M:\ClaudeCodeProjects\worksheetgenerator-ai\public\images" -Filter "*.png"
```

### Start dev server (if not running):
```powershell
cd M:\ClaudeCodeProjects\worksheetgenerator-ai; npm run dev
```

## Rules
1. ALWAYS read the prompt file before generating
2. NEVER skip the preview step
3. NEVER save to library without explicit user confirmation
4. ALWAYS use `/images/{object}.png` format for images
5. RANDOMIZE numbers (not sequential like 1,2,3,4,5)
6. Use DIFFERENT objects for each question
7. Follow background color rotation exactly
8. Include answer key with every worksheet

## Example Conversation

**User:** Generate a reception counting worksheet

**Claude:** 
1. Reading prompt from `/src/lib/prompts/configurations/reception/number-counting/counting-to-10-COMPRESSED.md`
2. Generating 5 questions with randomized counts...
3. Saved to `/public/preview-worksheet.html`

Preview at: http://localhost:3000/preview-worksheet.html

Let me know if it looks good or needs changes!

**User:** Looks good

**Claude:** Great! Should I save it to the library?

**User:** Yes, save to library

**Claude:** Saving to library...
✅ Saved!
- Slug: counting-to-10-animals-and-fruits
- URL: http://localhost:3000/worksheets/counting-to-10-animals-and-fruits
