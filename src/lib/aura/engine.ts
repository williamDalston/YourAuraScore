import type { Dimensions } from '@/lib/quiz/types';
import { generatePalette, hslToString } from './palette';
import { createSeededNoise, getNoiseConfig } from './noise';
import { createParticles, updateParticles, renderParticles } from './particles';
import { getPatternType, renderPattern } from './patterns';
import { renderBackground, renderNoiseField } from './renderer';
import { hashToSeed, decodeAnswers } from '@/lib/quiz/hash';
import { calculateDimensions } from '@/lib/quiz/scoring';
import type { AuraPalette } from './palette';
import type { Particle } from './particles';
import type { PatternType } from './patterns';
import type { NoiseConfig } from './noise';

export interface AuraEngineState {
  dimensions: Dimensions;
  palette: AuraPalette;
  particles: Particle[];
  patternType: PatternType;
  noiseConfig: NoiseConfig;
  noise2D: (x: number, y: number) => number;
  noise3D: (x: number, y: number, z: number) => number;
  width: number;
  height: number;
  time: number;
  revealProgress: number;
  animationId: number | null;
}

export function initEngine(
  hash: string,
  canvas: HTMLCanvasElement,
  width: number,
  height: number
): AuraEngineState {
  const seed = hashToSeed(hash);
  const answers = decodeAnswers(hash);
  const dimensions = calculateDimensions(answers);
  const palette = generatePalette(dimensions);
  const { noise2D, noise3D, prng } = createSeededNoise(seed);
  const noiseConfig = getNoiseConfig(dimensions.complexity);
  const particles = createParticles(dimensions, palette, width, height, prng);
  const patternType = getPatternType(answers[5] ?? 1); // Q5: pattern type

  canvas.width = width;
  canvas.height = height;

  return {
    dimensions,
    palette,
    particles,
    patternType,
    noiseConfig,
    noise2D,
    noise3D,
    width,
    height,
    time: 0,
    revealProgress: 0,
    animationId: null,
  };
}

export function renderFrame(
  ctx: CanvasRenderingContext2D,
  state: AuraEngineState
): void {
  const { width, height, palette, particles, patternType, noiseConfig, noise2D, noise3D, time, revealProgress, dimensions } = state;

  // Clear
  ctx.clearRect(0, 0, width, height);

  // 1. Background gradient
  renderBackground(ctx, width, height, palette, revealProgress);

  // 2. Noise field
  renderNoiseField(ctx, width, height, noise2D, noise3D, noiseConfig, palette, time, revealProgress);

  // 3. Pattern overlay
  renderPattern(ctx, patternType, width, height, time, hslToString(palette.highlight, 0.15), revealProgress);

  // 4. Particles
  updateParticles(particles, width, height, time, dimensions.energy);
  renderParticles(ctx, particles, revealProgress);

  // 5. Center glow
  const glowGrad = ctx.createRadialGradient(
    width / 2, height * 0.4, 0,
    width / 2, height * 0.4, width * 0.4
  );
  glowGrad.addColorStop(0, hslToString(palette.primary, 0.15 * revealProgress));
  glowGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = glowGrad;
  ctx.fillRect(0, 0, width, height);

  // 6. Vignette
  const vigGrad = ctx.createRadialGradient(
    width / 2, height / 2, width * 0.3,
    width / 2, height / 2, width * 0.8
  );
  vigGrad.addColorStop(0, 'transparent');
  vigGrad.addColorStop(1, 'rgba(0,0,0,0.4)');
  ctx.fillStyle = vigGrad;
  ctx.fillRect(0, 0, width, height);
}

export function startAnimation(
  canvas: HTMLCanvasElement,
  state: AuraEngineState,
  onStateUpdate?: (state: AuraEngineState) => void
): () => void {
  const ctx = canvas.getContext('2d')!;
  let running = true;
  const revealDuration = 3500; // 3.5 seconds reveal
  const startTime = performance.now();

  function animate() {
    if (!running) return;

    const elapsed = performance.now() - startTime;
    state.time = elapsed;
    state.revealProgress = Math.min(1, elapsed / revealDuration);

    // Ease in the reveal
    state.revealProgress = easeInOutCubic(state.revealProgress);

    renderFrame(ctx, state);
    onStateUpdate?.(state);

    state.animationId = requestAnimationFrame(animate);
  }

  animate();

  return () => {
    running = false;
    if (state.animationId !== null) {
      cancelAnimationFrame(state.animationId);
    }
  };
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function exportAura(canvas: HTMLCanvasElement): string {
  return canvas.toDataURL('image/png');
}
