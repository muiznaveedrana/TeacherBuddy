# Epic 0: UI Component Library & Mockups

**Epic Goal:** Create a complete, professional UI component library with realistic mock data for all WorksheetGenerator.AI interfaces, establishing the visual design system and user experience flows before implementing backend integration in subsequent epics. This foundational epic ensures consistent design, enables early user testing, and provides a solid foundation for parallel frontend/backend development.

## Story 0.1: Landing Page & Marketing Interface

As a UK primary school teacher visiting the site,
I want to see a professional, engaging landing page that clearly explains the benefits,
so that I can quickly understand the value proposition and decide to sign up.

**Acceptance Criteria:**
1. Hero banner with compelling headline: "Transform worksheet creation from hours to seconds"
2. Two prominent call-to-action buttons: "Start Now" (primary) and "Watch Demo" (secondary)
3. Features section highlighting AI generation, curriculum alignment, time savings
4. "Why Teachers Love WorksheetGenerator.AI" section with testimonials
5. "How It Works" - simple 3-step process visualization
6. Pricing tiers comparison table (Free/Pro/Pro Plus) with clear benefits
7. Professional, trustworthy design aesthetic suitable for educational tools
8. Clean, child-friendly typography optimized for educational use
9. Responsive design working perfectly on desktop, tablet, and mobile
10. Mock testimonials from fictional UK primary teachers
11. Placeholder social proof statistics (e.g., "Used by 2,500+ UK teachers")
12. Footer with privacy policy, terms of service, contact information

## Story 0.2: Authentication & Onboarding Flow

As a UK primary school teacher,
I want a seamless sign-in and onboarding experience,
so that I can quickly start using the platform without friction.

**Acceptance Criteria:**
1. Clean sign-in page with "Sign in with Google" button using shadcn/ui components
2. Mock Google OAuth flow with realistic loading states and transitions
3. Welcome message after successful mock authentication
4. Profile setup form with mock data population:
   - Country dropdown (pre-populated with "England")
   - Curriculum selector ("UK National Curriculum" as default)
   - Year Group dropdown (Reception through Year 6)
5. Form validation with clear error messages and success states
6. Skip profile setup option with explanation of benefits
7. Welcome tour or onboarding tooltips for first-time users
8. Success state that transitions to main dashboard
9. Professional design that builds trust with teachers
10. Mobile-responsive design for tablet use in classrooms

## Story 0.3: Main Application Shell & Navigation

As a UK primary school teacher using the application,
I want consistent navigation and clear usage information,
so that I can efficiently navigate the platform and understand my account status.

**Acceptance Criteria:**
1. Navigation bar with WorksheetGenerator.AI logo and branding
2. Usage counter display showing mock data (e.g., "15/30 worksheets")
3. Visual progress indicator with color coding (green/yellow/red)
4. Subscription tier badge (Free/Pro/Pro Plus) with appropriate styling
5. User dropdown menu with profile picture and options:
   - Profile Settings
   - Name Lists
   - Subscription Management
   - Usage Analytics
   - Sign Out
6. Mobile-responsive hamburger menu for smaller screens
7. Hover states and tooltips for usage information
8. Notifications indicator for important updates (mock notifications)
9. Breadcrumb navigation for sub-pages
10. Consistent spacing and professional aesthetic
11. Loading states for navigation transitions
12. Footer with support links and version information

## Story 0.4: Worksheet Generation Interface (Two-Column Layout)

As a UK primary school teacher,
I want an intuitive worksheet generation interface,
so that I can efficiently configure and preview worksheets during my planning time.

**Acceptance Criteria:**
1. Two-column responsive layout (70/30 split on desktop, stacked on mobile)
2. Left panel configuration controls in logical vertical order:
   - Topic dropdown with mock UK curriculum topics
   - Subtopic dropdown (dynamically populated based on topic selection)
   - Difficulty selector (Easy/Average/Hard) as radio buttons
   - Question count slider/selector (5-30 questions)
   - Name list selector with "Create New" button and info tooltip
