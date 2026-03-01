export type PatternType = 'geometric' | 'organic' | 'chaotic' | 'minimal';

export function getPatternType(patternAnswer: number): PatternType {
  switch (patternAnswer) {
    case 0: return 'geometric';
    case 1: return 'organic';
    case 2: return 'chaotic';
    case 3: return 'minimal';
    default: return 'organic';
  }
}

export function renderPattern(
  ctx: CanvasRenderingContext2D,
  type: PatternType,
  width: number,
  height: number,
  time: number,
  color: string,
  revealProgress: number
): void {
  ctx.save();
  ctx.globalAlpha = 0.08 * revealProgress;
  ctx.strokeStyle = color;
  ctx.lineWidth = 0.5;

  switch (type) {
    case 'geometric':
      renderGeometric(ctx, width, height, time);
      break;
    case 'organic':
      renderOrganic(ctx, width, height, time);
      break;
    case 'chaotic':
      renderChaotic(ctx, width, height, time);
      break;
    case 'minimal':
      renderMinimal(ctx, width, height, time);
      break;
  }

  ctx.restore();
}

function renderGeometric(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number
) {
  const spacing = 80;
  const offset = (time * 0.2) % spacing;

  // Grid lines
  for (let x = -spacing + offset; x < width + spacing; x += spacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = -spacing + offset; y < height + spacing; y += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Sacred geometry: concentric circles at center
  const cx = width / 2;
  const cy = height / 2;
  for (let r = 50; r < Math.max(width, height); r += 100) {
    ctx.beginPath();
    ctx.arc(cx, cy, r + Math.sin(time * 0.001) * 10, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Hexagonal overlay
  const hexR = 60;
  for (let row = 0; row < height / hexR + 1; row++) {
    for (let col = 0; col < width / (hexR * 1.7) + 1; col++) {
      const x = col * hexR * 1.7 + (row % 2 === 0 ? 0 : hexR * 0.85);
      const y = row * hexR * 1.5;
      drawHexagon(ctx, x, y, hexR * 0.4);
    }
  }
}

function drawHexagon(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();
}

function renderOrganic(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number
) {
  // Flowing curves
  const curves = 8;
  for (let i = 0; i < curves; i++) {
    ctx.beginPath();
    const startY = (height / curves) * i;
    ctx.moveTo(0, startY);

    for (let x = 0; x < width; x += 5) {
      const wave = Math.sin(x * 0.005 + time * 0.001 + i) * 40
        + Math.sin(x * 0.01 + time * 0.0005) * 20;
      ctx.lineTo(x, startY + wave);
    }
    ctx.stroke();
  }

  // Vine-like spirals
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    const cx = width * (0.25 + i * 0.25);
    const cy = height * 0.5;
    for (let a = 0; a < Math.PI * 6; a += 0.1) {
      const r = a * 8 + Math.sin(time * 0.001) * 5;
      const x = cx + Math.cos(a + time * 0.0003) * r;
      const y = cy + Math.sin(a + time * 0.0003) * r;
      if (a === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
}

function renderChaotic(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number
) {
  // Splatter points (deterministic — uses sin-based pseudorandom)
  const seed = Math.sin(time * 0.0001) * 10000;
  for (let i = 0; i < 50; i++) {
    const x = ((Math.sin(i * 127.1 + seed) + 1) / 2) * width;
    const y = ((Math.sin(i * 311.7 + seed) + 1) / 2) * height;
    const r = 2 + Math.abs(Math.sin(i * 43.1)) * 15;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Jagged lines (deterministic — uses sin-based pseudorandom instead of Math.random)
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    let x = 0;
    let y = height * ((Math.sin(i * 73.7 + seed) + 1) / 2);
    ctx.moveTo(x, y);
    let step = 0;
    while (x < width) {
      const pseudoRand1 = (Math.sin(i * 311.1 + step * 131.3 + seed) + 1) / 2;
      const pseudoRand2 = Math.sin(i * 197.7 + step * 257.1 + seed);
      x += 10 + pseudoRand1 * 30;
      y += pseudoRand2 * 30;
      ctx.lineTo(x, Math.max(0, Math.min(height, y)));
      step++;
    }
    ctx.stroke();
  }
}

function renderMinimal(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number
) {
  // Sparse dots
  const dotCount = 30;
  for (let i = 0; i < dotCount; i++) {
    const x = (Math.sin(i * 73.1) + 1) / 2 * width;
    const y = (Math.sin(i * 157.3) + 1) / 2 * height;
    const r = 1.5 + Math.sin(time * 0.001 + i) * 0.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Single clean horizontal line
  const lineY = height * 0.5 + Math.sin(time * 0.0005) * 20;
  ctx.beginPath();
  ctx.moveTo(width * 0.2, lineY);
  ctx.lineTo(width * 0.8, lineY);
  ctx.stroke();

  // Subtle circle at center
  ctx.beginPath();
  ctx.arc(width / 2, height / 2, 80 + Math.sin(time * 0.001) * 5, 0, Math.PI * 2);
  ctx.stroke();
}
