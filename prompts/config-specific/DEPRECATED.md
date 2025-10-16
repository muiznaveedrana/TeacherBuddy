# ⚠️ THIS DIRECTORY IS DEPRECATED - DO NOT USE!

**Last Updated**: 2025-10-16

---

## 🚨 IMPORTANT: DO NOT ADD FILES HERE!

This directory was created during initial planning but **was never implemented**.

The actual config-specific prompts are located at:

```
src/lib/prompts/configurations/{yearGroup}/{topic}/{subtopic}.md
```

**Example**:
```
src/lib/prompts/configurations/reception/number-counting/counting-to-10.md
```

---

## Why This Directory Exists

During the design phase (October 11, 2025), this directory structure was planned:

```
prompts/config-specific/
└── {configId}-v{version}.ts
```

**However**, the actual implementation uses a different structure:

```
src/lib/prompts/configurations/
└── {yearGroup}/{topic}/{subtopic}.md
```

---

## Impact on Code

The `promptService.ts` file (lines 133-180) still checks this directory **first**:

```typescript
const configDir = path.join(process.cwd(), 'prompts', 'config-specific')
if (fs.existsSync(configDir)) {
  // This check ALWAYS fails because directory is empty
  // Falls through to the REAL location below...
}
```

Then it falls back to the **actual location** (lines 183-213):

```typescript
const oldPromptPath = path.join(
  process.cwd(),
  'src', 'lib', 'prompts', 'configurations',
  normalizedYear, normalizedTopic,
  `${normalizedSubtopic}.md`
)
// This is what ACTUALLY works!
```

---

## What Should You Do?

**If you need to add/edit config-specific prompts**:

1. ✅ Navigate to: `src/lib/prompts/configurations/`
2. ✅ Create subdirectories: `{yearGroup}/{topic}/`
3. ✅ Add `.md` file: `{subtopic}.md`
4. ❌ DO NOT add files to `prompts/config-specific/`!

**If you're confused about the architecture**:

1. Read `ARCHITECTURE.md` in the project root
2. Run `node scripts/verify-architecture.js` to see what's actually in use
3. Check actual generated worksheets in `worksheet-quality-reports/`

---

## Future Actions

**Option A**: Delete this directory entirely
- Pro: Eliminates confusion
- Con: Breaks backward compatibility if any external scripts reference it

**Option B**: Keep as documentation (current approach)
- Pro: Explains why directory exists
- Con: Still confusing to see an empty directory

**Option C**: Remove the check from `promptService.ts`
- Pro: Code matches reality
- Con: Requires code changes and testing

---

## Verification

To verify the correct location is being used:

```bash
# Check what prompts actually exist
find src/lib/prompts/configurations -name "*.md"

# Check what this directory contains (should be empty)
ls prompts/config-specific/

# Check actual generated worksheets
grep -o "src.*images/[^\"]*" worksheet-quality-reports/autonomous-sessions/*/cycle-1-results.json | head -20
```

---

**See**: `ARCHITECTURE.md` for complete system documentation
