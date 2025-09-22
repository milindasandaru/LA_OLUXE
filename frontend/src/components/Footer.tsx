import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200/70 bg-white py-8 text-sm text-neutral-600 dark:border-neutral-800 dark:bg-black dark:text-neutral-300">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <p>&copy; {new Date().getFullYear()} ADORA. All rights reserved.</p>
        <nav className="flex items-center gap-4">
          <a className="hover:underline" href="#">Privacy</a>
          <a className="hover:underline" href="#">Terms</a>
          <a className="hover:underline" href="#">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
