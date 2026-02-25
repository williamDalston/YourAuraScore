'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ShareButtonsProps {
  hash: string;
  archetypeName: string;
}

export default function ShareButtons({ hash, archetypeName }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined'
    ? `${window.location.origin}/results/${hash}`
    : `/results/${hash}`;
  const text = `I just discovered my aura! I'm "${archetypeName}" ✨ Find yours:`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${text} ${url}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My Aura Score', text, url });
      } catch {
        // User cancelled
      }
    } else {
      handleCopy();
    }
  };

  const shareLinks = [
    {
      name: 'X / Twitter',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      name: 'Pinterest',
      href: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(text)}`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0a12 12 0 00-4.37 23.17c-.1-.94-.2-2.38.04-3.4.22-.93 1.42-6.02 1.42-6.02s-.36-.73-.36-1.8c0-1.69.98-2.95 2.2-2.95 1.04 0 1.54.78 1.54 1.71 0 1.04-.66 2.6-1.01 4.04-.29 1.2.6 2.18 1.79 2.18 2.14 0 3.79-2.26 3.79-5.52 0-2.89-2.08-4.9-5.04-4.9-3.43 0-5.45 2.58-5.45 5.24 0 1.04.4 2.15.9 2.75a.36.36 0 01.08.35c-.09.38-.3 1.2-.34 1.37-.05.22-.18.27-.42.16-1.56-.73-2.54-3.01-2.54-4.84 0-3.95 2.87-7.58 8.27-7.58 4.34 0 7.72 3.1 7.72 7.23 0 4.32-2.72 7.79-6.5 7.79-1.27 0-2.46-.66-2.87-1.44l-.78 2.98c-.28 1.09-1.04 2.45-1.55 3.28A12 12 0 1012 0z"/>
        </svg>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3.6, duration: 0.5 }}
      className="px-6 py-4"
    >
      <h3 className="text-white/50 text-xs uppercase tracking-[0.2em] mb-4 text-center">
        Share Your Aura
      </h3>
      <div className="max-w-md mx-auto flex items-center justify-center gap-3">
        {/* Native share (mobile) */}
        <button
          onClick={handleNativeShare}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white
                     rounded-full px-5 py-2.5 text-sm transition-colors cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
          Share
        </button>

        {/* Copy link */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white
                     rounded-full px-5 py-2.5 text-sm transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
              </svg>
              Copy Link
            </>
          )}
        </button>

        {/* Social links */}
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white/20
                       text-white rounded-full transition-colors"
            title={link.name}
          >
            {link.icon}
          </a>
        ))}
      </div>
    </motion.div>
  );
}
