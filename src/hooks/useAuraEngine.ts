'use client';

import { useRef, useEffect, useState } from 'react';
import { initEngine, startAnimation, type AuraEngineState } from '@/lib/aura/engine';

interface UseAuraEngineOptions {
  hash: string;
  width?: number;
  height?: number;
  autoStart?: boolean;
}

export function useAuraEngine({ hash, width = 1080, height = 1920, autoStart = true }: UseAuraEngineOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [engineState, setEngineState] = useState<AuraEngineState | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !hash) return;

    const state = initEngine(hash, canvas, width, height);
    setEngineState(state);

    if (autoStart) {
      cleanupRef.current = startAnimation(canvas, state, (s) => {
        if (s.revealProgress >= 1 && !isRevealed) {
          setIsRevealed(true);
        }
      });
    }

    return () => {
      cleanupRef.current?.();
    };
  }, [hash, width, height, autoStart]);

  return {
    canvasRef,
    isRevealed,
    engineState,
  };
}
