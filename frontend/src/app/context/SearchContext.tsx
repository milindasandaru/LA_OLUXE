"use client";
import React, { createContext, useContext, useState } from "react";

type SearchContextType = {
  showSearch: boolean;
  setShowSearch: (v: boolean) => void;
  toggleShowSearch: () => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [showSearch, setShowSearch] = useState(false);
  const toggleShowSearch = () => setShowSearch((s) => !s);
  return (
    <SearchContext.Provider value={{ showSearch, setShowSearch, toggleShowSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used within SearchProvider");
  return ctx;
}
