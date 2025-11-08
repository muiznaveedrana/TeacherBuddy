# Worksheet Versioning System

## Overview
When teachers create multiple variations of the same worksheet (same year/topic/subtopic/theme), the system automatically tracks versions to help distinguish between them.

## How It Works

### Backend (Automatic)
1. **Slug Generation** - When saving a worksheet, the system generates a unique URL slug
2. **Collision Detection** - Checks if the slug already exists in the database
3. **Auto-Versioning** - If duplicate found, appends `-v2`, `-v3`, `-v4`, etc.

**Example:**
```
First save:  reception-counting-to-10
Second save: reception-counting-to-10-v2
Third save:  reception-counting-to-10-v3
```

### Frontend (Visual Display)

#### Public Library (`/library`)
- **Version Badge** appears on cards for versions 2+
- **Position:** Bottom-left corner
- **Style:** Amber background with "📝 V2", "📝 V3", etc.
- **Behavior:** Fades out on hover (like other badges)

#### Admin Dashboard (`/admin/library`)
- **Version Badge** appears next to title
- **Style:** Amber badge inline with worksheet title
- **Example Display:** "Reception - Counting to 10 [V2]"

## Why Versions Are Different

Each version contains:
- ✅ **Same concept** (year group, topic, subtopic, theme)
- ❌ **Different questions** (AI-generated variations)
- 🎯 **Different practice sets** for:
  - Multiple sessions
  - Different students (prevent copying)
  - Progressive difficulty
  - A/B testing worksheet formats

## Visual Examples

### Library Card Display
```
┌─────────────────────┐
│  [⭐ NEW]    [Year 3]│
│                     │
│   Worksheet Image   │
│                     │
│  [📝 V2]            │
└─────────────────────┘
Reception - Counting
```

### Admin Table Display
```
Title                          Status    Stats
Reception - Counting to 10     Draft     5 views
Reception - Counting to 10 V2  Published 120 views
Reception - Counting to 10 V3  Draft     2 views
```

## User Experience

### For Teachers:
1. **Generate worksheet** → Save to library
2. **Generate another** (same config) → Save to library
3. **View library** → See both versions with badges:
   - First version: No badge (implied V1)
   - Second version: "V2" badge
   - Easy to distinguish!

### For Students:
- Teachers can assign different versions to different groups
- Prevents copying between students
- Same learning objective, different practice questions

## Technical Implementation

### Files Modified:
1. **`src/lib/services/libraryService.ts`** (lines 405-445)
   - `generateUniqueSlug()` - Auto-versioning logic
   - `slugExists()` - Collision detection

2. **`src/components/WorksheetLibraryBrowser.tsx`** (lines 33-40, 159-164)
   - `extractVersion()` - Parse version from slug
   - Version badge rendering

3. **`src/app/admin/library/page.tsx`** (lines 7-14, 276-282)
   - Version badge in admin table

### Slug Format:
```
{title}-{visual-theme}-{activity-type}-{seasonal-theme}-{layout}-v{number}
```

**Examples:**
- `reception-counting-to-10-with-animals-v2`
- `year3-addition-with-food-circle-answer-v3`
- `reception-shapes-christmas-edition-v2`

## Future Enhancements (Phase 2)

### Grouping
- Group related versions in UI (accordion/tabs)
- Show "3 variations available" on card
- Click to expand and see all versions

### Quick Actions
- "Generate Another Version" button on detail page
- "Compare Versions" side-by-side view
- "Download All Versions" bundle

### Analytics
- Track which versions are most downloaded
- A/B testing metrics per version
- Teacher feedback on version effectiveness

## Benefits

✅ **Clear Distinction** - No more identical-looking worksheets
✅ **Professional** - Familiar A/B/C versioning system
✅ **Scalable** - Handles unlimited versions
✅ **SEO-Friendly** - Each version has unique URL
✅ **User-Friendly** - Visual badges make versions obvious
✅ **Automatic** - No manual work required

## FAQ

**Q: What if I want to delete all versions?**
A: Use Admin Dashboard → Delete each version individually

**Q: Can I rename versions (V2 → "Practice Set A")?**
A: Not yet - Phase 2 enhancement

**Q: How do I know which version I downloaded before?**
A: Check browser download history or library "Downloaded" filter (Phase 2)

**Q: Will versions have different thumbnails?**
A: Yes! Each version has different questions → different screenshot

**Q: What's the maximum number of versions?**
A: 100 versions (safety limit), then falls back to timestamp suffix
