'use client';

import { motion } from 'framer-motion';
import type { Option } from '@/lib/quiz/types';

interface WordOptionProps {
  option: Option;
  index: number;
  onSelect: () => void;
}

const GRADIENTS = [
  'linear-gradient(135deg, #7c3aed, #a855f7)',
  'linear-gradient(135deg, #ec4899, #f472b6)',
  'linear-gradient(135deg, #3b82f6, #60a5fa)',
  'linear-gradient(135deg, #f59e0b, #fbbf24)',
];

export default function WordOption({ option, index, onSelect }: WordOptionProps) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onSelect}
      className="w-full py-5 px-8 rounded-2xl text-white font-bold text-xl tracking-wide cursor-pointer
                 border border-white/10 hover:border-white/30 transition-all duration-200
                 backdrop-blur-sm"
      style={{ background: GRADIENTS[index % GRADIENTS.length] }}
    >
      {option.label}
    </motion.button>
  );
}
