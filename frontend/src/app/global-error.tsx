"use client";
// Global error boundary for the App Router.
// Note: Do NOT render <html> or <body> here.

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] grid place-items-center p-6">
      <div className="max-w-lg w-full text-center">
        <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
        <p className="text-sm text-gray-600 mb-4">{error.message}</p>
        {error.digest ? (
          <p className="text-xs text-gray-500 mb-4">Digest: {error.digest}</p>
        ) : null}
        <button
          className="px-4 py-2 rounded bg-gray-900 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
