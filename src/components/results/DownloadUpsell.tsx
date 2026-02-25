'use client';

import { motion } from 'framer-motion';

interface DownloadUpsellProps {
  hash: string;
}

export default function DownloadUpsell({ hash }: DownloadUpsellProps) {
  const handleDownload = async (type: 'wallpaper' | 'animated' | 'report') => {
    const prices: Record<string, string> = {
      wallpaper: '$1.99',
      animated: '$2.99',
      report: '$4.99',
    };

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hash, product: type }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else if (data.demo) {
        // Dev mode: simulate download
        alert(`Demo mode: ${type} download for ${prices[type]}. In production, this opens Stripe Checkout.`);
      }
    } catch {
      console.error('Checkout error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3.8, duration: 0.5 }}
      className="px-6 py-6"
    >
      <div className="max-w-md mx-auto space-y-3">
        <h3 className="text-white/50 text-xs uppercase tracking-[0.2em] mb-4 text-center">
          Keep Your Aura
        </h3>

        <button
          onClick={() => handleDownload('wallpaper')}
          className="w-full flex items-center justify-between bg-gradient-to-r from-violet-600 to-purple-600
                     hover:from-violet-500 hover:to-purple-500 text-white rounded-xl px-5 py-4
                     transition-all duration-200 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            <div className="text-left">
              <p className="font-semibold text-sm">HD Wallpaper</p>
              <p className="text-white/60 text-xs">Phone + Desktop (4K PNG)</p>
            </div>
          </div>
          <span className="font-bold">$1.99</span>
        </button>

        <button
          onClick={() => handleDownload('animated')}
          className="w-full flex items-center justify-between bg-white/5 border border-white/10
                     hover:bg-white/10 text-white rounded-xl px-5 py-4
                     transition-all duration-200 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            <div className="text-left">
              <p className="font-semibold text-sm">Animated Aura</p>
              <p className="text-white/60 text-xs">Live wallpaper (MP4 loop)</p>
            </div>
          </div>
          <span className="font-bold">$2.99</span>
        </button>

        <button
          onClick={() => handleDownload('report')}
          className="w-full flex items-center justify-between bg-white/5 border border-white/10
                     hover:bg-white/10 text-white rounded-xl px-5 py-4
                     transition-all duration-200 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
            <div className="text-left">
              <p className="font-semibold text-sm">Full Personality Report</p>
              <p className="text-white/60 text-xs">Deep archetype analysis (PDF)</p>
            </div>
          </div>
          <span className="font-bold">$4.99</span>
        </button>
      </div>
    </motion.div>
  );
}
