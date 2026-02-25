import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'YourAuraScore — Discover Your Unique Aura',
  description: 'Take a 60-second visual personality quiz and get a stunning, one-of-a-kind aura visualization. Beautiful enough for your wallpaper.',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background aura effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-[600px] h-[600px] rounded-full opacity-20 blur-[100px] animate-pulse-slow"
          style={{ background: 'radial-gradient(circle, #7c3aed, #ec4899, transparent)' }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full opacity-15
                     blur-[80px] animate-float"
          style={{ background: 'radial-gradient(circle, #3b82f6, #06b6d4, transparent)' }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-[350px] h-[350px] rounded-full opacity-10
                     blur-[90px] animate-float-delayed"
          style={{ background: 'radial-gradient(circle, #f59e0b, #ef4444, transparent)' }}
        />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5">
        <span className="text-white font-bold text-lg tracking-tight">
          YourAura<span className="text-purple-400">Score</span>
        </span>
        <Link
          href="/about"
          className="text-white/50 hover:text-white text-sm transition-colors"
        >
          About
        </Link>
      </nav>

      {/* Hero */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-purple-400 text-sm font-medium uppercase tracking-[0.2em] mb-6">
            AI-Powered Personality Visualization
          </p>

          <h1 className="text-white text-5xl sm:text-7xl font-bold leading-[1.1] mb-6">
            Discover Your{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
              Aura
            </span>
          </h1>

          <p className="text-white/60 text-lg sm:text-xl max-w-lg mx-auto mb-10 leading-relaxed">
            Answer 12 visual questions. Get a stunning, one-of-a-kind aura visualization
            that reveals your true energy. Takes 60 seconds.
          </p>

          <Link
            href="/quiz"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-600 to-purple-600
                       hover:from-violet-500 hover:to-purple-500 text-white font-semibold
                       text-lg px-10 py-4 rounded-full transition-all duration-200
                       shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40
                       hover:scale-105 active:scale-95"
          >
            Take the Quiz
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>

          <p className="text-white/30 text-sm mt-6">
            Free &bull; No signup required &bull; 60 seconds
          </p>
        </div>
      </main>

      {/* Features */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl mb-3">&#127912;</div>
            <h3 className="text-white font-semibold mb-2">Unique to You</h3>
            <p className="text-white/50 text-sm leading-relaxed">
              Your aura is generated from your personality. No two are exactly alike.
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">&#10024;</div>
            <h3 className="text-white font-semibold mb-2">Wallpaper-Ready</h3>
            <p className="text-white/50 text-sm leading-relaxed">
              Beautiful enough to use as your phone wallpaper. Available in 4K resolution.
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">&#129504;</div>
            <h3 className="text-white font-semibold mb-2">Deep Insights</h3>
            <p className="text-white/50 text-sm leading-relaxed">
              Get your archetype, personality insights, and see how rare your aura is.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 px-6 py-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-white/30 text-sm">&copy; 2026 YourAuraScore</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-white/30 hover:text-white/60 text-sm transition-colors">Privacy</Link>
            <Link href="/terms" className="text-white/30 hover:text-white/60 text-sm transition-colors">Terms</Link>
            <Link href="/about" className="text-white/30 hover:text-white/60 text-sm transition-colors">About</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
