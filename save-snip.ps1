# Quick Screenshot Saver
$outputPath = "M:\ClaudeCodeProjects\worksheetgenerator-ai\latest-snip.png"

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

if ([System.Windows.Forms.Clipboard]::ContainsImage()) {
    $image = [System.Windows.Forms.Clipboard]::GetImage()
    $image.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    Write-Host "[OK] Screenshot saved to latest-snip.png" -ForegroundColor Green
    Write-Host "Tell Claude: check latest-snip.png" -ForegroundColor Cyan
} else {
    Write-Host "[ERROR] No image found in clipboard" -ForegroundColor Red
    Write-Host "Take a snip first (Win+Shift+S), then run this script" -ForegroundColor Yellow
}