3. Right panel with conditional content:
   - Ad placeholder during "generation" (mock loading state)
   - Mock worksheet preview after "generation" completion
   - Clean transitions between states
4. Bottom action buttons:
   - Generate button (changes to "Regenerate" when config changes)
   - Download button (appears only when preview is showing)
5. Progress indicator during mock generation (5-7 second simulation)
6. Mock worksheet preview with realistic content:
   - Curriculum-aligned math problems
   - Student names from selected name list
   - Professional formatting and layout
7. Configuration state management:
   - Changes empty preview and show ads
   - Button labels update based on state
   - Visual feedback for all interactions
8. Error states with helpful messaging
9. Loading states that feel realistic but not anxious
10. Responsive design optimized for desktop and tablet use

## Story 0.5: Name List Management System

As a UK primary school teacher,
I want to create and manage student name lists,
so that I can personalize worksheets for my different classes.

**Acceptance Criteria:**
1. Name list management page accessible from navigation
2. List view showing all saved name lists with mock data:
   - "Year 3 Class A" (25 names)
   - "Year 4 Maths Group" (18 names)
   - "Reception Class" (20 names)
3. Create new name list modal with:
   - Name list title input
   - Add/remove name functionality
   - Bulk import textarea option
   - Save/cancel buttons
4. Edit existing name list functionality
5. Delete name list with confirmation dialog
6. Default UK name list provided with common primary school names:
   - Emma, Oliver, Ava, George, Isla, Noah, Sophia, Leo, Lily, Arthur
   - Grace, Oscar, Freya, Archie, Charlotte, Jack, Amelia, Harry, Emily, Henry
7. Name list selector in main interface showing saved lists
8. Info tooltip explaining how names are used in worksheet questions
9. Validation for name list requirements (minimum names, appropriate names)
10. Search/filter functionality for large name lists
11. Export name list functionality (CSV format)
12. Mobile-responsive design for classroom use

## Story 0.6: Subscription Management Dashboard

As a UK primary school teacher,
I want to manage my subscription and view usage analytics,
so that I can understand my usage patterns and make informed upgrade decisions.

**Acceptance Criteria:**
1. Subscription overview card showing mock data:
   - Current tier: "Free Plan"
   - Usage: "15/30 worksheets this month"
   - Next reset: "February 1, 2024"
   - Days remaining: "16 days"
2. Usage analytics section with mock data visualization:
   - Monthly usage chart (last 6 months)
   - Most generated topics (Addition: 8, Subtraction: 5, Fractions: 2)
   - Daily usage patterns
   - Average generation time
3. Tier comparison table:
   - Free: 30 worksheets/month, ads included
   - Pro: 90 worksheets/month, £2.99/month, ad-free
   - Pro Plus: 150 worksheets/month, higher price, priority support
4. Upgrade/downgrade buttons with clear pricing
5. Billing history section with mock invoices:
   - Download invoice functionality
   - Payment method display
   - Next billing date and amount
6. Account settings:
   - Email preferences checkboxes
   - Usage notification settings
   - Marketing communication preferences
7. Subscription cancellation flow with retention messaging
8. Help and support section with FAQ links
9. Export usage data functionality
10. Professional design that reduces billing anxiety
11. UK-specific pricing display (£ symbol, VAT information)
12. Mobile-responsive design

## Story 0.7: Ad Integration Mockups & Privacy

As a UK primary school teacher using the free tier,
I want to understand how advertisements will appear and control my privacy settings,
so that I can make informed decisions about the platform use in my school environment.

**Acceptance Criteria:**
1. Ad placeholder components for different placements:
   - Navigation banner ad (728x90 leaderboard)
   - Right panel ad during generation (300x250 medium rectangle)
   - Mobile-optimized ad sizes
2. Ad visibility mockup based on subscription tier:
   - Show ads for Free tier
   - Hide ads for Pro/Pro Plus tiers
   - Clean transitions when upgrading
3. Privacy consent banner with GDPR compliance:
   - Cookie consent options
   - Ad personalization settings
   - Clear privacy policy links
