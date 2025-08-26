# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Claude Memories

- yolo
- For all Supabase queries, use `supabase` CLI (global CLI)
- For all Playwright queries, use `playwright` CLI (global CLI)
- When port 3000 is already in use, kill the existing process using that port first, then restart the dev server on port 3000 (rather than moving to a new port) use "npx kill-port 3000"
- use dev environment only