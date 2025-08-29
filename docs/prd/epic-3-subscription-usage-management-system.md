# Epic 3: Subscription & Usage Management System

**Epic Goal:** Integrate the complete three-tier freemium business model with the Epic 0 subscription management interface, replacing mock usage counters and billing with real Stripe integration, automated usage limit enforcement, and conversion optimization that enables 15% free-to-paid conversion while maintaining the established user experience.

## Story 3.1: Real Subscription Tier System Integration

As the system,
I want to replace Epic 0 mock subscription tiers with real tier management,
so that users have actual upgrade paths and usage limits are properly enforced.

**Acceptance Criteria:**
1. Replace Epic 0 mock tier badges with real subscription tier data from database
2. Real subscription_tiers table implementation: Free (30/month), Pro (90/month, £2.99), Pro Plus (150/month)
3. Integration with Epic 1 user profiles linking to real subscription tiers
4. Real tier upgrade/downgrade logic maintaining usage history and handling mid-cycle changes
5. Maintain Epic 0 tier comparison table design with real data and pricing
6. Real subscription tier display in navigation replacing mock tier badges
7. Real-time tier changes taking effect immediately in user experience
8. Historical subscription data preservation for analytics and billing
9. Integration with Epic 2 usage limit enforcement for worksheet generation
10. Real tier benefits communication in UI (usage limits, ad removal, priority support)

## Story 3.2: Real Stripe Payment Integration

As a UK primary school teacher,
I want to use the Epic 0 subscription interface with real Stripe payment processing,
so that I can actually upgrade to Pro or Pro Plus and remove ads with real billing.

**Acceptance Criteria:**
1. Replace Epic 0 mock upgrade buttons with real Stripe Checkout integration
2. Maintain Epic 0 subscription management interface design with real billing functionality
3. Real Stripe account configured with UK-appropriate payment methods and tax settings
4. Real webhook handling for successful payments, failed payments, and subscription cancellations
5. Epic 0 billing history interface populated with real transaction data
6. Real automatic subscription renewal with email notifications
7. Real prorated billing for mid-cycle subscription changes using Epic 0 upgrade/downgrade interface
8. Secure payment data handling with no sensitive information stored locally
9. Real VAT calculations for UK users in Epic 0 pricing displays
10. Real subscription cancellation flow using Epic 0 interface with retention messaging
11. Integration with real user tier system for immediate access after payment
12. Real failed payment retry logic and dunning management

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

## Story 3.4: Real Usage Counter System Integration

As a UK primary school teacher,
I want the Epic 0 usage counter interface to display real usage data and limits,
so that I can plan my worksheet generation and make informed upgrade decisions.

**Acceptance Criteria:**
1. Replace Epic 0 mock usage counter with real data from Epic 1 usage tracking system
2. Maintain Epic 0 navigation bar design with real usage display (e.g., "15/30 worksheets")
3. Real usage counter updates immediately after each Epic 2 worksheet generation
4. Epic 0 visual progress indicator with real color coding based on actual usage percentage
5. Real hover/click details: actual daily usage, real reset date, real tier benefits
6. Real usage counter links to Epic 0 subscription management interface
7. Real limit approach messaging with actual upgrade call-to-action
8. Epic 0 usage analytics interface populated with real historical data
9. Real-time updates using Supabase subscriptions for immediate feedback
10. Integration with Epic 2 generation process - prevent generation when real limits exceeded
11. Mobile-responsive counter maintaining Epic 0 design with real data

## Story 3.5: Real Subscription Management Dashboard Integration

As a UK primary school teacher,
I want to use the Epic 0 subscription management interface with real billing data,
so that I can control my actual payment methods and understand my real usage patterns.

**Acceptance Criteria:**
1. Epic 0 subscription management page populated with real current plan details
2. Real one-click upgrade and downgrade options using Epic 0 interface
3. Epic 0 billing history interface populated with real downloadable invoices
4. Real payment method management through Stripe Customer Portal integration
5. Real subscription cancellation using Epic 0 interface with immediate/end-of-period options
6. Epic 0 usage analytics populated with real monthly trends and generation patterns
7. Real account preferences: actual email notifications, usage alerts, marketing communications
8. Real export functionality for actual usage data and billing information
9. Real next billing date and amount displayed in Epic 0 interface
10. Maintain Epic 0 support and help documentation with real contact integration
11. Real subscription pause/hold functionality for extended breaks
12. Real bulk upgrade options and educational discount handling

## Story 3.6: Real Configuration Persistence Integration

As a UK primary school teacher,
I want the Epic 0 configuration interface to remember my real worksheet settings,
so that I can quickly resume my work with my actual previous selections.

**Acceptance Criteria:**
1. Real configuration settings persistence using Epic 1 user profile system
2. Epic 0 configuration interface restored with real previous selections on login
3. Real configuration changes trigger Epic 0 UI updates (empty preview, show ads)
4. Real Download button behavior based on actual PDF generation status
5. Integration with Epic 4 ad system for configuration change behavior
6. Real Generate/Regenerate button state based on actual configuration changes
7. Real configuration state management handling concurrent updates
8. Real default configuration for new users with curriculum-appropriate starting values
9. Real-time configuration state synchronization with Epic 0 UI responsiveness
10. Real session-based persistence during browser session
11. Real long-term configuration persistence across devices using database
12. Integration with Epic 2 generation system for configuration validation

## Story 3.7: Real Conversion Optimization Integration

As the business,
I want to integrate real conversion optimization with Epic 0 UI components,
so that we achieve the 15% conversion rate target using actual user data and behavior.

**Acceptance Criteria:**
1. Real strategic upgrade prompts integrated into Epic 0 interface at key moments
2. Real value demonstration using actual time savings and PDF output quality
3. Real Pro tier benefits communication integrated with Epic 0 upgrade interface
4. Real limited-time offers and educational discounts in Epic 0 pricing display
5. Real usage-based personalization using actual user behavior data
6. A/B testing framework integrated with Epic 0 UI components
7. Real user onboarding with Epic 0 interface emphasizing upgrade value
8. Real social proof elements: actual testimonials, real usage statistics
9. Real conversion funnel tracking and analytics using actual user interactions
10. Real retention strategies integrated with Epic 0 cancellation flow
11. Referral program foundation integrated with Epic 0 user interface
12. Real email marketing integration for nurturing actual free users toward conversion