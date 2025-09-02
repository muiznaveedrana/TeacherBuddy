# WorksheetGenerator.AI Product Requirements Document (PRD)

## Goals and Background Context

### Goals
- Transform worksheet creation from 2-3 hour manual process to 10-15 second AI-generated output
- Achieve 2,500 registered users by Month 6, growing to 10,000 users by Month 12  
- Generate £15,000 MRR by Month 12 through freemium conversion and AdSense revenue
- Deliver 90%+ reduction in teacher worksheet creation time with 85%+ curriculum alignment satisfaction
- Establish market penetration of 0.5% of UK primary teacher market (200,000 teachers) within first year
- Achieve 15% free-to-paid conversion rate and 70%+ monthly active user retention

### Background Context
WorksheetGenerator.AI addresses the critical time-waste problem where UK primary school teachers spend 2-3 hours weekly creating math worksheets manually - representing over 400,000 hours weekly across 200,000 teachers. The platform leverages AI to instantly generate curriculum-aligned math worksheets through an intuitive interface, transforming this repetitive content creation task into a 10-15 second process. With post-COVID learning gaps intensifying pressure for differentiated materials and teacher burnout at historic highs, the solution provides UK National Curriculum-compliant worksheets while generating revenue through a freemium SaaS model with strategic AdSense integration.

### Change Log
| Date | Version | Description | Author |
|------|---------|-------------|---------|
| 2025-01-08 | 1.0 | Initial PRD creation from Project Brief | PM |

## Requirements

### Functional Requirements

**FR1:** The system shall authenticate users via Google OAuth (Gmail login) and redirect to worksheet generation interface upon successful authentication.

**FR2:** The system shall collect and store user profile data including Country (auto-populated as UK), Curriculum (show UK National Curriculums), and Year Group (Reception, Year 1-6) during onboarding, with Year Group being mandatory for curriculum-appropriate worksheet generation.

**FR3:** The system shall provide a two-column worksheet generation interface with configuration controls (Topic dropdown, Subtopic dropdown, Worksheet Type, Question Count selector, Difficulty Level: Easy/Average/Hard), name list (default name list selected) (new name list creation button with info icon telling that you provide list of names which will be used in questions) in the left panel.

**FR4:** The system shall use user profile Year Group (mandatory) and configuration options to craft curriculum-specific prompts. The system shall generate age-appropriate, curriculum-aligned math worksheets using AI (Google Gemini API) within 5-7 seconds. The Year Group from profile must be displayed and editable in worksheet configuration to ensure content matches specific year level (e.g., "Year 3" not "Primary Years 1-6"). The system shall convert AI-generated HTML content to professional PDF format and display preview in the right panel.

**FR5:** The system shall enforce usage limits based on subscription tier: Free (30 worksheets/month + ads), Pro (90 worksheets/month @ £2.99), Pro Plus (150 worksheets/month).

**FR6:** The system shall provide download functionality for the pdf.

**FR7:** The system shall display AdSense advertisements in navigation banner and right panel during generation, hidden during preview/download.

**FR8:** The system shall track monthly and daily worksheet generation counters visible in navigation and prevent generation when limits exceeded.

**FR9:** The system shall provide regeneration functionality when users modify configuration parameters.

**FR10:** The system shall integrate Stripe for subscription management and payment processing for Pro and Pro Plus tiers.

**FR12:** The system shall enforce Year Group selection before allowing worksheet generation. Users who skip profile setup must select Year Group in worksheet configuration before proceeding. The system shall validate Year Group selection and display age-appropriate curriculum contexts in generated worksheets.

**FR11:** The system shall persist the last configuration settings (including Year Group from profile) so whenever user logs in they see their last selection. Year Group should default from profile but be editable in worksheet generation interface. Whenever configuration is changed by user, preview section will empty, download button will disappear, right panel shows ads, and bottom button shows "Generate" instead of "Regenerate". 

### Non-Functional Requirements

**NFR1:** The system shall maintain 99% uptime during UK school hours (8am-4pm GMT) with support for 500+ concurrent users.

**NFR2:** The system shall achieve page load times under 3 seconds and worksheet generation within 5-7 seconds maximum.

**NFR3:** The system shall maintain responsive design compatibility across modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+).

**NFR4:** The system shall ensure curriculum alignment accuracy of 85%+ user satisfaction rating for generated content.

**NFR5:** The system shall implement row-level security via Supabase for user data protection and GDPR compliance.

**NFR6:** The system shall scale to process 1,000+ worksheet generations daily with consistent performance.

**NFR7:** The system shall maintain API key security through environment variables and secure credential management.

**NFR8:** The system shall optimize AdSense integration to generate £0.15-0.50 per free user monthly without UX disruption.

