import type { Metadata } from "next";
import { Mulish, Kalam } from "next/font/google";
import "./globals.css";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

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

export const metadata: Metadata = {
  title: "Free Math Printables | FreeMathPrintable.com",
  description: "Download thousands of free math printables for ages 4-11 (Kindergarten to Grade 6 / Reception to Year 6). Age-appropriate worksheets for primary and elementary schools.",
  keywords: "free math printables, printable worksheets, primary school printables, maths printables free, elementary math printables, free printables, ages 4-11",
  manifest: "/manifest.json",
  themeColor: "#1d4ed8",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: "cover"
  },
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
    <html lang="en">
      <head>
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
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  );
}