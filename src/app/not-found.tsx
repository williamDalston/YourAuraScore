import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      <h1 className="text-white text-6xl font-bold mb-2">404</h1>
      <p className="text-white/60 text-lg mb-6">Page not found</p>
      <p className="text-white/40 text-sm text-center mb-8 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500
                   text-white font-semibold px-8 py-3 rounded-full transition-all"
      >
        Go home
      </Link>
    </div>
  );
}
