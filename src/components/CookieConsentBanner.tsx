'use client'

import CookieConsent from "react-cookie-consent"
import Link from "next/link"

/**
 * GDPR Cookie Consent Banner
 *
 * Required by UK GDPR for all websites using cookies.
 *
 * Features:
 * - Accept/Decline buttons
 * - Persists choice for 1 year
 * - Links to Privacy Policy
 * - Mobile-friendly design
 */
export function CookieConsentBanner() {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept All Cookies"
      declineButtonText="Reject Non-Essential"
      enableDeclineButton
      cookieName="freemathprintable-cookie-consent"
      style={{
        background: "#1e293b",
        padding: "16px 20px",
        alignItems: "center",
        fontSize: "14px",
        boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
      }}
      buttonStyle={{
        background: "#3b82f6",
        color: "#fff",
        fontSize: "14px",
        fontWeight: "600",
        borderRadius: "6px",
        padding: "10px 24px",
        border: "none",
        cursor: "pointer",
        marginRight: "10px",
      }}
      declineButtonStyle={{
        background: "#64748b",
        color: "#fff",
        fontSize: "14px",
        fontWeight: "600",
        borderRadius: "6px",
        padding: "10px 24px",
        border: "none",
        cursor: "pointer",
      }}
      expires={365} // Cookie expires after 1 year
      onAccept={() => {
        console.log('✅ User accepted cookies')
        // Store consent in localStorage as well
        localStorage.setItem('cookieConsent', 'accepted')
        // Dispatch custom event for GoogleAnalytics component
        window.dispatchEvent(new Event('cookieConsentAccepted'))
        // Reload page to initialize GA with consent
        setTimeout(() => {
          window.location.reload()
        }, 100)
      }}
      onDecline={() => {
        console.log('❌ User declined non-essential cookies')
        // Store decline in localStorage
        localStorage.setItem('cookieConsent', 'declined')
        // GA won't load without consent
      }}
      // Overlay settings
      overlay={false}
      // Custom content wrapper for better mobile layout
      containerClasses="cookie-consent-container"
      contentClasses="cookie-consent-content"
      buttonClasses="cookie-consent-accept"
      declineButtonClasses="cookie-consent-decline"
    >
      <span style={{ fontSize: "14px", lineHeight: "1.6" }}>
        🍪 We use cookies to improve your experience and analyze site usage. Essential cookies are
        required for the site to function.{" "}
        <Link
          href="/privacy"
          style={{
            color: "#60a5fa",
            textDecoration: "underline",
            fontWeight: "500",
          }}
        >
          Learn more about our cookie policy
        </Link>
      </span>
    </CookieConsent>
  )
}
