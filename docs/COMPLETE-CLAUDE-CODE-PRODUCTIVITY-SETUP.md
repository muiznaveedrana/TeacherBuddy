# 🚀 COMPLETE CLAUDE CODE PRODUCTIVITY SETUP

Based on research from 20+ sources, here's everything you need to maximize Claude Code productivity.

---

## 📦 QUICK INSTALL: Best Proven Configurations

### Option 1: Everything Claude Code (Hackathon Winner) ⭐

```bash
# Plugin installation
/plugin marketplace add affaan-m/everything-claude-code
/plugin install everything-claude-code@everything-claude-code

# Manual rules (required)
git clone https://github.com/affaan-m/everything-claude-code.git
cp -r everything-claude-code/rules/* ~/.claude/rules/
```

**Includes:** 15 agents, 30 skills, 20 commands

### Option 2: Claude Code Templates (400+ components)

```bash
npx claude-code-templates@latest
```

### Option 3: Official Skills

```bash
npx skills add anthropic/document-creation
npx skills add vercel/nextjs
npx skills add stripe/payments
```

---

## 📋 OPTIMAL CLAUDE.md TEMPLATE

Create this at your project root:

```markdown
# Project: [Your Project Name]

## Build & Test Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run lint` - Run linter

## Project Structure
- `/src` - Main source code
- `/tests` - Test files
- `/docs` - Documentation

## Code Conventions
- Use TypeScript strict mode
- Use ES modules, not CommonJS
- Functional components with hooks (React)
- Follow existing patterns in codebase

## Important Rules
- KISS: Keep It Simple, Stupid
- YAGNI: You Ain't Gonna Need It
- Always write tests for new features
- Never commit secrets or .env files
- Use descriptive commit messages

## Workflow
1. Plan before coding (use Plan Mode)
2. Write tests first (TDD)
3. Implement feature
4. Review and refactor
5. Commit with clear message

