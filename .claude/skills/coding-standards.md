---
name: Coding Standards
description: Enforces project-specific coding standards and conventions
---

# Coding Standards Skill

This skill ensures all code follows project conventions.

## TypeScript/JavaScript Standards

### Naming Conventions
- **Components**: PascalCase (e.g., `WorksheetCard`, `AnswerInput`)
- **Functions**: camelCase (e.g., `handleSubmit`, `fetchWorksheets`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_RETRIES`, `API_BASE_URL`)
- **Files**: kebab-case for pages, PascalCase for components
- **Types/Interfaces**: PascalCase with descriptive names

### Code Organization
- One component per file
- Related utilities in `/lib` or `/utils`
- Types in dedicated `.types.ts` files or co-located
- Constants in `/constants` directory

### Import Order
1. React/Next.js imports
2. Third-party libraries
3. Internal components
4. Internal utilities/hooks
5. Types
6. Styles

### Error Handling
- Always use try-catch for async operations
- Provide meaningful error messages
- Log errors appropriately
- Show user-friendly error states

## React/Next.js Patterns

### Component Structure
```tsx
// 1. Imports
// 2. Types/Interfaces
// 3. Component
// 4. Exports
```

### Hooks Rules
- Custom hooks start with `use`
- Place hooks at top of component
- Never call hooks conditionally

### State Management
- Use local state for component-specific data
- Use context for shared UI state
- Use server state (React Query/SWR) for API data

## Testing Standards

- Test files next to source: `Component.test.tsx`
- E2E tests in `/tests/e2e/`
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)

## Git Commit Standards

- Use conventional commits: `feat:`, `fix:`, `chore:`, `docs:`
- Keep commits atomic and focused
- Write meaningful commit messages
