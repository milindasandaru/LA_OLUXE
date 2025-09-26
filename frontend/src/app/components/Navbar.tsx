"use client";
import Link from "next/link";
import { useState } from "react";
import { useSearch } from "../context/SearchContext";
const links = [
  { href: "/", label: "HOME" },
  { href: "/collection", label: "COLLECTION" },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = 0; // TODO: wire to real cart state when available
  const { toggleShowSearch } = useSearch();

  return (
    <header className="w-full py-4 border-b">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-semibold">Adora.lk</Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex gap-6 text-sm text-gray-700">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="group flex flex-col items-center gap-1">
              <span>{l.label}</span>
              <span className="w-2/4 h-[1.5px] bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-5">
          <button aria-label="Search" className="text-gray-700 hover:text-black" onClick={() => toggleShowSearch()}>
            <i className="ri-search-line text-xl" />
          </button>

          <div className="relative">
            <Link href="/cart" aria-label="Cart" className="text-gray-700 hover:text-black">
              <i className="ri-shopping-cart-2-line text-xl" />
            </Link>
            {cartCount > 0 && (
              <span className="absolute -right-1 -bottom-1 w-4 text-center leading-4 bg-black text-white rounded-full text-[10px]">
                {cartCount}
              </span>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="sm:hidden text-gray-700 hover:text-black"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <i className="ri-menu-line text-xl" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden border-t">
          <nav className="px-4 py-3 flex flex-col gap-2 text-gray-700">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="py-2">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

// previous experimental version removed; replaced with Next.js-compatible Navbar
