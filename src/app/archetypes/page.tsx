import type { Metadata } from 'next';
import Link from 'next/link';
import { archetypes } from '@/lib/archetypes/definitions';

export const metadata: Metadata = {
  title: 'All 24 Aura Archetypes | YourAuraScore',
  description: 'Explore all 24 unique aura archetypes — from The Firestarter to The Dreamweaver. Discover which personality archetype matches your energy.',
};

const DIMENSION_COLORS: Record<string, string> = {
  energy: 'from-red-500/20 to-orange-500/20 border-red-500/30',
  warmth: 'from-amber-500/20 to-rose-500/20 border-amber-500/30',
  complexity: 'from-indigo-500/20 to-teal-500/20 border-indigo-500/30',
  luminance: 'from-yellow-500/20 to-white/10 border-yellow-500/30',
  rhythm: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
  depth: 'from-slate-500/20 to-violet-500/20 border-slate-500/30',
};

const DIMENSION_LABELS: Record<string, string> = {
  energy: 'Energy',
  warmth: 'Warmth',
  complexity: 'Complexity',
  luminance: 'Luminance',
  rhythm: 'Rhythm',
  depth: 'Depth',
};

export default function ArchetypesPage() {
  // Group by dominant dimension
  const grouped = archetypes.reduce((acc, arch) => {
    const dim = arch.dominantDimension;
    if (!acc[dim]) acc[dim] = [];
    acc[dim].push(arch);
    return acc;
  }, {} as Record<string, typeof archetypes>);

  const dimensionOrder = ['energy', 'warmth', 'complexity', 'luminance', 'rhythm', 'depth'];

  return (
    <div className="min-h-screen bg-black">
      <nav className="flex items-center justify-between px-6 py-5">
        <Link href="/" className="text-white font-bold text-lg tracking-tight">
          YourAura<span className="text-purple-400">Score</span>
        </Link>
        <Link
          href="/quiz"
          className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
        >
          Take the Quiz
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto px-5 sm:px-6 py-10 sm:py-12">
        <h1 className="text-white text-2xl sm:text-4xl font-bold mb-4">The 24 Aura Archetypes</h1>
        <p className="text-white/60 text-[15px] sm:text-base leading-relaxed mb-10 sm:mb-12 max-w-2xl">
          Every aura maps to one of 24 unique archetypes, determined by your dominant personality
          dimension and your final vibe check. Explore them all below, then take the quiz to discover yours.
        </p>

        {dimensionOrder.map((dim) => {
          const group = grouped[dim];
          if (!group) return null;
          const colors = DIMENSION_COLORS[dim] || '';
          return (
            <section key={dim} className="mb-16">
              <h2 className="text-white text-xl font-semibold mb-2 capitalize">
                {DIMENSION_LABELS[dim]} Archetypes
              </h2>
              <p className="text-white/40 text-sm mb-6">
                Dominant trait: {DIMENSION_LABELS[dim]}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {group.map((arch) => (
                  <div
                    key={arch.id}
                    className={`bg-gradient-to-br ${colors} border rounded-2xl p-5 transition-all hover:scale-[1.02]`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-white font-bold text-base sm:text-lg">{arch.name}</h3>
                      <span className="text-white/40 text-xs uppercase tracking-wider mt-1 shrink-0">
                        {arch.modifier}
                      </span>
                    </div>
                    <p className="text-purple-300/80 text-sm italic mb-3">
                      &ldquo;{arch.tagline}&rdquo;
                    </p>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {arch.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        <div className="text-center py-8">
          <Link
            href="/quiz"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-600 to-purple-600
                       hover:from-violet-500 hover:to-purple-500 text-white font-semibold
                       text-lg px-10 py-4 rounded-full transition-all duration-200
                       shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
          >
            Discover Your Archetype
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </main>

      <footer className="border-t border-white/10 px-6 py-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-white/40 text-sm">&copy; 2026 YourAuraScore</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-white/40 hover:text-white/70 text-sm transition-colors">Privacy</Link>
            <Link href="/terms" className="text-white/40 hover:text-white/70 text-sm transition-colors">Terms</Link>
            <Link href="/about" className="text-white/40 hover:text-white/70 text-sm transition-colors">About</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
