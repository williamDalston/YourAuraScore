export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center" role="status" aria-label="Loading">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-12 h-12 rounded-full border-2 border-purple-500/30 border-t-purple-400 animate-spin"
          aria-hidden="true"
        />
        <p className="text-white/50 text-sm">Loading...</p>
      </div>
    </div>
  );
}
