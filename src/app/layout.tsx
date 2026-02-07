import type { Metadata, Viewport } from "next";
import { Mulish, Kalam } from "next/font/google";
import "./globals.css";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { NavigationProgressProvider } from "@/components/NavigationProgress";

// Mulish (formerly Muli) for clean, modern body text
const mulish = Mulish({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-mulish',
  display: 'swap',
});

// Kalam for playful, handwritten headers
const kalam = Kalam({
  subsets: ["latin"],
  weight: ['300', '400', '700'],
  variable: '--font-kalam',
  display: 'swap',
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: "#1d4ed8",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://freemathprintable.com'),
  title: "Free Math Worksheets | FreeMathPrintable.com",
  description: "Download thousands of free printable math worksheets for Kindergarten through Grade 6 (ages 4-11). Common Core aligned. No signup required.",
  keywords: "free math worksheets, printable worksheets, kindergarten worksheets, elementary math worksheets, free printables, math practice sheets, grade 1 worksheets, grade 2 worksheets",
  manifest: "/manifest.json",
  // Note: themeColor and viewport moved to separate viewport export (Next.js 14+ requirement)
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "FreeMathPrintable"
  },
  formatDetection: {
    telephone: false
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'FreeMathPrintable',
    'application-name': 'FreeMathPrintable.com',
    'msapplication-TileColor': '#1d4ed8',
    'msapplication-TileImage': '/icons/icon-144x144.png'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US">
      <head>
        {/* SEO: hreflang tags for international targeting */}
        <link rel="alternate" hrefLang="en-US" href="https://freemathprintable.com" />
        <link rel="alternate" hrefLang="en-GB" href="https://freemathprintable.com" />
        <link rel="alternate" hrefLang="x-default" href="https://freemathprintable.com" />

        {/* Performance: Preconnect to CDN and external resources */}
        <link rel="preconnect" href="https://ik.imagekit.io" />
        <link rel="dns-prefetch" href="https://ik.imagekit.io" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Icons and PWA */}
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16x16.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="FreeMathPrintable" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileImage" content="/icons/icon-144x144.png" />
        <meta name="msapplication-TileColor" content="#1d4ed8" />
        <GoogleAnalytics />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    }, function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </head>
      <body className={`${mulish.variable} ${kalam.variable} font-sans antialiased`}>
        <NavigationProgressProvider>
          {children}
        </NavigationProgressProvider>
        <CookieConsentBanner />
      </body>
    </html>
  );
}