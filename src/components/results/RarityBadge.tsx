'use client';

import { motion } from 'framer-motion';

interface RarityBadgeProps {
  rarity: number; // percentage (e.g., 12 means "top 12%")
}

export default function RarityBadge({ rarity }: RarityBadgeProps) {
  const label = rarity <= 5
    ? 'Extremely Rare'
    : rarity <= 15
    ? 'Very Rare'
    : rarity <= 30
    ? 'Uncommon'
    : 'Unique';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2.0, duration: 0.5, type: 'spring' }}
      className="flex justify-center px-6 py-4"
    >
      <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20
                      backdrop-blur-sm rounded-full px-6 py-3 border border-purple-500/30">
        <span className="text-2xl">&#10024;</span>
        <div>
          <p className="text-white font-semibold text-sm">
            Top {rarity}% — {label}
          </p>
          <p className="text-white/50 text-xs">
            Your aura matches {rarity}% of people
          </p>
        </div>
      </div>
    </motion.div>
  );
}
