"use client";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to console or reporting service
    // eslint-disable-next-line no-console
    console.error("Route error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-lg w-full text-center">
          <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
          <p className="text-sm text-gray-600 mb-4">{error.message}</p>
          {error.digest ? (
            <p className="text-xs text-gray-500 mb-4">Digest: {error.digest}</p>
          ) : null}
          <button className="px-4 py-2 rounded bg-gray-900 text-white" onClick={() => reset()}>
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
