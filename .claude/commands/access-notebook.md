# Access NotebookLM

Connect to NotebookLM via MCP server.

## Steps

1. First try `mcp__notebooklm__notebook_list` to check if auth works
2. If auth error, run this recovery sequence:

```bash
# Step 1: Delete stale auth files
powershell -Command "Remove-Item 'C:\Users\muizn\.notebooklm-mcp-cli\profiles\default\cookies.json' -Force -ErrorAction SilentlyContinue; Remove-Item 'C:\Users\muizn\.notebooklm-mcp-cli\auth.json' -Force -ErrorAction SilentlyContinue"

# Step 2: Get fresh tokens
notebooklm-mcp-auth

# Step 3: Reload tokens into running MCP server
# Use: mcp__notebooklm__refresh_auth

# Step 4: Verify access
# Use: mcp__notebooklm__notebook_list
```

## Root Cause
Two auth systems exist (`auth.json` vs `profiles/default/cookies.json`). Deleting both and refreshing ensures sync.

## Important
NEVER add `NOTEBOOKLM_COOKIES_PATH` env var to `.mcp.json` — it overrides default behavior and causes auth mismatch.

## Available Notebooks
- "Claude-Code-WorkFlow" (46 sources)
- "COMPLETE CLAUDE CODE PRODUCTIVITY SETUP" (21 sources)
