'use client';

import { useMemo, useState, useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { decodeAnswers, isValidHash } from '@/lib/quiz/hash';
import { calculateDimensions } from '@/lib/quiz/scoring';
import { matchArchetype, calculateRarity } from '@/lib/archetypes/matcher';
import { generateInsights } from '@/lib/archetypes/insights';
import AuraReveal from '@/components/aura/AuraReveal';
import ArchetypeCard from '@/components/results/ArchetypeCard';
import ColorMeaning from '@/components/results/ColorMeaning';
import PersonalityInsights from '@/components/results/PersonalityInsights';
import RarityBadge from '@/components/results/RarityBadge';
import ShareButtons from '@/components/share/ShareButtons';
import DownloadUpsell from '@/components/results/DownloadUpsell';
import MerchSection from '@/components/results/MerchSection';
import Link from 'next/link';

interface ResultsClientProps {
  hash: string;
}

function InvalidHashFallback() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      <h1 className="text-white text-xl font-semibold mb-2">Invalid or expired link</h1>
      <p className="text-white/60 text-sm text-center mb-6 max-w-sm">
        This results link may be corrupted or no longer valid. Take the quiz to get your unique aura.
      </p>
      <Link
        href="/quiz"
        className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500
                   text-white font-semibold px-8 py-3 rounded-full transition-all"
      >
        Take the Quiz
      </Link>
    </div>
  );
}

export default function ResultsClient({ hash }: ResultsClientProps) {
  const searchParams = useSearchParams();
  const downloadParam = searchParams.get('download');
  const [saveAura, setSaveAura] = useState<(() => void) | null>(null);
  const [downloadTriggered, setDownloadTriggered] = useState(false);
  const hasAutoDownloaded = useRef(false);

  const handleCanvasReady = useCallback((saveFn: () => void) => {
    setSaveAura(() => saveFn);
  }, []);

  // Auto-trigger download after purchase redirect
  useEffect(() => {
    if (
      downloadParam &&
      saveAura &&
      !hasAutoDownloaded.current
    ) {
      hasAutoDownloaded.current = true;
      setDownloadTriggered(true);
      // Small delay to ensure canvas is fully rendered
      const timer = setTimeout(() => {
        saveAura();
        setTimeout(() => setDownloadTriggered(false), 3000);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [downloadParam, saveAura]);

  const result = useMemo(() => {
    if (!isValidHash(hash)) return null;
    try {
      const answers = decodeAnswers(hash);
      const dimensions = calculateDimensions(answers);
      const vibeAnswer = answers[12] ?? 0; // Q12: final vibe check
      const archetype = matchArchetype(dimensions, vibeAnswer);
      const rarity = calculateRarity(dimensions);
      const insights = generateInsights(dimensions);
      return { archetype, rarity, insights };
    } catch {
      return null;
    }
  }, [hash]);

  if (!result) return <InvalidHashFallback />;

  const { archetype, rarity, insights } = result;

  const productLabels: Record<string, string> = {
    wallpaper: 'HD Wallpaper',
    animated: 'Animated Aura',
    report: 'Personality Report',
    bundle: 'Complete Aura Pack',
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-white font-bold text-lg tracking-tight">
          YourAura<span className="text-purple-400">Score</span>
        </Link>
        <Link
          href="/quiz"
          className="text-white/50 hover:text-white text-sm transition-colors"
        >
          Retake Quiz
        </Link>
      </nav>

      {/* Purchase success banner */}
      {downloadParam && (
        <div className="bg-gradient-to-r from-emerald-600/90 to-teal-600/90 text-white text-center py-3 px-4 text-sm">
          {downloadTriggered ? (
            <span>Downloading your {productLabels[downloadParam] ?? 'purchase'}...</span>
          ) : (
            <span>Thank you for your purchase! Your {productLabels[downloadParam] ?? 'download'} is ready.</span>
          )}
        </div>
      )}

      {/* Aura Visualization */}
      <div className="pt-8 px-4">
        <AuraReveal hash={hash} onCanvasReady={handleCanvasReady} />
      </div>

      {/* Preview Save — low-res to differentiate from paid HD */}
      {saveAura && (
        <div className="flex justify-center px-6 pt-4">
          <button
            onClick={saveAura}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white
                       rounded-full px-6 py-2.5 text-sm transition-colors cursor-pointer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            Save Preview
          </button>
        </div>
      )}

      {/* Archetype — builds emotional investment */}
      <ArchetypeCard archetype={archetype} />

      {/* Color Meaning — deepens personal connection */}
      <ColorMeaning meaning={archetype.colorMeaning} />

      {/* Download Upsell — placed at emotional peak for max conversion */}
      <DownloadUpsell hash={hash} />

      {/* Rarity — validates uniqueness, reinforces purchase decision */}
      <RarityBadge rarity={rarity} />

      {/* Personality Insights */}
      <PersonalityInsights insights={insights} />

      {/* Share — after they've seen everything and considered purchasing */}
      <ShareButtons hash={hash} archetypeName={archetype.name} />

      {/* Merch — secondary revenue */}
      <MerchSection hash={hash} />

      {/* Footer */}
      <footer className="text-center py-8 pb-16 space-y-3">
        <Link
          href="/quiz"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600
                     hover:from-violet-500 hover:to-purple-500 text-white font-semibold
                     text-sm px-6 py-3 rounded-full transition-all"
        >
          Retake the Quiz
        </Link>
        <div className="flex justify-center gap-6 pt-2">
          <Link href="/archetypes" className="text-white/40 hover:text-white/70 text-xs transition-colors">Archetypes</Link>
          <Link href="/privacy" className="text-white/40 hover:text-white/70 text-xs transition-colors">Privacy</Link>
          <Link href="/terms" className="text-white/40 hover:text-white/70 text-xs transition-colors">Terms</Link>
        </div>
      </footer>
    </div>
  );
}
