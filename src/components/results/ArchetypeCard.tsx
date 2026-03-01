'use client';

import { motion } from 'framer-motion';
import type { Archetype } from '@/lib/archetypes/definitions';

interface ArchetypeCardProps {
  archetype: Archetype;
}

export default function ArchetypeCard({ archetype }: ArchetypeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 0.6 }}
      className="text-center px-6 py-8"
    >
      <p className="text-white/50 text-sm uppercase tracking-[0.2em] mb-3">
        Your Archetype
      </p>
      <h2 className="text-white text-4xl sm:text-5xl font-bold mb-3">
        {archetype.name}
      </h2>
      <p className="text-white/60 text-lg italic mb-6">
        &ldquo;{archetype.tagline}&rdquo;
      </p>
      <p className="text-white/80 text-base leading-relaxed max-w-md mx-auto">
        {archetype.description}
      </p>
    </motion.div>
  );
}