## User Interface Design Goals

### Overall UX Vision
Clean, focused interface optimized for time-pressed teachers during limited planning periods. The design prioritizes speed and simplicity with a two-column layout that separates configuration controls from content preview, reducing cognitive load while maintaining full functionality. The interface follows a "progressive disclosure" pattern where complexity is hidden until needed, allowing teachers to generate worksheets with minimal clicks while providing access to advanced options when required.

### Key Interaction Paradigms
**Dropdown-Driven Configuration:** All worksheet parameters (Topic, Subtopic, Difficulty, Question Count) use closed-input controls to eliminate guesswork and ensure valid combinations. This approach reduces decision fatigue while providing precise control.

**Instant Preview System:** Generated worksheets appear immediately in the right panel with clear visual hierarchy between ads (during generation), preview content, and download actions.

**Contextual Ad Integration:** AdSense placement strategy that maximizes revenue during "wait time" (generation phase) while completely hiding ads during preview/download to maintain professional appearance.

### Core Screens and Views
**Landing Page:** Clean homepage with About/Pricing/Start Now layout optimized for teacher decision-making during brief research sessions.
This should have an engaing banner with information about the worksheetgenerator tow action buttons "Star Now" and "Watch Demo" and other sections that tell about features and Why teacher loves the worksheet generator

**Authentication Flow:** Seamless Gmail OAuth integration with minimal steps to reduce friction for school-managed or individual Google accounts.

**Worksheet Generation Interface:** Primary application screen with two-column layout - left panel configuration controls, right panel for ads/preview. at the bottom of configurations , there will be two buttons "Generate" and "Download" next to each other. Generate button will change to regenrate based on configuration setting change and Download button will only appear if the right pane is showing pdf in preview

**User Profile/Settings:** Basic account management with subscription status, usage counters, and profile updates (Country, Curriculum, Year Group).

**Subscription Management:** Stripe-integrated billing interface for Pro/Pro Plus tier management and payment processing.

### Accessibility: WCAG AA
Full WCAG 2.1 AA compliance to ensure accessibility for teachers with disabilities and to meet UK public sector accessibility requirements. Includes keyboard navigation, screen reader compatibility, sufficient color contrast ratios, and alternative text for all interactive elements.

### Branding
Professional, trustworthy design aesthetic that conveys educational authority while maintaining approachability. Clean and child friendly typography that can be used for educational purpose, consistent spacing, and a color palette that works well with worksheet content without being distracting. Brand identity should communicate "reliable educational tool" rather than "flashy consumer app."

### Target Device and Platforms: Web Responsive
**Primary Platform:** Desktop/laptop web browsers (primary teacher workflow during planning sessions)
**Secondary Support:** Tablet-responsive design for classroom use and mobile-responsive for quick access
**Browser Compatibility:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ with 99.5% UK teacher compatibility

## Technical Assumptions

### Repository Structure: Monorepo
Single Next.js project with integrated Supabase client, maintaining minimal complexity while supporting full-stack development. This approach reduces deployment complexity and enables rapid development with Claude Code assistance.

### Service Architecture
**Next.js Full-Stack Monolith:** Thin business layer architecture following the pipeline: configuration → prompt engineering → Gemini API → HTML → PDF conversion. Next.js API routes handle authentication, subscription management, and AI integration while Supabase manages data persistence and real-time subscriptions.

**Key Architecture Components:**
- **Frontend:** Next.js 14+ App Router with Tailwind CSS and shadcn/ui components
- **Backend:** Next.js API routes for AI integration and business logic
- **Database:** Supabase PostgreSQL with built-in authentication and row-level security
- **AI Generation:** Google Gemini API for curriculum-aligned worksheet content
- **PDF Conversion:** use Puppeteer for high quality A4 HTML-to-PDF in serverless functions

### Testing Requirements
**Unit + Integration Testing:** Comprehensive testing approach including unit tests for utility functions, integration tests for AI generation pipeline, and end-to-end testing for critical user workflows (authentication, worksheet generation, subscription management). Manual testing convenience methods for curriculum alignment validation and PDF output quality assurance.

### Additional Technical Assumptions and Requests

**Authentication & Security:**
- Supabase Auth with Google OAuth provider for seamless Gmail integration
- Environment variables for API keys (Gemini, Stripe, Supabase)
- Row-level security policies for user data protection and GDPR compliance

**Performance & Scalability:**
- Vercel deployment for automatic scaling and global CDN distribution
- 5-7 second worksheet generation target requires optimized prompt engineering and API response handling
- HTML-to-PDF conversion must maintain formatting quality while meeting performance targets

