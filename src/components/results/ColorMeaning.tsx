'use client';

import { motion } from 'framer-motion';

interface ColorMeaningProps {
  meaning: string;
}

export default function ColorMeaning({ meaning }: ColorMeaningProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 0.5 }}
      className="px-6 py-6"
    >
      <div className="max-w-md mx-auto bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <h3 className="text-white/50 text-xs uppercase tracking-[0.2em] mb-3">
          Your Colors Mean
        </h3>
        <p className="text-white/80 text-sm leading-relaxed">
          {meaning}
        </p>
      </div>
    </motion.div>
  );
}
