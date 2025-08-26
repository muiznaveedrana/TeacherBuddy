# Epic 3: Subscription & Usage Management System

**Epic Goal:** Implement the complete three-tier freemium business model with Stripe integration, automated usage limit enforcement, subscription management interface, and real-time usage counters that enable 15% free-to-paid conversion while maintaining seamless user experience throughout the generation workflow.

## Story 3.1: Three-Tier Subscription Model Setup

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

## Story 3.2: Stripe Integration & Payment Processing

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

## Story 3.3: Usage Limit Enforcement System

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

## Story 3.4: Real-Time Usage Counter Display

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

## Story 3.5: Subscription Management Interface

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

## Story 3.6: Configuration Persistence & State Management

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

## Story 3.7: Freemium Conversion Optimization

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