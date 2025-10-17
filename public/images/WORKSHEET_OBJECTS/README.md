# Worksheet Objects Image Library

**Version**: 1.0.0
**Last Updated**: 2025-10-11
**Total Objects**: 67

## Purpose

This directory contains curated, standardized images for use in AI-generated educational worksheets. All images are organized by curriculum topic and object category for easy access and scalability.

## Directory Structure

```
WORKSHEET_OBJECTS/
├── counting/              # Objects for counting activities (Reception - Year 2)
│   ├── fruits/           # 10 fruit images
│   ├── farm_animals/     # 9 farm animal images
│   ├── garden/           # 9 garden/nature images
│   ├── school_supplies/  # 9 school supply images
│   ├── toys/             # 5 toy images
│   ├── vegetables/       # 7 vegetable images
│   ├── food_treats/      # 2 food/treat images
│   ├── shapes/           # 7 shape images
│   ├── sports/           # 5 sports equipment images
│   └── vehicles/         # 4 vehicle images
├── addition/             # (Future) Addition-specific objects
├── subtraction/          # (Future) Subtraction-specific objects
├── shapes_geometry/      # (Future) Geometry topic objects
├── measurement/          # (Future) Measurement topic objects
└── shared/               # Cross-topic reusable resources

```

## Naming Conventions

### File Naming Rules:
- **Format**: `{object_name}.png`
- **Case**: Lowercase only
- **Spaces**: Use underscores for multi-word objects
- **Examples**:
  - ✅ `apple.png`
  - ✅ `teddy_bear.png`
  - ✅ `tennis_ball.png`
  - ❌ `Apple.png` (uppercase)
  - ❌ `teddy bear.png` (space)

### Path Examples:
```
/images/WORKSHEET_OBJECTS/counting/fruits/apple.png
/images/WORKSHEET_OBJECTS/counting/farm_animals/cow.png
/images/WORKSHEET_OBJECTS/counting/school_supplies/pencil.png
```

## Using Images in Prompts

### For LLM Prompts:
```html
<!-- Simple, predictable paths -->
<img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="80" height="80" alt="Apple" />
```

### Available Objects:
See `_CATALOG.json` for complete list with metadata.

## Quality Standards

All images in this directory must:
1. ✅ Be verified to load correctly in worksheets
2. ✅ Be age-appropriate for target year groups
3. ✅ Be clearly recognizable by children
4. ✅ Have transparent or white backgrounds (preferred)
5. ✅ Be properly licensed (currently using Scrapping Doodles)

## Adding New Objects

### Process:
1. Source or create image following quality standards
2. Name file according to naming conventions
3. Place in appropriate topic/category directory
4. Update `_CATALOG.json` with metadata
5. Test in worksheet generation
6. Mark as verified after successful test

### Required Metadata:
```json
{
  "counting/fruits/new_fruit.png": {
    "name": "new fruit",
    "pluralName": "new fruits",
    "category": "fruits",
    "subcategory": "fruits",
    "topic": "counting",
    "yearGroups": ["Reception", "Year 1"],
    "sourceCollection": "Custom",
    "sourceFile": "new_fruit.png",
    "verified": false,
    "addedDate": "YYYY-MM-DD"
  }
}
```

## Maintenance

- **Verification**: All new objects must pass worksheet quality assessment
- **Updates**: Increment version in `_CATALOG.json` when adding/removing objects
- **Deprecation**: Move deprecated images to `_deprecated/` directory (don't delete)
- **Backup**: Original source images remain in `SCRAPPING DOODLE/` directories

## Source Attribution

Current images sourced from **Scrapping Doodles** collections.
Original collections preserved in `/images/SCRAPPING DOODLE/` directory.

## Questions?

Contact: Development team
Last Review: 2025-10-11
