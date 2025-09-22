"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      searchRef.current?.focus();
    }
  }, [searchOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200/70 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-neutral-800 dark:bg-black/60">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="select-none text-lg font-semibold tracking-widest text-neutral-900 dark:text-neutral-100">
            ADORA
          </Link>
        </div>

        {/* Right: Actions (desktop) */}
        <div className="hidden items-center gap-1 sm:flex" ref={wrapperRef}>
          {searchOpen && (
            <div className="mr-1 flex items-center rounded-full border border-neutral-300/80 bg-white px-3 py-1.5 shadow-sm ring-0 transition focus-within:ring-2 focus-within:ring-green-600 dark:border-neutral-700 dark:bg-neutral-900">
              <span className="mr-2 text-neutral-500">🔍</span>
              <input
                ref={searchRef}
                type="text"
                placeholder="Search artworks..."
                className="w-56 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none dark:text-neutral-100"
              />
            </div>
          )}

          <IconButton ariaLabel="Favorites" title="Favorites">
            <span role="img" aria-label="favorite">❤️</span>
          </IconButton>
          <IconButton ariaLabel="Cart" title="Cart">
            <span role="img" aria-label="cart">🛒</span>
          </IconButton>
          <IconButton
            ariaLabel="Search"
            title="Search"
            onClick={() => setSearchOpen((v) => !v)}
          >
            <span role="img" aria-label="search">🔍</span>
          </IconButton>
          <IconButton ariaLabel="Login" title="Login">
            <span role="img" aria-label="login">👤</span>
          </IconButton>
        </div>

        {/* Mobile: Hamburger */}
        <div className="sm:hidden">
          <button
            aria-label="Open menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300/80 bg-white text-xl transition hover:bg-neutral-50 active:scale-95 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800"
          >
            <span className="sr-only">Menu</span>
            {menuOpen ? (
              <span aria-hidden>✕</span>
            ) : (
              <span aria-hidden>☰</span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      {menuOpen && (
        <div className="sm:hidden">
          <div className="border-t border-neutral-200/70 bg-white px-4 py-3 dark:border-neutral-800 dark:bg-black">
            <div className="mb-3 flex items-center rounded-full border border-neutral-300/80 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900">
              <span className="mr-2 text-neutral-500">🔍</span>
              <input
                type="text"
                placeholder="Search artworks..."
                className="w-full bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none dark:text-neutral-100"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              <MobileAction label="Favorites">❤️</MobileAction>
              <MobileAction label="Cart">🛒</MobileAction>
              <MobileAction label="Search">🔍</MobileAction>
              <MobileAction label="Login">👤</MobileAction>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

type IconButtonProps = {
  children: React.ReactNode;
  ariaLabel: string;
  title?: string;
  onClick?: () => void;
};

function IconButton({ children, ariaLabel, title, onClick }: IconButtonProps) {
  return (
    <button
      type="button"
      title={title}
      aria-label={ariaLabel}
      onClick={onClick}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300/80 bg-white text-lg text-neutral-700 transition hover:bg-neutral-50 active:scale-95 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
    >
      {children}
    </button>
  );
}

function MobileAction({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <button className="flex flex-col items-center justify-center rounded-lg border border-neutral-300/80 bg-white px-3 py-3 text-xl transition hover:bg-neutral-50 active:scale-95 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
      <span aria-hidden>{children}</span>
      <span className="mt-1 text-xs text-neutral-600 dark:text-neutral-300">{label}</span>
    </button>
  );
}
