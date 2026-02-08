---
paths:
  - "supabase/**/*"
  - "src/lib/supabase*"
  - "scripts/*supabase*"
  - "scripts/*promote*"
---

# Supabase Rules

- ALWAYS target DEV database, never production directly
- Use `npx supabase` (CLI v2.54.11) for all database operations
- Use migration files for schema changes (never inline SQL in production)
- Test with `npx supabase db execute` before applying
- Never modify RLS policies without review
- Region field: all worksheets default to region='UK' (future-proof for US/AU)