**Third-Party Integrations:**
- Google Gemini API for AI content generation with curriculum-specific prompt templates
- Stripe integration for subscription management and payment processing
- AdSense integration with strategic placement optimization
- Supabase real-time subscriptions for usage counter updates

**Development & Deployment:**
- Single developer workflow optimized for rapid iteration with Claude Code
- Streamlined tech stack (shadcn/ui, Supabase templates) to minimize design complexity
- Bootstrap development approach with £2,500 initial investment constraint

## Epic List

**Epic 0: UI Component Library & Mockups** *(COMPLETED)*
Create a complete, professional UI component library with realistic mock data for all WorksheetGenerator.AI interfaces, establishing the visual design system and user experience flows before implementing backend integration in subsequent epics.

**Epic POC: Core Worksheet Generation Proof of Concept**
Implement the heart of the application - AI-powered worksheet generation with professional PDF output - while maintaining all existing Epic 0 mock data interactions. This POC validates the core value proposition and technical feasibility before building authentication and business model features.

**Epic 1: Foundation & Authentication Infrastructure** 
Build upon POC success by implementing Supabase authentication, user profiles, and usage tracking infrastructure, integrating with the proven worksheet generation engine from the POC Epic.

**Epic 2: Enhanced Worksheet Generation Engine**
Expand the proven POC worksheet generation system with comprehensive UK National Curriculum taxonomy, advanced customization options, and performance optimization, building on the validated core generation pipeline.

**Epic 3: Subscription & Usage Management System**
Integrate the complete three-tier freemium business model, replacing mock usage counters with real Stripe integration and automated usage limit enforcement, leveraging the established worksheet generation and user infrastructure.

**Epic 4: AdSense Integration & Revenue Optimization**
Integrate real AdSense advertising with intelligent placement optimization for £0.15-0.50 per free user monthly revenue target, completing the monetization strategy for the validated worksheet generation platform.

## Epic 0: UI Component Library & Mockups

**Epic Goal:** Create a complete, professional UI component library with realistic mock data for all WorksheetGenerator.AI interfaces, establishing the visual design system and user experience flows before implementing backend integration in subsequent epics. This foundational epic ensures consistent design, enables early user testing, and provides a solid foundation for parallel frontend/backend development.

## Epic POC: Core Worksheet Generation Proof of Concept

**Epic Goal:** Implement the heart of the application - AI-powered worksheet generation with professional PDF output - while maintaining all existing Epic 0 mock data interactions. This POC validates the core value proposition (2-3 hour manual process to 10-15 second AI-generated output) and proves technical feasibility of 5-7 second generation times with curriculum-aligned content before investing in authentication, subscriptions, and business model features.

### Story POC.1: AI-Powered Worksheet Generation Pipeline

As a UK primary school teacher,
I want to generate curriculum-aligned math worksheets using AI with the existing mock interface,
so that I can validate the core worksheet generation functionality works with real PDF output while maintaining familiar configuration options.

**Acceptance Criteria:**
1. Google Gemini API integration configured with environment variables and error handling
2. Mock data (topics, subtopics, difficulty levels) feeds into AI prompt generation system
3. Curriculum-aligned prompt templates generate UK National Curriculum appropriate content
4. Student names from selected mock name lists seamlessly integrate into worksheet questions
5. Generated worksheets contain age-appropriate UK curriculum math problems with proper terminology
6. AI output produces valid HTML structure suitable for PDF conversion
7. Error handling provides graceful fallbacks with user-friendly messaging
8. Content quality maintains educational standards and curriculum alignment
9. Question types vary appropriately (word problems, calculations, visual problems)
10. Generated content avoids cultural bias and uses UK-specific contexts

### Story POC.2: Professional PDF Generation & Download

As a UK primary school teacher,
I want to download professionally formatted PDF worksheets,
so that I can print and distribute high-quality materials in my classroom.

**Acceptance Criteria:**
1. Serverless PDF generation using Puppeteer in Next.js API route
2. HTML-to-PDF conversion maintains consistent formatting across question types
3. Professional A4 formatting with proper margins, headers, and educational styling
4. Worksheet includes curriculum alignment information (Year Group, Topic, Subtopic)
5. Generated PDFs optimized for standard classroom printing
6. PDF file naming includes timestamp and curriculum details for teacher organization
7. Page breaks occur naturally without splitting questions inappropriately
8. PDFs include space for student name and date fields
9. Download functionality provides immediate access to generated worksheets
10. PDF quality remains consistent across different browsers and devices

### Story POC.3: Performance-Optimized Generation Workflow

As a UK primary school teacher,
I want worksheets to generate in 5-7 seconds consistently,
so that I can quickly create multiple worksheets during my limited planning sessions.

