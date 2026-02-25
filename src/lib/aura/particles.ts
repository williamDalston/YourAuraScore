import type { Dimensions } from '@/lib/quiz/types';
import type { AuraPalette } from './palette';
import { hslToRgb } from './palette';

export type ParticleBehavior = 'swirl' | 'float' | 'pulse' | 'drift';

export interface Particle {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  vx: number;
  vy: number;
  radius: number;
  color: [number, number, number];
  alpha: number;
  life: number;
  maxLife: number;
  behavior: ParticleBehavior;
}

function getParticleBehavior(dimensions: Dimensions): ParticleBehavior {
  const { energy, rhythm } = dimensions;
  if (rhythm > 65 && energy > 50) return 'swirl';
  if (energy < 35) return 'float';
  if (rhythm > 40 && rhythm <= 65) return 'pulse';
  return 'drift';
}

function getParticleCount(dimensions: Dimensions): number {
  const { energy, rhythm } = dimensions;
  const base = 200;
  const extra = ((energy + rhythm) / 200) * 300;
  return Math.round(base + extra);
}

export function createParticles(
  dimensions: Dimensions,
  palette: AuraPalette,
  width: number,
  height: number,
  prng: () => number
): Particle[] {
  const count = getParticleCount(dimensions);
  const behavior = getParticleBehavior(dimensions);
  const particles: Particle[] = [];

  const colors = [
    hslToRgb(palette.primary),
    hslToRgb(palette.secondary),
    hslToRgb(palette.accent),
    hslToRgb(palette.highlight),
  ];

  for (let i = 0; i < count; i++) {
    const x = prng() * width;
    const y = prng() * height;
    const color = colors[Math.floor(prng() * colors.length)];
    const maxLife = 200 + prng() * 300;

    particles.push({
      x,
      y,
      prevX: x,
      prevY: y,
      vx: (prng() - 0.5) * 2,
      vy: (prng() - 0.5) * 2,
      radius: 1 + prng() * 3,
      color,
      alpha: 0.1 + prng() * 0.5,
      life: prng() * maxLife,
      maxLife,
      behavior,
    });
  }

  return particles;
}

export function updateParticles(
  particles: Particle[],
  width: number,
  height: number,
  time: number,
  energy: number
): void {
  const speed = 0.3 + (energy / 100) * 1.5;
  const centerX = width / 2;
  const centerY = height / 2;

  for (const p of particles) {
    p.prevX = p.x;
    p.prevY = p.y;

    switch (p.behavior) {
      case 'swirl': {
        const dx = p.x - centerX;
        const dy = p.y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) + 0.02 * speed;
        p.vx += (Math.cos(angle) * speed * 0.3 - p.vx) * 0.05;
        p.vy += (Math.sin(angle) * speed * 0.3 - p.vy) * 0.05;
        // Pull slightly toward center
        p.vx -= dx * 0.0001;
        p.vy -= dy * 0.0001;
        break;
      }
      case 'float': {
        p.vx += Math.sin(time * 0.001 + p.y * 0.01) * 0.02 * speed;
        p.vy -= 0.02 * speed; // Gentle upward drift
        p.vx *= 0.99;
        p.vy *= 0.99;
        break;
      }
      case 'pulse': {
        const pulse = Math.sin(time * 0.003 + p.life * 0.1) * speed;
        const dx = p.x - centerX;
        const dy = p.y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        p.vx += (dx / dist) * pulse * 0.05;
        p.vy += (dy / dist) * pulse * 0.05;
        p.vx *= 0.97;
        p.vy *= 0.97;
        break;
      }
      case 'drift': {
        p.vx += Math.cos(time * 0.001 + p.x * 0.005) * 0.05 * speed;
        p.vy += Math.sin(time * 0.0008 + p.y * 0.005) * 0.05 * speed;
        p.vx *= 0.98;
        p.vy *= 0.98;
        break;
      }
    }

    p.x += p.vx;
    p.y += p.vy;
    p.life++;

    // Wrap around edges
    if (p.x < -10) p.x = width + 10;
    if (p.x > width + 10) p.x = -10;
    if (p.y < -10) p.y = height + 10;
    if (p.y > height + 10) p.y = -10;

    // Reset life cycle
    if (p.life > p.maxLife) {
      p.life = 0;
    }

    // Fade based on life cycle
    const lifeFrac = p.life / p.maxLife;
    p.alpha = lifeFrac < 0.1
      ? lifeFrac / 0.1 * 0.6
      : lifeFrac > 0.9
      ? (1 - lifeFrac) / 0.1 * 0.6
      : 0.6;
  }
}

export function renderParticles(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  revealProgress: number
): void {
  for (const p of particles) {
    const alpha = p.alpha * revealProgress;
    if (alpha < 0.01) continue;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${alpha})`;
    ctx.fill();
  }
}
