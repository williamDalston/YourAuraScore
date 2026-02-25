'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#000', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            textAlign: 'center',
          }}
        >
          <h1 style={{ fontSize: '1.25rem', marginBottom: 8 }}>Something went wrong</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, marginBottom: 24, maxWidth: 320 }}>
            We encountered an unexpected error. Please refresh the page or try again later.
          </p>
          <button
            onClick={reset}
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: 9999,
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