4. Privacy settings page:
   - Granular ad personalization controls
   - Data usage explanations
   - Opt-out options for behavioral targeting
   - School-friendly privacy controls
5. Ad-free preview demonstration:
   - Show clean interface without ads
   - Communicate premium benefit clearly
   - Professional appearance for classroom use
6. Mock ad content appropriate for educational audience
7. Clear visual separation between ads and application content
8. Loading states for ad content
9. Ad error handling (ad blocker detected, failed to load)
10. Responsive ad design maintaining clean interface

## Story 0.8: Error States & Loading Experiences

As a UK primary school teacher using the platform,
I want clear, helpful error messages and loading states,
so that I understand what's happening and can resolve issues quickly.

**Acceptance Criteria:**
1. Error state components for common scenarios:
   - Network connection issues
   - Generation timeout/failure
   - Invalid form submissions
   - Authentication problems
   - Subscription payment failures
2. Loading state components:
   - Worksheet generation progress (with realistic timing)
   - Page transitions
   - Data fetching states
   - Button loading states
3. Empty state components:
   - No name lists created yet
   - No worksheets generated
   - No usage history
   - Empty search results
4. Helpful error messaging with:
   - Clear explanation of what went wrong
   - Actionable next steps
   - Contact support options when appropriate
   - Try again functionality
5. Loading animations that feel professional, not playful
6. Progress indicators with percentage completion
7. Skeleton loading for content areas
8. Graceful degradation for slow connections
9. Offline state detection and messaging
10. Error recovery mechanisms built into UI

## Story 0.9: Mobile & Tablet Optimization

As a UK primary school teacher using various devices,
I want the platform to work seamlessly on desktop, tablet, and mobile,
so that I can access it during planning time regardless of my device.

**Acceptance Criteria:**
1. Mobile-first responsive design approach
2. Tablet-optimized interface for classroom use:
   - Touch-friendly button sizes
   - Readable typography at arm's length
   - Landscape and portrait orientation support
3. Mobile interface adaptations:
   - Hamburger navigation menu
   - Stacked layout for configuration and preview
   - Touch-optimized form controls
   - Swipe gestures where appropriate
4. Consistent experience across all devices:
   - Same functionality available
   - Visual hierarchy maintained
   - Brand consistency preserved
5. Performance optimization for mobile:
   - Fast loading times
   - Minimal data usage
   - Efficient image loading
6. Mobile-specific features:
   - Pull-to-refresh functionality
   - Native sharing capabilities
   - Device camera integration for future features
7. Accessibility on mobile:
   - Large touch targets
   - High contrast mode support
   - Screen reader compatibility
8. Cross-browser compatibility testing
9. Device-specific testing (iOS Safari, Android Chrome)
10. Progressive Web App (PWA) foundation setup

## Story 0.10: Design System & Component Documentation

As a developer implementing the UI components,
I want a comprehensive design system and component documentation,
so that I can maintain consistency and efficiency during development.

**Acceptance Criteria:**
1. Design system documentation with:
   - Color palette with hex codes and usage guidelines
   - Typography scale with font families and weights
   - Spacing system (margins, padding, grid)
   - Component sizing standards
   - Border radius and shadow definitions
2. Component library with:
   - All UI components catalogued
   - Usage examples for each component
   - Props and configuration options
   - Responsive behavior documentation
3. Style guide covering:
   - Button styles and states
   - Form input standards
   - Card and container layouts
   - Navigation patterns
   - Icon usage guidelines
4. Brand guidelines for:
   - Logo usage and placement
   - Voice and tone for copy
   - Photography and illustration style
   - Educational appropriateness standards
5. Accessibility guidelines:
   - Color contrast requirements
   - Keyboard navigation patterns
   - Screen reader considerations
   - WCAG 2.1 AA compliance checklist
6. Development guidelines:
   - CSS/Tailwind conventions
   - Component naming standards
   - File organization structure
   - Testing requirements
7. Mock data specifications:
   - Sample user profiles
   - Curriculum topic taxonomy
   - Usage statistics examples
   - Subscription billing data
8. Interactive component demos
9. Design token definitions
10. Version control for design updates