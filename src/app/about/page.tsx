import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About | YourAuraScore',
  description: 'Learn about YourAuraScore — AI-powered personality visualization.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      <nav className="flex items-center justify-between px-6 py-5">
        <Link href="/" className="text-white font-bold text-lg tracking-tight">
          YourAura<span className="text-purple-400">Score</span>
        </Link>
      </nav>

      <main className="max-w-2xl mx-auto px-5 sm:px-6 py-10 sm:py-12">
        <h1 className="text-white text-2xl sm:text-3xl font-bold mb-8">About YourAuraScore</h1>

        <div className="space-y-6 text-white/70 text-[15px] sm:text-sm leading-relaxed">
          <section>
            <h2 className="text-white text-lg font-semibold mb-2">What Is YourAuraScore?</h2>
            <p>
              YourAuraScore is an AI-powered personality visualization tool. Answer 12 quick,
              visual questions and we&apos;ll generate a stunning, one-of-a-kind aura visualization
              that reflects your unique personality.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-2">How Does It Work?</h2>
            <p>
              Each quiz answer maps to six personality dimensions: Energy, Warmth, Complexity,
              Luminance, Rhythm, and Depth. These dimensions drive an algorithmic art generator
              that creates your unique aura using noise fields, particle systems, and color
              harmonics.
            </p>
            <p className="mt-3">
              Your aura is deterministic — the same answers will always produce the same
              visualization. This means you can share your results and others will see
              exactly your aura.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-2">The 24 Archetypes</h2>
            <p>
              Based on your dominant personality dimension and your final &quot;vibe check&quot;
              answer, you&apos;ll be matched with one of 24 unique archetypes — from
              &quot;The Firestarter&quot; to &quot;The Dreamweaver&quot; to &quot;The Abyss Walker.&quot;
              Each archetype comes with a personalized description and personality insights.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-2">The Art</h2>
            <p>
              Every aura is generated in real-time in your browser using HTML Canvas.
              The generative art engine uses simplex noise, particle physics (Verlet integration),
              and color theory to create visualizations beautiful enough to use as your
              phone wallpaper.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-2">Your Privacy</h2>
            <p>
              Your quiz answers never leave your browser. Everything is processed client-side.
              There&apos;s no database, no account, no tracking of your personality data. Your
              results are encoded in the URL, giving you full control over sharing.
            </p>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/quiz"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-600 to-purple-600
                       hover:from-violet-500 hover:to-purple-500 text-white font-semibold
                       px-8 py-3 rounded-full transition-all duration-200"
          >
            Take the Quiz
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </main>

      <footer className="border-t border-white/10 px-6 py-8">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-white/40 text-sm">&copy; 2026 YourAuraScore</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-white/40 hover:text-white/70 text-sm transition-colors">Privacy</Link>
            <Link href="/terms" className="text-white/40 hover:text-white/70 text-sm transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
