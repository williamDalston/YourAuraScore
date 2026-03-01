'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number; // 0-1
  current: number;
  total: number;
}

export default function ProgressBar({ progress, current, total }: ProgressBarProps) {
  return (
    <div className="w-full px-6 pt-6 sticky top-0 z-20 bg-black/80 backdrop-blur-sm pb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-white/50 font-medium tracking-wider uppercase">
          Question {Math.min(current + 1, total)} of {total}
        </span>
        <span className="text-xs text-white/50">
          {Math.round(progress * 100)}%
        </span>
      </div>
      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #7c3aed, #ec4899, #f59e0b)',
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
