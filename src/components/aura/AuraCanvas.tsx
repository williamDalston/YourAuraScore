'use client';

import { useAuraEngine } from '@/hooks/useAuraEngine';

interface AuraCanvasProps {
  hash: string;
  className?: string;
}

export default function AuraCanvas({ hash, className = '' }: AuraCanvasProps) {
  const { canvasRef, isRevealed } = useAuraEngine({
    hash,
    width: 1080,
    height: 1920,
  });

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
