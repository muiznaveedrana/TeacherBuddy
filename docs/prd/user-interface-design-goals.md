# User Interface Design Goals

## Overall UX Vision
Clean, focused interface optimized for time-pressed teachers during limited planning periods. The design prioritizes speed and simplicity with a two-column layout that separates configuration controls from content preview, reducing cognitive load while maintaining full functionality. The interface follows a "progressive disclosure" pattern where complexity is hidden until needed, allowing teachers to generate worksheets with minimal clicks while providing access to advanced options when required.

## Key Interaction Paradigms
**Dropdown-Driven Configuration:** All worksheet parameters (Topic, Subtopic, Difficulty, Question Count) use closed-input controls to eliminate guesswork and ensure valid combinations. This approach reduces decision fatigue while providing precise control.

**Instant Preview System:** Generated worksheets appear immediately in the right panel with clear visual hierarchy between ads (during generation), preview content, and download actions.

**Contextual Ad Integration:** AdSense placement strategy that maximizes revenue during "wait time" (generation phase) while completely hiding ads during preview/download to maintain professional appearance.

## Core Screens and Views
**Landing Page:** Clean homepage with About/Pricing/Start Now layout optimized for teacher decision-making during brief research sessions.
This should have an engaing banner with information about the worksheetgenerator tow action buttons "Star Now" and "Watch Demo" and other sections that tell about features and Why teacher loves the worksheet generator

**Authentication Flow:** Seamless Gmail OAuth integration with minimal steps to reduce friction for school-managed or individual Google accounts.

**Worksheet Generation Interface:** Primary application screen with two-column layout - left panel configuration controls, right panel for ads/preview. at the bottom of configurations , there will be two buttons "Generate" and "Download" next to each other. Generate button will change to regenrate based on configuration setting change and Download button will only appear if the right pane is showing pdf in preview

**User Profile/Settings:** Basic account management with subscription status, usage counters, and profile updates (Country, Curriculum, Year Group).

**Subscription Management:** Stripe-integrated billing interface for Pro/Pro Plus tier management and payment processing.

## Accessibility: WCAG AA
Full WCAG 2.1 AA compliance to ensure accessibility for teachers with disabilities and to meet UK public sector accessibility requirements. Includes keyboard navigation, screen reader compatibility, sufficient color contrast ratios, and alternative text for all interactive elements.

## Branding
Professional, trustworthy design aesthetic that conveys educational authority while maintaining approachability. Clean and child friendly typography that can be used for educational purpose, consistent spacing, and a color palette that works well with worksheet content without being distracting. Brand identity should communicate "reliable educational tool" rather than "flashy consumer app."

## Target Device and Platforms: Web Responsive
**Primary Platform:** Desktop/laptop web browsers (primary teacher workflow during planning sessions)
**Secondary Support:** Tablet-responsive design for classroom use and mobile-responsive for quick access
**Browser Compatibility:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ with 99.5% UK teacher compatibility