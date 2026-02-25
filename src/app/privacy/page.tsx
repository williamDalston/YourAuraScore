import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | YourAuraScore',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black">
      <nav className="flex items-center justify-between px-6 py-5">
        <Link href="/" className="text-white font-bold text-lg tracking-tight">
          YourAura<span className="text-purple-400">Score</span>
        </Link>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-white text-3xl font-bold mb-8">Privacy Policy</h1>

        <div className="space-y-6 text-white/70 text-sm leading-relaxed">
          <p>Last updated: February 2026</p>

          <section>
            <h2 className="text-white text-lg font-semibold mb-2">Information We Collect</h2>
            <p>
              YourAuraScore collects only the quiz answers you provide during the personality quiz.
              These answers are encoded into a URL hash and processed entirely in your browser.
              We do not store your quiz answers on any server or database.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-2">How We Use Your Information</h2>
            <p>
              Your quiz answers are used solely to generate your unique aura visualization and
              personality profile. The processing happens entirely on your device (client-side).
              No personal data is transmitted to our servers.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-2">Cookies and Tracking</h2>
            <p>
              We use standard analytics tools and advertising services (such as Google AdSense)
              that may place cookies on your device. These third-party services have their own
              privacy policies governing the use of cookies and data collection.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-2">Payment Information</h2>
            <p>
              If you make a purchase (digital download or merchandise), payment is processed
              securely by Stripe. We do not store your credit card information. Stripe&apos;s
              privacy policy governs the handling of your payment data.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-2">Third-Party Services</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Stripe — payment processing</li>
              <li>Printful — merchandise fulfillment</li>
              <li>Google AdSense — advertising</li>
              <li>Vercel — hosting</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-2">Data Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third
              parties beyond the services listed above, which are necessary for the operation
              of this website.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-2">Contact</h2>
            <p>
              If you have questions about this privacy policy, please contact us at
              info@alstonanalystics.com.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
