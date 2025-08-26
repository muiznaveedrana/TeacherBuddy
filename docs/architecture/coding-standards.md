# Coding Standards

## Critical Fullstack Rules

- **Type Sharing:** Always define shared types in `lib/types/` and import consistently across frontend and backend to prevent API contract mismatches
- **API Calls:** Never make direct fetch calls from components - use service layer functions from `lib/services/` for consistent error handling and request formatting
- **Environment Variables:** Access only through config objects in `lib/config/`, never `process.env` directly in components to enable runtime validation and defaults
- **Error Handling:** All API routes must use standardized error response format with consistent status codes and error message structure
- **State Updates:** Never mutate Zustand state directly - use store actions to maintain predictable state transitions and enable debugging
- **Database Access:** Always use repository pattern from `lib/repositories/` rather than direct Supabase calls to abstract data access logic
- **Authentication Guards:** All protected routes and API endpoints must use `requireAuth()` middleware for consistent security enforcement
- **Input Validation:** Use Zod schemas defined in `lib/utils/validation.ts` for both frontend forms and API route validation to maintain data consistency

## Naming Conventions

| Element | Frontend | Backend | Example |
|---------|----------|---------|---------|
| Components | PascalCase | - | `ConfigurationPanel.tsx` |
| Hooks | camelCase with 'use' | - | `useWorksheetGeneration.ts` |
| API Routes | - | kebab-case | `/api/worksheets/generate` |
| Database Tables | - | snake_case | `worksheet_generations` |
| Service Functions | camelCase | camelCase | `generateWorksheet()` |
| Store Actions | camelCase | - | `updateConfiguration()` |
| Type Interfaces | PascalCase | PascalCase | `WorksheetConfig` |
| Constants | SCREAMING_SNAKE_CASE | SCREAMING_SNAKE_CASE | `MAX_QUESTION_COUNT` |
| CSS Classes | kebab-case | - | `configuration-panel` |
| Environment Variables | SCREAMING_SNAKE_CASE | SCREAMING_SNAKE_CASE | `GEMINI_API_KEY` |