import { createNoise2D, createNoise3D } from 'simplex-noise';

export type NoiseType = 'smooth' | 'cellular' | 'combined';

// Simple seeded PRNG (mulberry32)
function mulberry32(seed: number): () => number {
  return function() {
    seed |= 0;
    seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface NoiseConfig {
  type: NoiseType;
  octaves: number;
  frequency: number;
  amplitude: number;
  lacunarity: number;
  persistence: number;
}

export function createSeededNoise(seed: number) {
  const prng = mulberry32(seed);
  const noise2D = createNoise2D(prng);
  const noise3D = createNoise3D(prng);
  return { noise2D, noise3D, prng };
}

export function getNoiseConfig(complexity: number): NoiseConfig {
  if (complexity < 35) {
    return {
      type: 'smooth',
      octaves: 2,
      frequency: 0.003,
      amplitude: 1.0,
      lacunarity: 2.0,
      persistence: 0.5,
    };
  } else if (complexity > 65) {
    return {
      type: 'cellular',
      octaves: 3,
      frequency: 0.006,
      amplitude: 1.0,
      lacunarity: 2.2,
      persistence: 0.6,
    };
  }
  return {
    type: 'combined',
    octaves: 3,
    frequency: 0.004,
    amplitude: 1.0,
    lacunarity: 2.0,
    persistence: 0.55,
  };
}

/**
 * Fractal Brownian Motion using simplex noise
 */
export function fbm(
  noise2D: (x: number, y: number) => number,
  x: number,
  y: number,
  config: NoiseConfig
): number {
  let value = 0;
  let amplitude = config.amplitude;
  let frequency = config.frequency;

  for (let i = 0; i < config.octaves; i++) {
    value += amplitude * noise2D(x * frequency, y * frequency);
    amplitude *= config.persistence;
    frequency *= config.lacunarity;
  }

  return value;
}

/**
 * Worley/cellular noise approximation using simplex noise
 */
export function cellularNoise(
  noise2D: (x: number, y: number) => number,
  x: number,
  y: number,
  scale: number
): number {
  const nx = x * scale;
  const ny = y * scale;
  // Create a cellular-like pattern by taking abs of noise
  const n1 = Math.abs(noise2D(nx, ny));
  const n2 = Math.abs(noise2D(nx * 2.1, ny * 2.1));
  return Math.min(n1, n2) * 2;
}

/**
 * Time-varying noise for animation
 */
export function animatedNoise(
  noise3D: (x: number, y: number, z: number) => number,
  x: number,
  y: number,
  time: number,
  config: NoiseConfig
): number {
  let value = 0;
  let amplitude = config.amplitude;
  let frequency = config.frequency;

  for (let i = 0; i < config.octaves; i++) {
    value += amplitude * noise3D(x * frequency, y * frequency, time * 0.3);
    amplitude *= config.persistence;
    frequency *= config.lacunarity;
  }

  return value;
}