## Known Issues / Gotchas
- [Add issues Claude keeps making here]
- [Update this file when Claude does something wrong]
```

**Pro tip from Boris Cherny:** Keep CLAUDE.md around 2.5k tokens. Add learnings whenever Claude makes mistakes.

---

## ⚡ ESSENTIAL SLASH COMMANDS

### Must-Have Commands (create in `.claude/commands/`)

#### 1. `/primer.md` - Project Onboarding

```markdown
Read the project structure and understand the codebase:
1. Run `tree -L 2` to see directory structure
2. Read CLAUDE.md for project rules
3. Read README.md for project overview
4. Summarize key architectural decisions
```

#### 2. `/plan.md` - Implementation Planning

```markdown
Before implementing $ARGUMENTS:
1. Analyze the requirement
2. Research existing patterns in codebase
3. Create a detailed step-by-step plan
4. List files that will be modified
5. Identify potential risks
6. Wait for approval before coding
```

#### 3. `/tdd.md` - Test-Driven Development

```markdown
For feature: $ARGUMENTS
1. Write failing tests first
2. Implement minimum code to pass
3. Refactor for clarity
4. Ensure all tests pass
5. Add edge case tests
```

#### 4. `/review.md` - Code Review

```markdown
Review the changes:
1. Check for bugs and edge cases
2. Verify security (no secrets, SQL injection, XSS)
3. Ensure tests exist and pass
4. Check code style consistency
5. Suggest improvements
```

#### 5. `/commit.md` - Smart Commit

```markdown
1. Run tests to ensure nothing is broken
2. Stage appropriate files (not .env or secrets)
3. Write descriptive commit message
4. Create commit
```

#### 6. `/fix-github-issue.md` - Auto Fix Issues

```markdown
For issue $ARGUMENTS:
1. Use gh issue view to understand the issue
2. Research the codebase for relevant files
3. Create a fix
4. Write tests
5. Create a pull request
```

#### 7. `/youtube.md` - YouTube Research

```markdown
For channel $ARGUMENTS:
1. Fetch 20 recent videos using yt-dlp
2. Analyze top 10 by views
3. Identify winning content patterns
4. Suggest next video idea
```

#### 8. `/generate-prp.md` - Product Requirement Prompt

```markdown
For feature $ARGUMENTS:
1. Research the requirement
2. Analyze existing patterns
3. Generate comprehensive implementation prompt
4. Include all context needed for single-shot implementation
```

#### 9. `/execute-prp.md` - Execute PRP

```markdown
1. Read the generated PRP
2. Follow instructions exactly
3. Implement the entire feature
4. Write tests
5. Verify functionality
```

#### 10. `/refactor.md` - Code Refactoring

```markdown
For file or component $ARGUMENTS:
1. Analyze current implementation
2. Identify code smells
3. Plan refactoring steps
4. Refactor while maintaining functionality
5. Ensure all tests pass
```

---

## 🤖 PROVEN AGENTS (create in `.claude/agents/`)

### 1. `planner.md` - Feature Planning

```markdown
---
name: Planner
description: Plans feature implementation
tools: Read, Glob, Grep
---
You are a senior architect. Your job is to:
1. Understand the requirement fully
2. Research the existing codebase
3. Create a detailed implementation plan
4. Identify risks and edge cases
5. Never write code - only plan
```

### 2. `tdd-guide.md` - TDD Expert

```markdown
---
name: TDD Guide
description: Ensures test-driven development
tools: Read, Write, Edit, Bash
---
You follow strict TDD methodology:
1. Write failing test first
2. Write minimum code to pass
3. Refactor
4. Never skip tests
```

### 3. `code-reviewer.md` - Quality Reviewer

```markdown
---
name: Code Reviewer
description: Reviews code for quality and security
tools: Read, Glob, Grep
---
Review code for:
1. Bugs and logic errors
2. Security vulnerabilities
3. Performance issues
4. Code style consistency
5. Missing tests
```

### 4. `refactor-cleaner.md` - Code Cleaner

```markdown
---
name: Refactor Cleaner
description: Removes dead code and improves structure
tools: Read, Write, Edit, Grep
---
Your job is to:
1. Find unused imports/variables
2. Remove dead code
3. Simplify complex functions
4. Improve naming
5. Maintain all existing functionality
```

### 5. `security-reviewer.md` - Security Agent

```markdown
---
name: Security Reviewer
description: Analyzes code for vulnerabilities
tools: Read, Glob, Grep
---
Check for:
1. SQL injection vulnerabilities
2. XSS vulnerabilities
3. Exposed secrets or credentials
4. Insecure dependencies
5. Authentication/authorization issues
```

### 6. `doc-updater.md` - Documentation Agent

```markdown
---
name: Doc Updater
description: Keeps documentation in sync with code
tools: Read, Write, Edit, Glob
---
Your job is to:
1. Update README when features change
2. Keep API docs current
3. Update inline comments
4. Ensure examples work
5. Add missing documentation
```

### 7. `e2e-runner.md` - E2E Testing Agent

```markdown
---
name: E2E Runner
description: Runs and fixes E2E tests
tools: Read, Write, Edit, Bash
---
Your job is to:
1. Run Playwright E2E tests
2. Analyze failures
3. Fix broken tests
4. Add new test coverage
5. Ensure all tests pass
```

### 8. `build-error-resolver.md` - Build Error Agent

```markdown
---
name: Build Error Resolver
description: Fixes build and compilation errors
tools: Read, Write, Edit, Bash, Grep
---
When build fails:
1. Analyze error messages
2. Identify root cause
3. Apply fix
4. Verify build succeeds
5. Run tests to ensure no regression
```

### 9. `architect.md` - System Design Agent

```markdown
---
name: Architect
description: Makes system design decisions
tools: Read, Glob, Grep
---
Your role is to:
1. Evaluate architectural options
2. Consider scalability
3. Plan for maintainability
4. Document decisions
5. Recommend patterns
```

### 10. `continuous-learner.md` - Pattern Learning Agent

```markdown
---
name: Continuous Learner
description: Extracts patterns from sessions
tools: Read, Write
---
After each session:
1. Identify successful patterns
2. Note what worked well
3. Document learnings
4. Update CLAUDE.md with insights
5. Improve future sessions
```

---

## 🪝 ESSENTIAL HOOKS (in `settings.json`)

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": { "tool_name": "Write" },
        "command": "npm run lint --fix $FILE"
      },
      {
        "matcher": { "tool_name": "Edit" },
        "command": "npm run lint --fix $FILE"
      }
    ],
    "PreToolUse": [
      {
        "matcher": { "tool_name": "Bash", "command": "rm -rf" },
        "action": "block",
        "message": "Blocked: rm -rf is dangerous"
      },
      {
        "matcher": { "tool_name": "Bash", "command": "sudo" },
        "action": "block",
        "message": "Blocked: sudo not allowed"
      }
    ]
  },
  "permissions": {
    "allow": [
      "npm test",
      "npm run",
      "npx",
      "git status",
      "git diff",
      "git log",
      "git branch"
    ],
    "deny": [
      "rm -rf",
      "sudo",
      "curl | bash",
      "wget | bash"
    ]
  }
}
```

