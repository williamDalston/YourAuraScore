'use client';

import { useState, useEffect } from 'react';

const CONSENT_KEY = 'youraura-cookie-consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
      <div className="max-w-lg mx-auto bg-zinc-900 border border-white/10 rounded-2xl p-5 shadow-2xl backdrop-blur-sm">
        <p className="text-white/70 text-sm leading-relaxed mb-4">
          We use cookies for analytics and to improve your experience. Your quiz answers are never stored on our servers.{' '}
          <a href="/privacy" className="text-purple-400 hover:text-purple-300 underline underline-offset-2">
            Privacy Policy
          </a>
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={handleAccept}
            className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500
                       text-white font-semibold text-sm px-5 py-3 rounded-full transition-all cursor-pointer"
          >
            Accept
          </button>
          <button
            onClick={handleDecline}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white font-medium text-sm
                       px-5 py-3 rounded-full transition-colors cursor-pointer"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
