import type { Dimensions } from '@/lib/quiz/types';

export interface HSL {
  h: number; // 0-360
  s: number; // 0-100
  l: number; // 0-100
}

export interface AuraPalette {
  primary: HSL;
  secondary: HSL;
  accent: HSL;
  background: HSL;
  highlight: HSL;
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

export function generatePalette(dimensions: Dimensions): AuraPalette {
  const { energy, warmth, complexity, luminance, depth } = dimensions;

  // Primary hue: warmth drives the warm-cool axis
  // High warmth → reds/oranges (0-60), Low warmth → blues/purples (200-300)
  const primaryHue = warmth > 50
    ? 60 - ((warmth - 50) / 50) * 60    // 60 → 0 (orange to red)
    : 200 + ((50 - warmth) / 50) * 100;  // 200 → 300 (blue to purple)

  const primarySat = clamp(40 + (energy / 100) * 50, 40, 90);
  const primaryLit = clamp(30 + (luminance / 100) * 35, 30, 65);

  // Secondary: complementary shifted by complexity
  const secondaryShift = 120 + ((complexity / 100) * 60 - 30);
  const secondaryHue = (primaryHue + secondaryShift) % 360;
  const secondarySat = clamp(primarySat - 10, 30, 80);
  const secondaryLit = clamp(primaryLit + 5, 30, 65);

  // Accent: triadic harmony
  const accentHue = (primaryHue + 240 + (depth / 100) * 30) % 360;
  const accentSat = clamp(50 + (energy / 100) * 40, 50, 95);
  const accentLit = clamp(40 + (luminance / 100) * 25, 40, 65);

  // Background: desaturated, shifted toward depth
  const bgLit = clamp(5 + (luminance / 100) * 15, 3, 20);
  const bgSat = clamp(10 + (depth / 100) * 20, 5, 30);
  const bgHue = (primaryHue + 180) % 360;

  // Highlight: bright version of primary
  const highlightHue = (primaryHue + 30) % 360;
  const highlightSat = clamp(60 + (energy / 100) * 35, 60, 95);
  const highlightLit = clamp(55 + (luminance / 100) * 25, 55, 80);

  return {
    primary: { h: primaryHue, s: primarySat, l: primaryLit },
    secondary: { h: secondaryHue, s: secondarySat, l: secondaryLit },
    accent: { h: accentHue, s: accentSat, l: accentLit },
    background: { h: bgHue, s: bgSat, l: bgLit },
    highlight: { h: highlightHue, s: highlightSat, l: highlightLit },
  };
}

export function hslToString(hsl: HSL, alpha = 1): string {
  return `hsla(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%, ${alpha})`;
}

export function hslToRgb(hsl: HSL): [number, number, number] {
  const s = hsl.s / 100;
  const l = hsl.l / 100;
  const h = hsl.h;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0, g = 0, b = 0;

  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }

  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255),
  ];
}
