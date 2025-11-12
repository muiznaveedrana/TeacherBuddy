import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QuickAdminAccess } from "@/components/admin/QuickAdminAccess";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Free Math Printables UK | FreeMathPrintable.com",
  description: "Download thousands of free math printables for UK primary schools (Reception to Year 6). Free library aligned with UK National Curriculum.",
  keywords: "free math printables, printable worksheets UK, primary school printables, maths printables free, KS1 printables, KS2 printables, free printables",
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
      <body className={`${inter.className} antialiased`}>
        {children}
        <QuickAdminAccess />
      </body>
    </html>
  );
}