**Acceptance Criteria:**
1. End-to-end generation time (click to downloadable PDF) consistently under 7 seconds
2. Progress indicator shows accurate generation status during AI processing
3. Optimized prompt engineering for speed without sacrificing curriculum alignment
4. Concurrent generation handling for multiple simultaneous requests
5. Performance monitoring and logging for optimization insights
6. Caching strategies for prompt templates and static assets
7. Fallback mechanisms prevent infinite loading states during API timeouts
8. Error recovery mechanisms maintain user experience during failures
9. Generation workflow handles network interruptions gracefully
10. Performance remains consistent during varying load conditions

### Story POC.4: Seamless UI Integration with Mock Data

As a UK primary school teacher,
I want the existing dashboard interface to work identically with real worksheet generation,
so that I can use the familiar configuration options while getting actual professional worksheets.

**Acceptance Criteria:**
1. All existing Epic 0 mock dropdowns (topics, subtopics, name lists) continue functioning unchanged
2. Generate/Regenerate button logic preserved with real API integration
3. Configuration changes reset preview state and show ads in right panel
4. Preview panel displays real generated worksheet content instead of mock preview
5. Download button appears only after successful generation completion
6. Progress indicator during generation provides meaningful feedback
7. Configuration persistence maintained for regeneration scenarios
8. Error states integrate smoothly with existing UI patterns
9. Mobile and tablet responsiveness preserved during generation workflow
10. All existing UI interactions and state management continue working seamlessly

### Story POC.5: Reusable Architecture Foundation

As a developer,
I want to build the POC with architecture patterns that support future Epic development,
so that the worksheet generation core can seamlessly integrate with authentication, subscriptions, and advertising features.

**Acceptance Criteria:**
1. Service layer abstraction enables easy extension for future Epic requirements
2. TypeScript interfaces prepared for user authentication integration (Epic 1)
3. Configuration management ready for subscription tier limitations (Epic 3)
4. API route structure supports future usage tracking and rate limiting
5. Error handling patterns consistent across planned Epic implementations  
6. Modular architecture separates AI services, PDF generation, and curriculum logic
7. Database schema preparation for user profiles and usage tracking
8. Testing framework established for unit, integration, and E2E testing
9. Environment variable management scalable for additional API integrations
10. Code organization supports rapid development with Claude Code assistance

## Epic 1: Foundation & Authentication Infrastructure

**Epic Goal:** Build upon POC success by implementing Supabase authentication infrastructure, user profile management, and usage tracking systems. This epic integrates the proven worksheet generation engine from Epic POC with real user accounts, replacing mock authentication and profile data while preserving the validated generation workflow.

### Story 1.1: Project Setup & Core Infrastructure

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

### Story 1.2: Supabase Database & Authentication Setup

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

### Story 1.3: Google OAuth Authentication Flow

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

### Story 1.4: User Profile Setup & Management

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

### Story 1.5: Basic Usage Tracking System

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

### Story 1.6: Integration with POC Worksheet Generation

As a developer,
I want to integrate the proven POC worksheet generation system with user authentication,
so that authenticated users can generate personalized worksheets tied to their profiles and usage tracking.

**Acceptance Criteria:**
1. User authentication state integrates with existing POC worksheet generation API
2. User profile data (Year Group, Curriculum preferences) informs worksheet generation
3. Generated worksheets include user-specific configuration preferences
4. Usage tracking increments with each worksheet generation
5. Error handling distinguishes between authentication and generation failures
6. User session management preserves configuration state across logins
7. Profile-based default values populate worksheet configuration forms
8. Usage limits prepared for future subscription management (Epic 3)
9. User-specific worksheet history foundation established
10. Integration maintains POC performance benchmarks (5-7 second generation)

## Epic 2: Enhanced Worksheet Generation Engine

**Epic Goal:** Expand the proven POC worksheet generation system with comprehensive UK National Curriculum taxonomy, advanced customization options, name list management, and performance optimization. This epic builds on the validated core generation pipeline to deliver complete curriculum coverage and sophisticated personalization features.

### Story 2.1: UK National Curriculum Topic Taxonomy

As a UK primary school teacher,
I want to select from comprehensive UK National Curriculum math topics and subtopics,
so that I can generate worksheets aligned with specific learning objectives for my year group.

**Acceptance Criteria:**
1. Topic dropdown includes all UK National Curriculum math domains: Number & Place Value, Addition & Subtraction, Multiplication & Division, Fractions, Measurement, Geometry, Statistics
2. Subtopic dropdown dynamically populates based on selected Topic and user's Year Group (from profile)
3. Year-appropriate subtopic filtering ensures teachers only see age-appropriate options
4. Topic/Subtopic combinations map to specific curriculum learning objectives
5. Dropdown selections persist during session for quick regeneration
6. Clear labeling indicates curriculum alignment (e.g., "Year 3 - Comparing Numbers")
7. Graceful handling when no subtopics exist for Topic/Year combination
8. Fast dropdown loading without API delays

