'use client';

import { motion } from 'framer-motion';
import AuraCanvas from './AuraCanvas';

interface AuraRevealProps {
  hash: string;
  onCanvasReady?: (saveAura: () => void) => void;
}

export default function AuraReveal({ hash, onCanvasReady }: AuraRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      className="w-full max-w-md mx-auto"
    >
      {/* Ambient glow behind canvas */}
      <div className="relative">
        <motion.div
          className="absolute -inset-8 rounded-3xl opacity-30 blur-3xl"
          style={{
            background: 'radial-gradient(ellipse, rgba(120,80,255,0.4), rgba(255,80,180,0.2), transparent)',
          }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <AuraCanvas hash={hash} onCanvasReady={onCanvasReady} />
      </div>
    </motion.div>
  );
}
