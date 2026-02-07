# NotebookLM Authentication Script
# Authenticates and syncs credentials between MCP server and CLI

param(
    [switch]$Force,  # Force re-authentication even if valid
    [switch]$SyncOnly  # Just sync existing auth.json, don't re-auth
)

$ErrorActionPreference = "Stop"

Write-Host "`n=== NotebookLM Authentication ===" -ForegroundColor Cyan

# Paths
$configDir = "$env:USERPROFILE\.notebooklm-mcp-cli"
$authJson = "$configDir\auth.json"
$profileCookies = "$configDir\profiles\default\cookies.json"

# Step 1: Run notebooklm-mcp-auth to get fresh cookies (unless SyncOnly)
if (-not $SyncOnly) {
    Write-Host "`n[1/3] Running authentication (close Chrome if open)..." -ForegroundColor Yellow

    try {
        $authOutput = & notebooklm-mcp-auth 2>&1
        if ($LASTEXITCODE -ne 0) {
            Write-Host "Authentication failed!" -ForegroundColor Red
            Write-Host $authOutput
            exit 1
        }
        Write-Host "Authentication successful!" -ForegroundColor Green
    } catch {
        Write-Host "Error running notebooklm-mcp-auth: $_" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "`n[1/3] Skipping auth (SyncOnly mode)..." -ForegroundColor Yellow
}

# Step 2: Read auth.json and convert to cookies.json format
Write-Host "`n[2/3] Converting credentials..." -ForegroundColor Yellow

if (-not (Test-Path $authJson)) {
    Write-Host "auth.json not found at $authJson" -ForegroundColor Red
    exit 1
}

$auth = Get-Content $authJson | ConvertFrom-Json
$cookies = @()

# Default expiry (1 year from now)
$epoch = [DateTime]::new(1970, 1, 1, 0, 0, 0, [DateTimeKind]::Utc)
$defaultExpiry = [Math]::Floor(((Get-Date).ToUniversalTime().AddYears(1) - $epoch).TotalSeconds)

# Domain mapping for different cookie types
function Get-CookieDomain($name) {
    # NotebookLM-specific cookies
    if ($name -eq "OSID" -or $name -eq "__Secure-OSID") {
        return "notebooklm.google.com"
    }
    # Default to .google.com for most Google auth cookies
    return ".google.com"
}

foreach ($prop in $auth.cookies.PSObject.Properties) {
    $domain = Get-CookieDomain $prop.Name

    $cookie = @{
        name = $prop.Name
        value = $prop.Value
        domain = $domain
        path = "/"
        expires = $defaultExpiry
        size = $prop.Name.Length + $prop.Value.Length
        httpOnly = ($prop.Name -match "^__Secure-|^__Host-|HSID|SSID|LSID|OSID")
        secure = ($prop.Name -match "^__Secure-|SAPISID|SSID")
        session = $false
        priority = "High"
        sameParty = $false
        sourceScheme = "Secure"
        sourcePort = 443
    }

    # Add sameSite for 3P cookies
    if ($prop.Name -match "3P") {
        $cookie["sameSite"] = "None"
    }

    $cookies += $cookie

    # Also add notebooklm.google.com version for key cookies
    if ($domain -eq ".google.com" -and $prop.Name -match "SID|OSID") {
        $nlmCookie = $cookie.Clone()
        $nlmCookie.domain = "notebooklm.google.com"
        $cookies += $nlmCookie
    }
}

# Step 3: Save to profiles directory
Write-Host "`n[3/3] Saving credentials..." -ForegroundColor Yellow

# Create profiles directory if needed
$profileDir = Split-Path $profileCookies
if (-not (Test-Path $profileDir)) {
    New-Item -ItemType Directory -Path $profileDir -Force | Out-Null
}

# Backup existing cookies
if (Test-Path $profileCookies) {
    $backupPath = "$profileCookies.bak"
    Copy-Item $profileCookies $backupPath -Force
    Write-Host "  Backed up existing cookies to cookies.json.bak" -ForegroundColor Gray
}

# Save new cookies (UTF8 without BOM)
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
$cookiesJson = $cookies | ConvertTo-Json -Depth 10
[System.IO.File]::WriteAllText($profileCookies, $cookiesJson, $utf8NoBom)
Write-Host "  Saved $($cookies.Count) cookies to profile" -ForegroundColor Green

# Also update metadata.json (UTF8 without BOM)
$metadataPath = "$profileDir\metadata.json"
$metadata = @{
    profile_name = "default"
    created_at = (Get-Date).ToString("o")
    last_used = (Get-Date).ToString("o")
}
$metadataJson = $metadata | ConvertTo-Json
[System.IO.File]::WriteAllText($metadataPath, $metadataJson, $utf8NoBom)
Write-Host "  Updated metadata.json" -ForegroundColor Green

# Verify
Write-Host "`n=== Verification ===" -ForegroundColor Cyan
Write-Host "Auth JSON:       $authJson" -ForegroundColor Gray
Write-Host "Profile Cookies: $profileCookies" -ForegroundColor Gray
Write-Host "Cookies synced:  $($cookies.Count)" -ForegroundColor Gray

Write-Host "`n=== SUCCESS ===" -ForegroundColor Green
Write-Host "NotebookLM authentication complete!"
Write-Host "Try: nlm notebook list" -ForegroundColor Yellow
