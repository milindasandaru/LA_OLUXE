"use client";
import { useState } from 'react';
export default function Searchbar() {
  const [q, setQ] = useState('');
  return (
    <div className="max-w-6xl mx-auto mt-6">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search products..."
        className="w-full border rounded px-3 py-2"
      />
    </div>
  );
}