### Story 2.2: Advanced AI Prompt Engineering System

As the system,
I want to generate highly curriculum-aligned worksheet content using sophisticated prompt engineering with personalized name integration,
so that teachers receive pedagogically appropriate and educationally sound worksheets with student names embedded in questions.

**Acceptance Criteria:**
1. Curriculum-specific prompt templates for each Topic/Subtopic/Year combination
2. Prompt engineering includes learning objective alignment, age-appropriate language, and progressive difficulty within worksheets
3. Name list integration seamlessly incorporates student names into word problems and contextual questions
4. Generated content follows UK educational formatting standards and terminology
5. Difficulty levels (Easy/Average/Hard) produce meaningful progression in problem complexity
6. Question types vary appropriately within each worksheet (e.g., word problems, calculations, visual problems)
7. Content avoids cultural bias and uses UK-specific contexts and terminology
8. Generated worksheets include clear instructions and example problems where appropriate
9. AI output consistently produces valid HTML structure for PDF conversion
10. Name integration maintains educational quality and curriculum alignment
11. Personalized questions feel natural and contextually appropriate for the math concepts

### Story 2.3: Professional PDF Generation & Formatting

As a UK primary school teacher,
I want to download professionally formatted PDF worksheets,
so that I can print and distribute high-quality materials in my classroom.

**Acceptance Criteria:**
1. HTML-to-PDF conversion maintains consistent formatting across all worksheet types
2. PDF output includes proper page margins, headers, and professional styling
3. Worksheet title includes curriculum alignment information (Year Group, Topic, Subtopic)
4. Generated PDFs are optimized for standard A4 printing
5. PDF formatting handles various question types (text, numbers, diagrams) appropriately
6. Page breaks occur naturally and avoid splitting questions inappropriately
7. PDF file naming convention includes timestamp and curriculum details for teacher organization
8. Download completes within 2-3 seconds after generation finishes
9. PDF quality remains consistent across different browsers and devices
10. Generated PDFs include space for student name and date fields

### Story 2.4: Optimized Two-Column Interface with Name List Management

As a UK primary school teacher,
I want an intuitive two-column worksheet generation interface with name list management,
so that I can efficiently configure personalized worksheets and manage student names during my limited planning time.

**Acceptance Criteria:**
1. Left column contains all configuration controls in logical vertical order: Topic, Subtopic, Worksheet Type, Question Count, Difficulty Level, Name List selection
2. Right column displays ads during generation, then worksheet preview after completion
3. Interface is fully responsive for desktop, laptop, and tablet usage
4. Name list dropdown shows default name list selected with option to choose from saved lists
5. "Create New Name List" button with info icon explaining names will be used in worksheet questions
6. Name list creation modal allows teachers to input student names for personalized worksheets
7. Generate/Regenerate button at bottom of configuration changes label based on state: "Generate" for new configurations, "Regenerate" when modifying existing
8. Download button appears only when right panel shows PDF preview, disappears when configuration changes
9. Configuration changes empty the preview section and show ads in right panel
10. Progress indicator shows generation status during 5-7 second AI processing
11. Preview area includes zoom functionality for detailed worksheet review
12. Clear visual separation between configuration and preview areas
13. Interface maintains state during regeneration (no flickering or layout shifts)
14. Quick access to user profile settings and usage counter in navigation
15. Configuration persistence loads user's last selections on login

### Story 2.5: Generation Performance Optimization

As a UK primary school teacher,
I want worksheets to generate in 5-7 seconds consistently,
so that I can quickly create multiple worksheets during my planning sessions.

**Acceptance Criteria:**
1. End-to-end generation time (click to PDF ready) consistently under 7 seconds
2. AI API calls optimized with efficient prompt structure and appropriate model selection
3. HTML-to-PDF conversion optimized for speed without sacrificing quality
4. Progress bar provides accurate time estimates and completion feedback
5. Concurrent generation requests handled gracefully without performance degradation
6. Error recovery mechanisms prevent infinite loading states
7. Generation performance monitored and logged for optimization
8. Caching strategies implemented where appropriate (prompt templates, static assets)
9. Fallback mechanisms for API timeouts or failures
10. Performance maintains consistency during peak usage times

### Story 2.6: Name List Management System

As a UK primary school teacher,
I want to create and manage lists of student names for personalized worksheet generation,
so that I can generate worksheets with my students' names included in the questions for better engagement.

