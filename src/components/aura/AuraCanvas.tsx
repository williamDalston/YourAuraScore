'use client';

import { useCallback } from 'react';
import { useAuraEngine } from '@/hooks/useAuraEngine';

interface AuraCanvasProps {
  hash: string;
  className?: string;
  onCanvasReady?: (saveAura: () => void) => void;
}

export default function AuraCanvas({ hash, className = '', onCanvasReady }: AuraCanvasProps) {
  const { canvasRef, isRevealed } = useAuraEngine({
    hash,
    width: 1080,
    height: 1920,
  });

  const saveAura = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Export at preview resolution (540x960) — paid HD is 1080x1920+
    const previewW = 540;
    const previewH = 960;
    const offscreen = document.createElement('canvas');
    offscreen.width = previewW;
    offscreen.height = previewH;
    const ctx = offscreen.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(canvas, 0, 0, previewW, previewH);
    const dataUrl = offscreen.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `my-aura-preview-${hash}.png`;
    link.href = dataUrl;
    link.click();
  }, [canvasRef, hash]);

  // Notify parent when canvas is revealed and ready to save
  if (isRevealed && onCanvasReady) {
    onCanvasReady(saveAura);
  }

  return (
    <div className={`relative w-full ${className}`} style={{ aspectRatio: '9/16' }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-2xl object-contain"
        style={{ maxHeight: '70vh' }}
        aria-label="Your unique aura visualization"
      />
      {!isRevealed && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
