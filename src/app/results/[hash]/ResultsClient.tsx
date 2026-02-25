'use client';

import { useMemo } from 'react';
import { decodeAnswers } from '@/lib/quiz/hash';
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

export default function ResultsClient({ hash }: ResultsClientProps) {
  const { archetype, rarity, insights } = useMemo(() => {
    const answers = decodeAnswers(hash);
    const dimensions = calculateDimensions(answers);
    const vibeAnswer = answers[12] ?? 0; // Q12: final vibe check
    const archetype = matchArchetype(dimensions, vibeAnswer);
    const rarity = calculateRarity(dimensions);
    const insights = generateInsights(dimensions);
    return { archetype, rarity, insights };
  }, [hash]);

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