**Acceptance Criteria:**
1. Name list creation interface allows teachers to input multiple student names
2. Default name list provided with common UK primary school names for immediate use
3. Teachers can create multiple name lists for different classes or groups
4. Name list selector dropdown in configuration panel shows all saved lists
5. Info icon next to name list creation explains how names will be integrated into worksheet questions
6. Name lists persist across sessions and are tied to user accounts
7. Edit functionality allows modification of existing name lists
8. Delete functionality for removing unused name lists with confirmation dialog
9. Name lists integrate seamlessly with AI prompt generation for personalized questions
10. Name validation ensures appropriate names for educational content
11. Import functionality for bulk name addition from CSV or text files
12. Name list management accessible from main interface and profile settings

### Story 2.7: Enhanced Worksheet Customization

As a UK primary school teacher,
I want additional customization options for worksheet generation,
so that I can create materials perfectly suited to my lesson plans and student needs.

**Acceptance Criteria:**
1. Question count selector expanded to include 5, 10, 15, 20, 25, 30 options
2. Worksheet format options: Problems only, Problems with answer sheet, Mixed practice
3. Additional difficulty granularity: Very Easy, Easy, Average, Hard, Very Hard
4. Optional worksheet instructions customization (brief teacher notes)
5. Layout options: Single column, Two column, Mixed layout based on question type
6. Font size options: Small, Medium, Large for different age groups and accessibility needs
7. Answer key generation option as separate PDF
8. Customization options respect curriculum requirements and don't compromise educational quality
9. Advanced options collapsible to maintain interface simplicity for basic users
10. Customization preferences saved per user session

## Epic 3: Subscription & Usage Management System

**Epic Goal:** Implement the complete three-tier freemium business model with Stripe integration and automated usage limit enforcement, leveraging the established worksheet generation engine and user authentication infrastructure. This epic enables monetization through subscription tiers while maintaining seamless user experience from Epic POC and Epic 1.

### Story 3.1: Three-Tier Subscription Model Setup

As the system,
I want to implement the Free, Pro, and Pro Plus subscription tiers,
so that users have clear upgrade paths and usage limits are properly defined and enforced.

**Acceptance Criteria:**
1. Database schema includes subscription_tiers table with tier definitions: Free (30/month), Pro (90/month, £2.99), Pro Plus (150/month, higher price)
2. User profiles linked to subscription tier with default Free tier for new users
3. Tier upgrade/downgrade logic maintains usage history and handles mid-cycle changes
4. Subscription tier determines available features and usage limits
5. Clear tier comparison table available for user reference
6. Subscription tier displayed in user navigation/profile area
7. Tier change takes effect immediately for user experience
8. Historical subscription data preserved for analytics and billing
9. Pro Plus pricing configured and ready for future pricing strategy
10. Tier benefits clearly communicated in UI (usage limits, ad removal, etc.)

### Story 3.2: Stripe Integration & Payment Processing

As a UK primary school teacher,
I want to securely upgrade to Pro or Pro Plus subscription,
so that I can generate more worksheets monthly without advertisements.

**Acceptance Criteria:**
1. Stripe account configured with UK-appropriate payment methods and tax settings
2. Stripe Checkout integration for Pro (£2.99/month) and Pro Plus subscriptions
3. Webhook handling for successful payments, failed payments, and subscription cancellations
4. Subscription management page allows users to view current plan, billing history, and change payment methods
5. Automatic subscription renewal with email notifications
6. Prorated billing for mid-cycle subscription changes
7. Secure handling of payment data with no sensitive information stored locally
8. Clear pricing display with VAT calculations for UK users
9. Subscription cancellation flow with retention attempt and feedback collection
10. Integration with user tier system for immediate access after payment
11. Failed payment retry logic and dunning management
12. Refund processing capability for customer service scenarios

### Story 3.3: Usage Limit Enforcement System

As the system,
I want to enforce monthly and daily usage limits based on subscription tiers,
so that the freemium model operates correctly and users understand their current usage status.

**Acceptance Criteria:**
1. Real-time usage checking before allowing worksheet generation
2. Clear messaging when users approach usage limits (90% warning, 100% prevention)
3. Monthly usage resets automatically on user's subscription anniversary date
4. Daily usage limits prevent abuse while allowing reasonable daily access
5. Usage limit enforcement integrates seamlessly with generation workflow
6. Graceful handling of limit exceeded scenarios with upgrade prompts
7. Usage counting is atomic and handles concurrent generation requests
8. Historical usage data maintained for analytics and support
9. Override mechanism for customer service scenarios
10. Usage limits clearly communicated in user interface

