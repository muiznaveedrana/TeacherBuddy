import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | FreeMathPrintable.com",
  description: "Terms of Service for FreeMathPrintable.com - Read our terms and conditions for using our worksheet generation service.",
};

export default function TermsOfService() {
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
        <p className="text-gray-600 mb-8">Last Updated: November 12, 2024</p>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing or using FreeMathPrintable.com (&quot;the Service&quot;), you agree to be bound by these Terms of
              Service (&quot;Terms&quot;). If you disagree with any part of these terms, you may not access the Service.
              These Terms apply to all visitors, users, and others who access or use the Service.
            </p>
          </section>

          {/* Description of Service */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              FreeMathPrintable.com provides:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>A free library of downloadable, age-appropriate math worksheets for ages 4-11</li>
              <li>AI-powered worksheet generation tools for custom printables</li>
              <li>Personalization features including student name integration</li>
              <li>Educational resources for Reception through Year 6</li>
            </ul>
          </section>

          {/* User Accounts */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">3.1 Account Creation</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              Some features require account creation. When you create an account, you must:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your information to keep it accurate</li>
              <li>Maintain the security of your account credentials</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized access</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">3.2 Eligibility</h3>
            <p className="text-gray-700 leading-relaxed">
              You must be at least 18 years old to create an account. Our Service is intended for teachers,
              educators, and parents. You represent that you have the legal authority to bind yourself to these Terms.
            </p>
          </section>

          {/* Acceptable Use */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Acceptable Use Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              You agree NOT to use the Service to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Violate any laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Upload malicious code or viruses</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Use automated systems (bots, scrapers) without permission</li>
              <li>Resell or redistribute our content commercially without authorization</li>
              <li>Remove copyright notices or attributions from worksheets</li>
              <li>Use the Service for any unlawful or prohibited purpose</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Intellectual Property Rights</h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">5.1 Our Content</h3>
            <p className="text-gray-700 leading-relaxed">
              The Service and its original content (excluding user-generated content), features, and functionality
              are owned by FreeMathPrintable.com and are protected by international copyright, trademark, and other
              intellectual property laws.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">5.2 License to Use Worksheets</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              We grant you a limited, non-exclusive, non-transferable license to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Download and print worksheets for educational purposes</li>
              <li>Use worksheets in your classroom or homeschool setting</li>
              <li>Share worksheets with students and parents in your care</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">5.3 Restrictions</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              You may NOT:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Sell or commercially redistribute our worksheets</li>
              <li>Claim authorship of our content</li>
              <li>Remove or alter copyright notices</li>
              <li>Use our content to create competing services</li>
              <li>Mass-download or scrape our content systematically</li>
            </ul>
          </section>

          {/* Subscription and Billing */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Subscription and Billing</h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">6.1 Free Tier</h3>
            <p className="text-gray-700 leading-relaxed">
              The worksheet library is free to access and use. Custom worksheet generation may have usage limits
              based on your subscription tier.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">6.2 Paid Subscriptions</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              If you subscribe to a paid plan:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>You will be billed in advance on a recurring monthly basis</li>
              <li>Your subscription automatically renews unless cancelled</li>
              <li>You can cancel at any time through your account settings</li>
              <li>Cancellation takes effect at the end of the current billing period</li>
              <li>No refunds for partial months or unused worksheets</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">6.3 Price Changes</h3>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify subscription prices with at least 30 days notice. Price changes will
              take effect at the start of your next billing cycle.
            </p>
          </section>

          {/* User Content */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. User-Generated Content</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              When you upload student names or other content to personalize worksheets:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>You retain ownership of your content</li>
              <li>You grant us a license to use it solely to provide the Service</li>
              <li>You are responsible for ensuring you have necessary permissions (e.g., parental consent for student names)</li>
              <li>You warrant that your content does not violate any laws or third-party rights</li>
            </ul>
          </section>

          {/* Disclaimers */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Disclaimers and Limitations</h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">8.1 Educational Use</h3>
            <p className="text-gray-700 leading-relaxed">
              Our worksheets are designed to be age-appropriate for their intended audience, but we do not guarantee
              specific educational outcomes. Teachers should review all content before use.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">8.2 Service Availability</h3>
            <p className="text-gray-700 leading-relaxed">
              The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind. We do not
              guarantee uninterrupted or error-free operation. We may suspend or terminate the Service for
              maintenance or improvements at any time.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">8.3 Limitation of Liability</h3>
            <p className="text-gray-700 leading-relaxed">
              To the maximum extent permitted by law, FreeMathPrintable.com shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages, or any loss of profits or revenues.
            </p>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Indemnification</h2>
            <p className="text-gray-700 leading-relaxed">
              You agree to indemnify and hold harmless FreeMathPrintable.com from any claims, damages, or expenses
              arising from your use of the Service, violation of these Terms, or infringement of any third-party rights.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Termination</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We may terminate or suspend your account and access to the Service immediately, without prior notice,
              if you breach these Terms. Upon termination:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Your right to use the Service ceases immediately</li>
              <li>We may delete your account and content</li>
              <li>You remain liable for any outstanding payments</li>
              <li>Provisions that should survive termination will continue to apply</li>
            </ul>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Governing Law and Jurisdiction</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of England and Wales.
              Any disputes arising from these Terms or your use of the Service shall be subject to the exclusive
              jurisdiction of the courts of England and Wales.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these Terms at any time. We will notify users of material changes
              via email or through the Service. Your continued use after changes constitutes acceptance of the
              modified Terms. If you do not agree to the changes, you must stop using the Service.
            </p>
          </section>

          {/* Dispute Resolution */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Dispute Resolution</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any concerns or disputes, please contact us first at support@freemathprintable.com.
              We will make reasonable efforts to resolve disputes amicably before resorting to formal legal proceedings.
            </p>
          </section>

          {/* Severability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Severability</h2>
            <p className="text-gray-700 leading-relaxed">
              If any provision of these Terms is found to be unenforceable or invalid, that provision shall be
              limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in
              full force and effect.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              If you have questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700"><strong>Email:</strong> support@freemathprintable.com</p>
              <p className="text-gray-700"><strong>Legal:</strong> legal@freemathprintable.com</p>
            </div>
          </section>

          {/* Acknowledgment */}
          <section className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-blue-900 mb-3">Acknowledgment</h2>
            <p className="text-blue-800 leading-relaxed">
              By using FreeMathPrintable.com, you acknowledge that you have read, understood, and agree to be
              bound by these Terms of Service and our Privacy Policy.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2024 FreeMathPrintable.com. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <Link href="/" className="text-gray-300 hover:text-white">Home</Link>
            <Link href="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link>
            <a href="mailto:support@freemathprintable.com" className="text-gray-300 hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
