# Epic 1: Foundation & Authentication Infrastructure

**Epic Goal:** Establish the foundational project infrastructure including Next.js setup, Supabase integration, Google OAuth authentication, user profile management, and basic usage tracking while delivering a minimal viable worksheet generation capability to validate the core AI pipeline and provide immediate user value.

## Story 1.1: Project Setup & Core Infrastructure

As a developer,
I want to set up the Next.js 14 project with essential dependencies and deployment pipeline,
so that I have a solid foundation for building the worksheet generation platform.

**Acceptance Criteria:**
1. Next.js 14+ project created with App Router configuration
2. Tailwind CSS and shadcn/ui components integrated and configured
3. Supabase client initialized with environment variables
4. Vercel deployment pipeline configured with automatic deployments
5. Basic folder structure established (/app, /components, /lib, /types)
6. Package.json includes all required dependencies (Next.js, Tailwind, Supabase, etc.)
7. Environment variables template created for local development
8. Engaging landing page with banner featuring "Start Now" and "Watch Demo" action buttons
9. Landing page includes sections highlighting features and teacher testimonials explaining why teachers love WorksheetGenerator.AI
10. Clean typography optimized for educational use and child-friendly appearance

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

## Story 1.3: Google OAuth Authentication Flow

As a UK primary school teacher,
I want to sign in with my Gmail account,
so that I can access the worksheet generation platform quickly without creating new credentials.

**Acceptance Criteria:**
1. Landing page displays "Sign in with Google" button using shadcn/ui components
2. Google OAuth flow redirects to Google consent screen
3. Successful authentication creates user record in Supabase
4. User is redirected to profile setup page after first authentication
5. Returning users bypass profile setup and go directly to generation interface
6. Sign out functionality clears authentication state and redirects to landing page
7. Authentication state persists across browser sessions
8. Error handling displays user-friendly messages for authentication failures

## Story 1.4: User Profile Setup & Management

As a UK primary school teacher,
I want to set up my profile with Country, Curriculum, and Year/Grade Group,
so that the system can provide relevant worksheet options and remember my preferences.

**Acceptance Criteria:**
1. Profile setup form displays after first-time authentication
2. Country field auto-populated as "England" with option to change
3. Curriculum dropdown shows "UK National Curriculum" as default option
4. Year/Grade Group dropdown shows UK curriculum years (Reception through Year 6)
5. Profile data saves to Supabase profiles table with user relationship
6. Profile can be updated later through settings/profile page
7. Form validation ensures required fields are completed
8. Successful profile creation redirects to worksheet generation interface
9. Last configuration settings (Topic, Subtopic, Difficulty, Question Count, Name List) persist in user profile
10. Configuration persistence enables users to see their previous selections on login
11. Profile includes default name list selection for immediate worksheet generation

## Story 1.5: Basic Usage Tracking System

As the system,
I want to track user worksheet generation counts,
so that usage limits can be enforced in future sprints.

**Acceptance Criteria:**
1. Usage tracking table created in Supabase with user relationships
2. Generation counter increments with each worksheet creation
3. Monthly and daily counters reset automatically at appropriate intervals
4. Usage data is retrievable for display in navigation (prepared for Epic 3)
5. Database functions created for usage queries and resets
6. Usage tracking works independently without affecting generation workflow
7. Historical usage data preserved for analytics
8. Counter increments are atomic and handle concurrent requests

## Story 1.6: Minimal Worksheet Generation (AI Pipeline Validation)

As a UK primary school teacher,
I want to generate a basic math worksheet,
so that I can validate the core AI functionality works as expected.

**Acceptance Criteria:**
1. Simple generation form with basic Topic dropdown (Addition, Subtraction, Multiplication)
2. Difficulty selector with Easy/Average/Hard options
3. Question count selector (5, 10, 15, 20 questions)
4. Integration with Google Gemini API for content generation
5. Generated content displays in HTML format in preview area
6. Basic HTML-to-PDF conversion functionality working
7. Download PDF button provides downloadable worksheet file
8. Generation completes within 10 seconds (will optimize to 5-7s in Epic 2)
9. Generated worksheets contain curriculum-appropriate math problems
10. Error handling for API failures with user-friendly messages