---

## 🔌 TOP MCP SERVERS

| Server | Purpose | Install |
|--------|---------|---------|
| **Context7** | Latest docs for libraries | `npx skills add upstash/context7` |
| **Playwright** | Browser testing | Already configured |
| **Supabase** | Database queries | `npx skills add supabase/postgres` |
| **GitHub** | Issue/PR management | Built-in |
| **Exa Search** | Real-time web data | `npx skills add exa/search` |
| **Stripe** | Payment integration | `npx skills add stripe/payments` |
| **Vercel** | Next.js best practices | `npx skills add vercel/nextjs` |

---

## 🧠 BORIS CHERNY'S WORKFLOW (Creator of Claude Code)

1. **Use Plan Mode first** (`Shift+Tab` 2x)
2. **Iterate on plan** until satisfied
3. **Switch to auto-accept** mode
4. **Use slash commands** for repetitive tasks
5. **Run 5+ Claude instances** in parallel
6. **Update CLAUDE.md** when Claude makes mistakes
7. **Use `/commit-push-pr`** command daily

**His Stats:** 259 PRs in 30 days, 497 commits, 40k lines added

**Key Quote:** "If my goal is to write a Pull Request, I will use Plan mode, and go back and forth with Claude until I like its plan. From there, I switch into auto-accept edits mode and Claude can usually 1-shot it. A good plan is really important!"

---

## ⌨️ KEYBOARD SHORTCUTS CHEATSHEET

| Shortcut | Action |
|----------|--------|
| `Shift+Tab` (2x) | Toggle Plan Mode |
| `Esc` (2x) | Rewind to checkpoint |
| `Ctrl+R` | Search prompt history |
| `Ctrl+S` | Stash current prompt |
| `Ctrl+B` | Background task |
| `Alt+P` / `Option+P` | Switch model |
| `Ctrl+O` | Toggle verbose mode |
| `Tab` | Accept suggestion |
| `!` prefix | Run bash instantly |

---

## 🧠 THINKING MODES

| Mode | Trigger | Use Case |
|------|---------|----------|
| **Plan Mode** | `Shift+Tab` 2x | Research without coding |
| **Think Hard** | Keyword in prompt | Extended reasoning |
| **Ultra Think** | Keyword in prompt | Up to 32k tokens for complex decisions |

---

## 📚 GITHUB REPOS TO PULL FROM

