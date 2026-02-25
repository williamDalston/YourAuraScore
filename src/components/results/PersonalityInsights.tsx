'use client';

import { motion } from 'framer-motion';

interface PersonalityInsightsProps {
  insights: string[];
}

export default function PersonalityInsights({ insights }: PersonalityInsightsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.6, duration: 0.5 }}
      className="px-6 py-4"
    >
      <h3 className="text-white/50 text-xs uppercase tracking-[0.2em] mb-4 text-center">
        Personality Insights
      </h3>
      <div className="max-w-md mx-auto space-y-3">
        {insights.map((insight, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.8 + i * 0.2, duration: 0.4 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
          >
            <p className="text-white/75 text-sm leading-relaxed">
              {insight}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
