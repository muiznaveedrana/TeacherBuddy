# Screenshot Capture (Snip)

Capture and display clipboard screenshots.

## Workflow
1. Press `Win + Shift + S` to capture screen region
2. Type `snip` to Claude
3. Screenshot is saved and displayed

## Command
```powershell
powershell -ExecutionPolicy Bypass -File save-snip.ps1
```

This saves the clipboard image as `latest-snip.png` in the project root.

## After Capture
The image will be automatically read and displayed for analysis.

## Use Cases
- Share UI issues visually
- Show worksheet rendering problems
- Capture error states
- Document visual bugs