| Repository | What You Get |
|------------|--------------|
| [everything-claude-code](https://github.com/affaan-m/everything-claude-code) | 15 agents, 30 skills, 20 commands |
| [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) | Curated list of best resources |
| [awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) | 200+ skills from official teams |
| [claude-code-tips](https://github.com/ykdojo/claude-code-tips) | 45 productivity tips |
| [claude-code-templates](https://github.com/davila7/claude-code-templates) | 400+ components |
| [anthropics/skills](https://github.com/anthropics/skills) | Official Anthropic skills |
| [claude-code-hooks-mastery](https://github.com/disler/claude-code-hooks-mastery) | Complete hooks tutorial |
| [awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) | 100+ specialized subagents |

---

## 🎥 RECOMMENDED YOUTUBE VIDEOS

| Video | Creator | Topics |
|-------|---------|--------|
| Complete Guide to Claude Code | Cole Medin | All strategies, context engineering |
| 800+ Hours in 8 Minutes | Edmund Yong | MCP servers, subagents, plugins |
| Claude Code Beginner Tutorial | Peter Yang | Installation, Plan Mode, CLAUDE.md |
| 5 MCP Servers for Vibe Coding | Sean Kochel | Context7, Taskmaster, Exa |
| 13 Claude Code Tips & Tricks | Matt Maher | Workflow modes, custom commands |
| How I Make Claude Code Cook | Matt Maher | Project goals, automation |
| Claude Code Hooks Deep Dive | IndyDevDan | All 8 hook types, observability |

---

## ✅ QUICK SETUP CHECKLIST

```bash
# 1. Clone everything-claude-code
git clone https://github.com/affaan-m/everything-claude-code.git

# 2. Copy configurations
cp -r everything-claude-code/rules/* ~/.claude/rules/
cp -r everything-claude-code/.claude/commands ~/.claude/commands
cp -r everything-claude-code/.claude/agents ~/.claude/agents
cp -r everything-claude-code/.claude/skills ~/.claude/skills

# 3. Create project CLAUDE.md (use template above)

# 4. Set up permissions
claude /permissions

# 5. Initialize project
claude /init

# 6. Start with Plan Mode
# Press Shift+Tab twice before any task
```

---

## ⚠️ COMMON MISTAKES TO AVOID

1. **Skipping Plan Mode** - Always plan before coding
2. **Auto-approving `rm -rf`** - Block dangerous commands
3. **Ignoring `/context`** - Monitor token usage
4. **Defining agents by roles** - Use tasks instead
5. **Repeating instructions** - Put them in CLAUDE.md
6. **Assuming subagents share context** - They don't
7. **Context pollution** - Use separate conversations per topic

---

## 💡 PRODUCTIVITY SECRETS

1. **Fresh Context** - Start new conversations for better performance
2. **Proactive Compaction** - Use `/compact` before context gets too large
3. **Prompt Stashing** - `Ctrl+S` to save drafts for later
4. **Voice Input** - Use SuperWhisper or MacWhisper for faster input
5. **Break Down Problems** - Divide complex tasks into subtasks
6. **Parallel Instances** - Run multiple Claudes on different tasks
7. **Git Worktrees** - Isolate parallel work on different branches

---

## 🔄 ADVANCED TECHNIQUES

### PRP Framework (Cole Medin)

1. **Define** - Create `initial.md` with requirements
2. **Generate** - Run `/generate-prp` to create comprehensive prompt
3. **Execute** - Run `/execute-prp` for single-shot implementation

### Git Worktrees for Parallel Work

```bash
git worktree add ../feature-branch feature-branch
```

- Run multiple Claude instances on different branches
- Complete isolation between tasks
- Pick best implementation to merge

### Infinite Agentic Loop

- Higher-order prompts (prompts into prompts)
- Spawns waves of 5 subagents
- Generates unlimited solution variations
- Self-evaluates remaining context

### Dev Containers + YOLO Mode

```bash
claude --dangerously-skip-permissions
```

- Run inside Docker for safety
- Full autonomy in isolated environment
- Firewall to approved websites only

---

## 📖 NOTEBOOK REFERENCE

This guide is also available in NotebookLM:
- **Notebook:** COMPLETE CLAUDE CODE PRODUCTIVITY SETUP
- **ID:** `dd55f463-a736-41c2-8345-18c29f24a7a6`

Query the notebook:
```bash
nlm query notebook dd55f463-a736-41c2-8345-18c29f24a7a6 "your question"
```

---

*Last updated: February 2026*
*Sources: 20+ YouTube videos, GitHub repositories, and official documentation*
