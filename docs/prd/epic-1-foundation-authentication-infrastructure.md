# Epic 1: Foundation & Authentication Infrastructure

**Epic Goal:** Build upon POC success by implementing Supabase authentication infrastructure, user profile management, and usage tracking systems. This epic integrates the proven worksheet generation engine from Epic POC with real user accounts, replacing mock authentication and profile data while preserving the validated generation workflow.

## Story 1.1: Project Setup & Backend Infrastructure Integration

As a developer,
I want to integrate the backend infrastructure with the UI components from Epic 0,
so that I have a working foundation with real data persistence and authentication.

**Acceptance Criteria:**
1. Next.js 14+ project structure maintained from Epic 0 UI implementation
2. Supabase client initialized with production environment variables
3. Database connection established and tested with local development
4. Vercel deployment pipeline configured with automatic deployments
5. Environment variables configured for all services (Supabase, Google OAuth)
6. Integration of Epic 0 landing page components with real deployment
7. Database schema implemented matching the architecture specification
8. Connection between UI components and backend services established
9. Error handling and logging infrastructure setup
10. Performance monitoring and analytics foundation implemented

## Story 1.2: Supabase Database & Authentication Setup

As a developer,
I want to configure Supabase authentication and database schema,
so that users can securely authenticate and have their data properly stored.

**Acceptance Criteria:**
1. Supabase project created with Google OAuth provider configured
2. Database schema created with users table and profiles table
3. Row-level security policies implemented for user data protection
4. Authentication middleware configured for protected routes
5. Google OAuth consent screen configured for production use
6. Database migrations created and version controlled
7. Supabase Auth hooks configured for profile creation
8. Local development environment connects successfully to Supabase

## Story 1.3: Google OAuth Authentication Integration

As a UK primary school teacher,
I want to sign in with my Gmail account using the interface from Epic 0,
so that I can access the worksheet generation platform with real authentication.

**Acceptance Criteria:**
1. Replace mock Google OAuth from Epic 0 with real Supabase Auth integration
2. Maintain existing "Sign in with Google" UI components and flow
3. Real Google OAuth flow redirects to Google consent screen
4. Successful authentication creates user record in Supabase database
5. User is redirected to real profile setup page after first authentication
6. Returning users bypass profile setup and go to main application interface
7. Real sign out functionality clears authentication state and redirects to landing page
8. Authentication state persists across browser sessions using real tokens
9. Replace mock error states with real error handling and user-friendly messages
10. Integration testing with Google OAuth in development and production environments

## Story 1.4: User Profile Data Integration

As a UK primary school teacher,
I want to set up my profile using the Epic 0 interface with real data persistence,
so that the system can provide relevant worksheet options and remember my preferences.

**Acceptance Criteria:**
1. Replace mock profile setup form from Epic 0 with real Supabase integration
2. Maintain existing UI design and form validation from Epic 0
3. Real profile data saves to Supabase user_profiles table with proper relationships
4. Profile can be updated later through existing settings/profile page interface
5. Form validation integrated with backend validation and error handling
6. Successful profile creation redirects to main worksheet generation interface
7. Last configuration settings (Topic, Subtopic, Difficulty, Question Count, Name List) persist in real database
8. Configuration persistence enables users to see their actual previous selections on login
9. Profile includes real default name list selection for immediate worksheet generation
10. Integration between profile data and main application state management
11. Data migration and update patterns for profile changes

## Story 1.5: Basic Usage Tracking Foundation

As the system,
I want to implement real usage tracking that integrates with Epic 0 usage indicators,
so that usage limits can be enforced and displayed accurately.

**Acceptance Criteria:**
1. Replace mock usage counter from Epic 0 navigation with real Supabase data
2. Usage tracking table created in Supabase with user relationships
3. Real-time usage counter updates in navigation bar
4. Database functions created for usage queries and resets
5. Usage tracking infrastructure prepared for Epic 2 worksheet generation integration
6. Historical usage data structure established for Epic 3 analytics
7. Atomic counter operations handling concurrent requests
8. Integration between usage tracking and existing Epic 0 UI components
9. Usage counter display maintains Epic 0 visual design
10. Foundation for usage limit enforcement in subsequent epics

## Story 1.6: Navigation and State Management Integration

As a UK primary school teacher,
I want the Epic 0 application shell to work with real user data and authentication,
so that I have a complete foundational application experience.

**Acceptance Criteria:**
1. Replace mock user data in Epic 0 navigation with real authenticated user information
2. Real user profile picture and name display in navigation dropdown
3. Working sign out functionality that clears real authentication state
4. Integration between real profile data and navigation display
5. Real subscription tier display replacing mock tier badges
6. State management integration between authentication and UI components
7. Route protection for authenticated vs. unauthenticated users
8. Real loading states replacing mock loading experiences
9. Error handling for authentication and data loading failures
10. Responsive design maintained from Epic 0 while adding real functionality