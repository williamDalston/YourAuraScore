'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ShareButtonsProps {
  hash: string;
  archetypeName: string;
}

export default function ShareButtons({ hash, archetypeName }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const url = typeof window !== 'undefined'
    ? `${window.location.origin}/results/${hash}`
    : `/results/${hash}`;
  const text = `I just discovered my aura! I'm "${archetypeName}" ✨ Find yours:`;

  const handleCopy = async () => {
    setCopyError(false);
    try {
      await navigator.clipboard.writeText(`${text} ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyError(true);
      setTimeout(() => setCopyError(false), 3000);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My Aura Score', text, url });
      } catch (err) {
        // User cancelled or share failed — fallback to copy
        if ((err as Error)?.name !== 'AbortError') {
          handleCopy();
        }
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
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      name: 'WhatsApp',
      href: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
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
      transition={{ delay: 2.8, duration: 0.5 }}
      className="px-6 py-4"
    >
      <h3 className="text-white/50 text-xs uppercase tracking-[0.2em] mb-4 text-center">
        Share Your Aura
      </h3>
      {copyError && (
        <p className="text-red-400 text-sm text-center mb-3">Could not copy. Please select and copy manually.</p>
      )}
      <div className="max-w-md mx-auto flex flex-wrap items-center justify-center gap-3">
        {/* Native share (mobile) */}
        <button
          onClick={handleNativeShare}
          aria-label="Share via device share menu"
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
          aria-label={copied ? 'Link copied to clipboard' : 'Copy link to clipboard'}
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
            aria-label={`Share on ${link.name}`}
            className="flex items-center justify-center w-11 h-11 bg-white/10 hover:bg-white/20
                       text-white rounded-full transition-colors"
          >
            {link.icon}
          </a>
        ))}
      </div>
    </motion.div>
  );
}
