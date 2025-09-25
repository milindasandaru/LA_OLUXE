"use client";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console or reporting service
    // eslint-disable-next-line no-console
    console.error("Route error:", error);
  }, [error]);

  // Note: In the App Router, error.tsx must NOT render <html> or <body>.
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
