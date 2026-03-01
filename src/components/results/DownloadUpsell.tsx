'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface DownloadUpsellProps {
  hash: string;
}

export default function DownloadUpsell({ hash }: DownloadUpsellProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async (type: 'wallpaper' | 'animated' | 'report' | 'bundle') => {
    const prices: Record<string, string> = {
      wallpaper: '$1.99',
      animated: '$2.99',
      report: '$4.99',
      bundle: '$7.99',
    };

    setError(null);
    setLoading(type);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hash, product: type }),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
        return;
      }
      if (data.demo) {
        alert(`Demo mode: ${type} download for ${prices[type]}. In production, this opens Stripe Checkout.`);
        setLoading(null);
        return;
      }
      setError(data.error || 'Something went wrong. Please try again.');
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        setError('Request timed out. Please try again.');
      } else {
        setError('Network error. Please check your connection and try again.');
      }
    } finally {
      setLoading(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.5 }}
      className="px-4 sm:px-6 py-6"
    >
      <div className="max-w-md mx-auto space-y-3">
        <h3 className="text-white/50 text-xs uppercase tracking-[0.2em] mb-4 text-center">
          Keep Your Aura Forever
        </h3>

        {error && (
          <p className="text-red-400 text-sm text-center mb-3 px-2">{error}</p>
        )}

        {/* Bundle — best value, shown first and most prominent */}
        <button
          onClick={() => handleDownload('bundle')}
          disabled={!!loading}
          className="w-full flex items-center justify-between bg-gradient-to-r from-amber-600 to-pink-600
                     hover:from-amber-500 hover:to-pink-500 disabled:opacity-70 disabled:cursor-not-allowed
                     text-white rounded-xl px-4 sm:px-5 py-4 sm:py-5 transition-all duration-200 cursor-pointer
                     ring-1 ring-amber-400/30 min-h-[44px]"
        >
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 hidden sm:block">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
            </svg>
            <div className="text-left min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-semibold text-sm">Complete Aura Pack</p>
                <span className="text-[10px] bg-white/20 rounded-full px-2 py-0.5 font-medium">BEST VALUE</span>
              </div>
              <p className="text-white/70 text-xs">HD Wallpaper + Animated + Report</p>
            </div>
          </div>
          {loading === 'bundle' ? (
            <span className="animate-pulse">...</span>
          ) : (
            <div className="text-right">
              <span className="font-bold">$7.99</span>
              <p className="text-white/50 text-xs line-through">$9.97</p>
            </div>
          )}
        </button>

        {/* HD Wallpaper — primary impulse buy */}
        <button
          onClick={() => handleDownload('wallpaper')}
          disabled={!!loading}
          className="w-full flex items-center justify-between bg-gradient-to-r from-violet-600 to-purple-600
                     hover:from-violet-500 hover:to-purple-500 disabled:opacity-70 disabled:cursor-not-allowed
                     text-white rounded-xl px-4 sm:px-5 py-4 transition-all duration-200 cursor-pointer min-h-[44px]"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            <div className="text-left">
              <p className="font-semibold text-sm">HD Wallpaper</p>
              <p className="text-white/70 text-xs">Phone + Desktop (4K PNG)</p>
            </div>
          </div>
          {loading === 'wallpaper' ? (
            <span className="animate-pulse">...</span>
          ) : (
            <span className="font-bold">$1.99</span>
          )}
        </button>

        {/* Animated Aura */}
        <button
          onClick={() => handleDownload('animated')}
          disabled={!!loading}
          className="w-full flex items-center justify-between bg-white/5 border border-white/10
                     hover:bg-white/10 disabled:opacity-70 disabled:cursor-not-allowed
                     text-white rounded-xl px-4 sm:px-5 py-4 transition-all duration-200 cursor-pointer min-h-[44px]"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            <div className="text-left">
              <p className="font-semibold text-sm">Animated Aura</p>
              <p className="text-white/70 text-xs">Live wallpaper (MP4 loop)</p>
            </div>
          </div>
          {loading === 'animated' ? (
            <span className="animate-pulse">...</span>
          ) : (
            <span className="font-bold">$2.99</span>
          )}
        </button>

        {/* Full Personality Report */}
        <button
          onClick={() => handleDownload('report')}
          disabled={!!loading}
          className="w-full flex items-center justify-between bg-white/5 border border-white/10
                     hover:bg-white/10 disabled:opacity-70 disabled:cursor-not-allowed
                     text-white rounded-xl px-4 sm:px-5 py-4 transition-all duration-200 cursor-pointer min-h-[44px]"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
            <div className="text-left">
              <p className="font-semibold text-sm">Full Personality Report</p>
              <p className="text-white/70 text-xs">Deep archetype analysis (PDF)</p>
            </div>
          </div>
          {loading === 'report' ? (
            <span className="animate-pulse">...</span>
          ) : (
            <span className="font-bold">$4.99</span>
          )}
        </button>
      </div>
    </motion.div>
  );
}
