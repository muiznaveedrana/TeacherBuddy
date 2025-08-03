# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TeacherBuddy is a Next.js application integrated with Supabase for backend services and deployed to Vercel. The project is currently in early development with minimal codebase.

## Development Commands

Based on the GitHub workflows, the following npm commands are expected to be available:

- `npm ci` - Install dependencies (preferred over npm install in CI/CD)
- `npm run lint` - Run linting checks
- `npm run type-check` - Run TypeScript type checking
- `npm run test` - Run test suite
- `npm run build` - Build the application for production

## Architecture

### Tech Stack
- **Frontend**: Next.js (Node.js 18+)
- **Backend**: Supabase (PostgreSQL database with real-time features)
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions

### Environment Configuration
The application requires the following environment variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL (public)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key (public)
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (private, build-time only)

### Deployment
- Automatic deployment to Vercel on pushes to `main` or `master` branches
- Pull requests trigger preview deployments
- Requires Vercel integration secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`

## Development Workflow

1. The project follows standard Next.js conventions
2. All code changes should pass linting and type checking before commit
3. CI/CD pipeline runs on both pushes and pull requests to main/master branches
4. Supabase integration suggests this is likely an educational platform with user authentication and data persistence

## Notes

- Project is in early development stage with only basic HTML file present
- GitHub workflows indicate a full-stack application setup despite minimal current codebase
- Uses npm as package manager (not yarn or pnpm based on workflow configuration)