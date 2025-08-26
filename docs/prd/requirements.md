# Requirements

## Functional Requirements

**FR1:** The system shall authenticate users via Google OAuth (Gmail login) and redirect to worksheet generation interface upon successful authentication.

**FR2:** The system shall collect and store user profile data including Country (auto-populated as UK), Curriculum (show UK National Curriculums), and Year Group during onboarding.

**FR3:** The system shall provide a two-column worksheet generation interface with configuration controls (Topic dropdown, Subtopic dropdown, Worksheet Type, Question Count selector, Difficulty Level: Easy/Average/Hard), name list (default name list selected) (new name list creation button with info icon telling that you provide list of names which will be used in questions) in the left panel.

**FR4:** The configuration options and profile settings will help to craft a qua;ity prompt.The system shall generate curriculum-aligned math worksheets using AI (Google Gemini API) within 5-7 seconds using that prompt to generate HTML contnet. The system shall convert AI-generated HTML content to professional PDF format and display preview in the right panel.

**FR5:** The system shall enforce usage limits based on subscription tier: Free (30 worksheets/month + ads), Pro (90 worksheets/month @ £2.99), Pro Plus (150 worksheets/month).

**FR6:** The system shall provide download functionality for the pdf.

**FR7:** The system shall display AdSense advertisements in navigation banner and right panel during generation, hidden during preview/download.

**FR8:** The system shall track monthly and daily worksheet generation counters visible in navigation and prevent generation when limits exceeded.

**FR9:** The system shall provide regeneration functionality when users modify configuration parameters.

**FR10:** The system shall integrate Stripe for subscription management and payment processing for Pro and Pro Plus tiers.

**FR10:** The system shall persists the last configuratio settings so whenever user logins the he/she is able to see what was his last selection. Whenever configuration changed by user then preview section will get empty and download button will disappear and right pabe start showing an ad and the button at the bottom will show generate label instead of regenerate. 

## Non-Functional Requirements

**NFR1:** The system shall maintain 99% uptime during UK school hours (8am-4pm GMT) with support for 500+ concurrent users.

**NFR2:** The system shall achieve page load times under 3 seconds and worksheet generation within 5-7 seconds maximum.

**NFR3:** The system shall maintain responsive design compatibility across modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+).

**NFR4:** The system shall ensure curriculum alignment accuracy of 85%+ user satisfaction rating for generated content.

**NFR5:** The system shall implement row-level security via Supabase for user data protection and GDPR compliance.

**NFR6:** The system shall scale to process 1,000+ worksheet generations daily with consistent performance.

**NFR7:** The system shall maintain API key security through environment variables and secure credential management.

**NFR8:** The system shall optimize AdSense integration to generate £0.15-0.50 per free user monthly without UX disruption.