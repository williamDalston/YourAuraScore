'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Option } from '@/lib/quiz/types';

interface SliderOptionProps {
  options: Option[];
  onSelect: (optionId: number) => void;
}

export default function SliderOption({ options, onSelect }: SliderOptionProps) {
  const [value, setValue] = useState(Math.floor(options.length / 2));
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => onSelect(value), 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full flex flex-col items-center gap-8 px-4"
    >
      <div className="w-full flex justify-between text-xs text-white/50 px-1">
        {options.map((opt, i) => (
          <span
            key={opt.id}
            className={`${opt.id === value ? 'text-white font-semibold' : ''} ${
              i !== 0 && i !== options.length - 1 && opt.id !== value ? 'hidden sm:inline' : ''
            } text-center`}
          >
            {opt.label}
          </span>
        ))}
      </div>
      <input
        type="range"
        min={0}
        max={options.length - 1}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        aria-label={`Select from ${options[0]?.label} to ${options[options.length - 1]?.label}`}
        aria-valuetext={options[value]?.label}
        className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer
                   [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6
                   [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full
                   [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg
                   [&::-webkit-slider-thumb]:cursor-pointer"
      />
      <div className="text-center">
        <p className="text-white text-2xl font-bold mb-6">{options[value]?.label}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleConfirm}
          disabled={confirmed}
          className="px-8 py-3 min-h-[44px] rounded-full bg-white text-black font-semibold text-sm
                     hover:bg-white/90 transition-colors disabled:opacity-50 cursor-pointer"
        >
          Continue
        </motion.button>
      </div>
    </motion.div>
  );
}
