'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      console.error('Application error:', error.message);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      <h1 className="text-white text-xl font-semibold mb-2">Something went wrong</h1>
      <p className="text-white/60 text-sm text-center mb-6 max-w-sm">
        We encountered an unexpected error. Please try again.
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-2.5 rounded-full transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500
                     text-white font-semibold px-6 py-2.5 rounded-full transition-all"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
