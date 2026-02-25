import type { Dimensions } from '@/lib/quiz/types';
import { archetypes, type Archetype } from './definitions';

const DIMENSION_KEYS: (keyof Dimensions)[] = [
  'energy', 'warmth', 'complexity', 'luminance', 'rhythm', 'depth'
];

const MODIFIER_MAP: Record<number, string> = {
  0: 'serene',
  1: 'bold',
  2: 'mystic',
  3: 'wild',
};

export function matchArchetype(dimensions: Dimensions, vibeAnswer: number): Archetype {
  // Find the dominant dimension
  let maxKey: keyof Dimensions = 'energy';
  let maxVal = -1;

  for (const key of DIMENSION_KEYS) {
    if (dimensions[key] > maxVal) {
      maxVal = dimensions[key];
      maxKey = key;
    }
  }

  // Get modifier from Q12 answer (Serene/Bold/Mystic/Wild)
  const modifier = MODIFIER_MAP[vibeAnswer] || 'serene';

  // Find matching archetype
  const id = `${maxKey}-${modifier}`;
  const match = archetypes.find(a => a.id === id);

  // Fallback to first archetype with matching dimension
  return match || archetypes.find(a => a.dominantDimension === maxKey) || archetypes[0];
}

export function calculateRarity(dimensions: Dimensions): number {
  // More extreme/polarized scores = rarer
  // Average deviation from center (50)
  let totalDeviation = 0;
  for (const key of DIMENSION_KEYS) {
    totalDeviation += Math.abs(dimensions[key] - 50);
  }
  const avgDeviation = totalDeviation / DIMENSION_KEYS.length;

  // Convert to rarity percentage (higher deviation = rarer = lower %)
  // avgDeviation ranges from 0 (all 50s, very common) to 50 (all extremes, very rare)
  const rarity = Math.max(1, Math.min(45, Math.round(50 - avgDeviation)));

  return rarity;
}

export function getDominantDimensions(dimensions: Dimensions): (keyof Dimensions)[] {
  const sorted = DIMENSION_KEYS
    .map(key => ({ key, value: dimensions[key] }))
    .sort((a, b) => b.value - a.value);

  return sorted.slice(0, 3).map(d => d.key);
}
