'use client';

import { useMemo } from 'react';
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

  return (
    <div className="min-h-screen bg-black">
      {/* Aura Visualization */}
      <div className="pt-8 px-4">
        <AuraReveal hash={hash} />
      </div>

      {/* Archetype */}
      <ArchetypeCard archetype={archetype} />

      {/* Color Meaning */}
      <ColorMeaning meaning={archetype.colorMeaning} />

      {/* Personality Insights */}
      <PersonalityInsights insights={insights} />

      {/* Rarity */}
      <RarityBadge rarity={rarity} />

      {/* Share */}
      <ShareButtons hash={hash} archetypeName={archetype.name} />

      {/* Download Upsell */}
      <DownloadUpsell hash={hash} />

      {/* Merch */}
      <MerchSection hash={hash} />

      {/* Retake */}
      <div className="text-center py-8 pb-16">
        <Link
          href="/quiz"
          className="text-white/40 hover:text-white/70 text-sm underline underline-offset-4 transition-colors"
        >
          Retake the quiz
        </Link>
      </div>
    </div>
  );
}