### Story 3.4: Real-Time Usage Counter Display

As a UK primary school teacher,
I want to see my current usage status and limits,
so that I can plan my worksheet generation and understand when I might need to upgrade.

**Acceptance Criteria:**
1. Navigation bar displays current month usage counter (e.g., "15/30 worksheets")
2. Usage counter updates immediately after each generation
3. Visual progress indicator shows usage percentage with color coding (green/yellow/red)
4. Hover or click reveals additional details: daily usage, reset date, tier benefits
5. Usage counter links to subscription management for easy upgrades
6. Clear messaging when approaching limits with upgrade call-to-action
7. Historical usage trends available in profile/settings area
8. Usage counter works correctly across browser sessions and devices
9. Real-time updates using Supabase subscriptions for immediate feedback
10. Mobile-responsive counter display for tablet and phone usage

### Story 3.5: Subscription Management Interface

As a UK primary school teacher,
I want to manage my subscription, billing, and account preferences,
so that I can control my payment methods and understand my usage patterns.

**Acceptance Criteria:**
1. Dedicated subscription management page with current plan details
2. One-click upgrade and downgrade options with clear pricing information
3. Billing history with downloadable invoices for expense reporting
4. Payment method management through Stripe Customer Portal
5. Subscription cancellation option with immediate or end-of-period choices
6. Usage analytics showing monthly trends and worksheet generation patterns
7. Account preferences: email notifications, usage alerts, marketing communications
8. Export functionality for usage data and billing information
9. Clear next billing date and amount prominently displayed
10. Support contact information and help documentation easily accessible
11. Subscription pause/hold functionality for extended breaks (summer holidays)
12. Bulk upgrade options or educational discount inquiry for schools

### Story 3.6: Configuration Persistence & State Management

As a UK primary school teacher,
I want the system to remember my last worksheet configuration settings,
so that I can quickly resume my work and see my previous selections when I return to the platform.

**Acceptance Criteria:**
1. Last configuration settings (Topic, Subtopic, Difficulty, Question Count, Name List) saved to user profile automatically
2. Configuration settings restored when user logs in, showing previous selections in dropdowns
3. When configuration changes, preview section empties immediately
4. Download button disappears when any configuration parameter changes
5. Right panel displays advertisements when configuration changes until new generation completes
6. Generate button changes to "Regenerate" when modifying existing configuration
7. Generate button shows "Generate" label for new/changed configurations
8. Configuration state management handles concurrent updates gracefully
9. Default configuration provided for new users with sensible starting values
10. Configuration changes trigger immediate UI state updates for responsive user experience
11. Session-based configuration changes persist during browser session
12. Long-term configuration persistence tied to user account across devices

### Story 3.7: Freemium Conversion Optimization

As the business,
I want to optimize free-to-paid conversion through strategic prompts and value demonstration,
so that we achieve the 15% conversion rate target and sustainable revenue growth.

**Acceptance Criteria:**
1. Strategic upgrade prompts at key moments: 70% usage, limit reached, high-quality generation
2. Value demonstration shows time savings and professional output quality
3. Pro tier benefits clearly communicated: no ads, higher limits, priority generation
4. Limited-time offers and educational discounts for trial conversion
5. Usage-based personalization of upgrade messaging (heavy users get different prompts)
6. A/B testing framework for conversion optimization experiments
7. User onboarding emphasizes upgrade value without being pushy
8. Social proof elements: testimonials, usage statistics, professional endorsements
9. Conversion funnel tracking and analytics to optimize messaging
10. Retention strategies for users who downgrade or cancel subscriptions
11. Referral program foundation for future word-of-mouth growth
12. Email marketing integration for nurturing free users toward conversion

## Epic 4: AdSense Integration & Revenue Optimization

**Epic Goal:** Complete the monetization strategy by integrating real AdSense advertising with intelligent placement optimization, building upon the validated worksheet generation platform, established user authentication, and subscription management systems. This epic maximizes revenue per free user while preserving the professional user experience established in previous epics.

### Story 4.1: AdSense Account Setup & Integration

As the business,
I want to integrate Google AdSense into the platform architecture,
so that free tier users generate advertising revenue while maintaining professional appearance.

**Acceptance Criteria:**
1. Google AdSense account created and approved for educational content monetization
2. AdSense code properly integrated into Next.js application with performance optimization
3. Ad units configured for navigation banner and right panel placement areas
4. AdSense policies compliance verified for educational content and user experience
5. Ad blocking detection implemented with graceful degradation
6. Revenue tracking and reporting dashboard integration with Google AdSense
7. GDPR/CCPA compliant ad personalization with user consent management
8. Ad load performance optimized to not impact page load times beyond 3-second target
9. AdSense integration respects user privacy and data protection requirements
10. Backup ad networks configured for fill rate optimization

