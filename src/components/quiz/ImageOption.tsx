'use client';

import { motion } from 'framer-motion';
import type { Option } from '@/lib/quiz/types';

interface ImageOptionProps {
  option: Option;
  index: number;
  onSelect: () => void;
}

export default function ImageOption({ option, index, onSelect }: ImageOptionProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onSelect}
      className="relative group w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
    >
      <div
        className="absolute inset-0 transition-transform duration-300 group-hover:scale-110"
        style={{ background: option.gradient || '#333' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <span className="text-white font-semibold text-sm drop-shadow-lg">
          {option.label}
        </span>
      </div>
      <div className="absolute inset-0 rounded-2xl border-2 border-white/0 group-hover:border-white/30 transition-colors" />
    </motion.button>
  );
}
