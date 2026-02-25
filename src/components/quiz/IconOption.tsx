'use client';

import { motion } from 'framer-motion';
import type { Option } from '@/lib/quiz/types';

interface IconOptionProps {
  option: Option;
  index: number;
  onSelect: () => void;
}

export default function IconOption({ option, index, onSelect }: IconOptionProps) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={onSelect}
      className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl
                 bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10
                 transition-all duration-200 cursor-pointer backdrop-blur-sm"
    >
      <span className="text-4xl">{option.icon}</span>
      <span className="text-white font-medium text-sm">{option.label}</span>
    </motion.button>
  );
}
