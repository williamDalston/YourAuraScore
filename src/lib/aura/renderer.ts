import type { AuraPalette } from './palette';
import type { NoiseConfig } from './noise';
import { hslToString, hslToRgb } from './palette';
import { fbm, cellularNoise, animatedNoise } from './noise';

export function renderBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  palette: AuraPalette,
  revealProgress: number
): void {
  // Deep dark background
  ctx.fillStyle = hslToString(palette.background);
  ctx.fillRect(0, 0, width, height);

  // Radial gradient glow from center
  const cx = width / 2;
  const cy = height * 0.4;
  const maxRadius = Math.max(width, height) * 0.8;

  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxRadius);
  grad.addColorStop(0, hslToString(palette.primary, 0.3 * revealProgress));
  grad.addColorStop(0.3, hslToString(palette.secondary, 0.2 * revealProgress));
  grad.addColorStop(0.6, hslToString(palette.accent, 0.1 * revealProgress));
  grad.addColorStop(1, 'transparent');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);
}

export function renderNoiseField(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  noise2D: (x: number, y: number) => number,
  noise3D: (x: number, y: number, z: number) => number,
  config: NoiseConfig,
  palette: AuraPalette,
  time: number,
  revealProgress: number
): void {
  // Render at lower resolution for performance, then scale
  const scale = 4;
  const sw = Math.ceil(width / scale);
  const sh = Math.ceil(height / scale);

  const imageData = ctx.createImageData(sw, sh);
  const data = imageData.data;

  const primaryRgb = hslToRgb(palette.primary);
  const secondaryRgb = hslToRgb(palette.secondary);
  const accentRgb = hslToRgb(palette.accent);

  for (let y = 0; y < sh; y++) {
    for (let x = 0; x < sw; x++) {
      const wx = x * scale;
      const wy = y * scale;

      let noiseVal: number;
      if (config.type === 'cellular') {
        noiseVal = cellularNoise(noise2D, wx, wy, config.frequency);
      } else if (config.type === 'combined') {
        const simplex = fbm(noise2D, wx, wy, config);
        const cell = cellularNoise(noise2D, wx, wy, config.frequency * 1.5);
        noiseVal = simplex * 0.6 + cell * 0.4;
      } else {
        noiseVal = animatedNoise(noise3D, wx, wy, time, config);
      }

      // Normalize noise to 0-1
      const n = (noiseVal + 1) / 2;

      // Color blend based on noise value
      let r: number, g: number, b: number;
      if (n < 0.33) {
        const t = n / 0.33;
        r = primaryRgb[0] * (1 - t) + secondaryRgb[0] * t;
        g = primaryRgb[1] * (1 - t) + secondaryRgb[1] * t;
        b = primaryRgb[2] * (1 - t) + secondaryRgb[2] * t;
      } else if (n < 0.66) {
        const t = (n - 0.33) / 0.33;
        r = secondaryRgb[0] * (1 - t) + accentRgb[0] * t;
        g = secondaryRgb[1] * (1 - t) + accentRgb[1] * t;
        b = secondaryRgb[2] * (1 - t) + accentRgb[2] * t;
      } else {
        const t = (n - 0.66) / 0.34;
        r = accentRgb[0] * (1 - t) + primaryRgb[0] * t;
        g = accentRgb[1] * (1 - t) + primaryRgb[1] * t;
        b = accentRgb[2] * (1 - t) + primaryRgb[2] * t;
      }

      const idx = (y * sw + x) * 4;
      const alpha = 0.35 * revealProgress * 255;
      data[idx] = r;
      data[idx + 1] = g;
      data[idx + 2] = b;
      data[idx + 3] = alpha;
    }
  }

  // Draw scaled noise field
  const offscreen = new OffscreenCanvas(sw, sh);
  const offCtx = offscreen.getContext('2d')!;
  offCtx.putImageData(imageData, 0, 0);

  ctx.save();
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(offscreen, 0, 0, width, height);
  ctx.restore();
}
