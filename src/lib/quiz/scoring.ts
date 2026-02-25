import { questions } from './questions';
import type { Dimensions } from './types';

const DIMENSION_KEYS: (keyof Dimensions)[] = [
  'energy', 'warmth', 'complexity', 'luminance', 'rhythm', 'depth'
];

export function calculateDimensions(answers: Record<number, number>): Dimensions {
  const raw: Dimensions = { energy: 0, warmth: 0, complexity: 0, luminance: 0, rhythm: 0, depth: 0 };
  const counts: Record<keyof Dimensions, number> = { energy: 0, warmth: 0, complexity: 0, luminance: 0, rhythm: 0, depth: 0 };

  for (const question of questions) {
    const answerId = answers[question.id];
    if (answerId === undefined) continue;

    const weights = question.dimensionWeights[answerId];
    if (!weights) continue;

    for (const key of DIMENSION_KEYS) {
      if (weights[key] !== undefined) {
        raw[key] += weights[key]!;
        counts[key]++;
      }
    }
  }

  // Normalize each dimension to 0-100
  const dimensions: Dimensions = { energy: 50, warmth: 50, complexity: 50, luminance: 50, rhythm: 50, depth: 50 };

  for (const key of DIMENSION_KEYS) {
    if (counts[key] > 0) {
      // Raw values are designed to sum to roughly 0-100 range per dimension
      dimensions[key] = Math.max(0, Math.min(100, Math.round(raw[key] / counts[key])));
    }
  }

  return dimensions;
}