### Story 4.2: Intelligent Ad Placement System

As a UK primary school teacher using the free tier,
I want advertisements to appear only during appropriate moments,
so that my worksheet generation experience remains professional and focused.

**Acceptance Criteria:**
1. Navigation banner ad displays consistently for free tier users, hidden for Pro/Pro Plus
2. Right panel ad appears during worksheet generation (5-7 second loading period)
3. Ads completely disappear during worksheet preview and PDF download phases
4. Ad visibility controlled by subscription tier with immediate updates after upgrade
5. Ad placement respects interface layout and doesn't disrupt generation workflow
6. Mobile and tablet responsive ad sizing maintains clean interface
7. Ad refresh during extended generation sessions to maximize revenue
8. Clear visual separation between ads and application content
9. Ad-free preview environment maintains professional appearance for classroom use
10. No ads during error states or when generation fails

### Story 4.3: Revenue Optimization Engine

As the business,
I want to maximize AdSense revenue per free user,
so that we achieve the £0.15-0.50 monthly revenue target while supporting conversion to paid tiers.

**Acceptance Criteria:**
1. A/B testing framework for ad placement, sizing, and timing optimization
2. Revenue analytics tracking per user segment, usage patterns, and time periods
3. Ad unit optimization based on click-through rates and revenue per impression
4. Seasonal and usage-based ad targeting for educational content relevance
5. Revenue performance monitoring with alerts for underperformance
6. User behavior analysis to identify optimal ad timing and placement
7. Geographic targeting optimization for UK primary education market
8. Ad frequency capping to prevent user experience degradation
9. Revenue attribution tracking for conversion impact analysis
10. Competitive analysis monitoring for ad revenue benchmarking
11. Performance metrics dashboard for ongoing optimization decisions
12. Revenue forecasting based on user growth and engagement patterns

### Story 4.4: Ad-Free User Experience for Paid Tiers

As a UK primary school teacher with Pro or Pro Plus subscription,
I want a completely ad-free experience,
so that I can focus entirely on creating professional worksheets for my classroom.

**Acceptance Criteria:**
1. Zero advertisements displayed for Pro and Pro Plus subscribers
2. Clean, professional interface with no ad placeholders or layout shifts
3. Immediate ad removal upon subscription upgrade without page refresh
4. Ad-free experience maintained across all platform features and pages
5. No tracking or data collection for advertising purposes on paid accounts
6. Enhanced interface space utilization when ads are removed
7. Ad-free status clearly communicated as premium benefit in upgrade messaging
8. Subscription downgrade immediately re-enables appropriate ad display
9. Ad-free experience works consistently across all devices and browsers
10. Customer support can verify and troubleshoot ad-free account status

### Story 4.5: User Consent & Privacy Management

As a UK primary school teacher,
I want control over advertising personalization and data usage,
so that I can comply with my school's privacy policies and personal preferences.

**Acceptance Criteria:**
1. GDPR-compliant consent banner for advertising cookies and personalization
2. Privacy settings page allows granular control over ad personalization
3. One-click consent withdrawal with immediate effect on ad targeting
4. Clear privacy policy explaining ad data usage and teacher data protection
5. School-friendly privacy controls for institutional compliance
6. Opt-out mechanisms for behavioral targeting while maintaining basic ad display
7. Data retention policies clearly communicated and automatically enforced
8. Privacy settings integrate with subscription management for seamless experience
9. Consent management works across sessions and devices for consistent experience
10. Regular privacy policy updates with user notification and re-consent flows

### Story 4.6: Conversion Impact & Revenue Analytics

As the business,
I want to measure AdSense revenue impact on free-to-paid conversion rates,
so that I can optimize the balance between advertising revenue and subscription upgrades.

**Acceptance Criteria:**
1. Conversion funnel analysis comparing users with different ad exposure levels
2. Revenue attribution tracking for AdSense vs. subscription income per user cohort
3. User experience impact measurement for ad placement and timing variations
4. Churn analysis correlating ad experience with user retention and upgrade decisions
5. A/B testing framework for ad vs. no-ad groups to measure conversion impact
6. Long-term value analysis balancing immediate ad revenue with subscription potential
7. Seasonal revenue pattern analysis for educational market optimization
8. Competitive benchmarking for advertising revenue in educational SaaS
9. User feedback collection and analysis regarding ad experience and conversion factors
10. Revenue optimization recommendations based on data-driven insights
11. Forecasting models for combined advertising and subscription revenue growth
12. ROI analysis for advertising revenue vs. user acquisition and retention costs