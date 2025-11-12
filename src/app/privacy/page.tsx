import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | FreeMathPrintable.com",
  description: "Privacy Policy for FreeMathPrintable.com - Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="text-blue-700 hover:text-blue-800 font-semibold">
            ← Back to FreeMathPrintable.com
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">Last Updated: November 12, 2024</p>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to FreeMathPrintable.com. We respect your privacy and are committed to protecting your personal data.
              This privacy policy explains how we collect, use, and safeguard your information when you visit our website
              and use our services.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">2.1 Personal Information</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              When you create an account or use our services, we may collect:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Name and email address (for account creation)</li>
              <li>School name and teaching information (optional)</li>
              <li>Payment information (processed securely through third-party payment processors)</li>
              <li>Student names (stored locally for worksheet personalization only)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">2.2 Usage Information</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              We automatically collect certain information about your device and how you interact with our services:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Browser type and version</li>
              <li>Device information (type, operating system)</li>
              <li>IP address and general location (city/country level)</li>
              <li>Pages visited and time spent on our website</li>
              <li>Worksheets generated and downloaded</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">2.3 Cookies and Tracking Technologies</h3>
            <p className="text-gray-700 leading-relaxed">
              We use cookies and similar technologies to improve your experience, analyze usage patterns, and maintain
              your session. You can control cookie settings through your browser preferences.
            </p>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Provide and maintain our services</li>
              <li>Process your transactions and manage subscriptions</li>
              <li>Personalize your experience and generate custom worksheets</li>
              <li>Send important updates about our services</li>
              <li>Improve our website and develop new features</li>
              <li>Detect and prevent fraud or abuse</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          {/* Data Sharing and Disclosure */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Sharing and Disclosure</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We do not sell your personal information. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Service Providers:</strong> With trusted third-party services that help us operate (hosting, payment processing, analytics)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              <li><strong>With Your Consent:</strong> When you explicitly agree to share information</li>
            </ul>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Children&apos;s Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our service is designed for teachers and educators. We do not knowingly collect personal information
              from children under 13. Student names entered for worksheet personalization are stored locally in your
              account only and are never used for marketing or shared with third parties.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We implement industry-standard security measures to protect your personal information, including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-3">
              <li>Encryption of data in transit and at rest</li>
              <li>Secure authentication and access controls</li>
              <li>Regular security audits and updates</li>
              <li>Limited employee access to personal data</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              However, no method of transmission over the internet is 100% secure. While we strive to protect your
              information, we cannot guarantee absolute security.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights and Choices</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Under UK GDPR and data protection laws, you have the following rights:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data</li>
              <li><strong>Restriction:</strong> Request restriction of processing your data</li>
              <li><strong>Portability:</strong> Request transfer of your data to another service</li>
              <li><strong>Objection:</strong> Object to processing of your personal data</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent at any time (where processing is based on consent)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              To exercise any of these rights, please contact us at{" "}
              <a href="mailto:privacy@freemathprintable.com" className="text-blue-700 hover:text-blue-800">
                privacy@freemathprintable.com
              </a>
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data Retention</h2>
            <p className="text-gray-700 leading-relaxed">
              We retain your personal information only as long as necessary to provide our services and comply with
              legal obligations. When you delete your account, we will delete or anonymize your personal data within
              30 days, except where we are required by law to retain certain information.
            </p>
          </section>

          {/* International Data Transfers */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. International Data Transfers</h2>
            <p className="text-gray-700 leading-relaxed">
              Your information may be transferred to and processed in countries outside the UK. We ensure appropriate
              safeguards are in place to protect your data, including standard contractual clauses approved by
              regulatory authorities.
            </p>
          </section>

          {/* Third-Party Links */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Third-Party Links</h2>
            <p className="text-gray-700 leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices
              of these external sites. We encourage you to review their privacy policies.
            </p>
          </section>

          {/* Changes to Privacy Policy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this privacy policy from time to time. We will notify you of any material changes by
              posting the new policy on this page and updating the &quot;Last Updated&quot; date. Your continued use of our
              services after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700"><strong>Email:</strong> privacy@freemathprintable.com</p>
              <p className="text-gray-700"><strong>Support:</strong> support@freemathprintable.com</p>
              <p className="text-gray-700 mt-2">
                <strong>Data Protection Officer:</strong> dpo@freemathprintable.com
              </p>
            </div>
          </section>

          {/* UK GDPR Specific */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. UK GDPR Compliance</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              As a UK-based service, we comply with the UK General Data Protection Regulation (UK GDPR) and the
              Data Protection Act 2018. You have the right to lodge a complaint with the Information Commissioner&apos;s
              Office (ICO) if you believe your data protection rights have been breached.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-700"><strong>ICO Website:</strong> <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800">ico.org.uk</a></p>
              <p className="text-gray-700"><strong>ICO Helpline:</strong> 0303 123 1113</p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2024 FreeMathPrintable.com. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <Link href="/" className="text-gray-300 hover:text-white">Home</Link>
            <Link href="/terms" className="text-gray-300 hover:text-white">Terms of Service</Link>
            <a href="mailto:support@freemathprintable.com" className="text-gray-300 hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
