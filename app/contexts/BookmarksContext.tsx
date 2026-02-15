import React, { createContext, useContext, useState, ReactNode } from "react";

interface BookmarksContextType {
  // Bookmarks State
  bookmarks: number[];
  setBookmarks: (value: number[]) => void;

  // UI State
  bookmarksExpanded: boolean;
  setBookmarksExpanded: (value: boolean) => void;
}

const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined);

export function BookmarksProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [bookmarksExpanded, setBookmarksExpanded] = useState(false);

  const value: BookmarksContextType = {
    bookmarks,
    setBookmarks,
    bookmarksExpanded,
    setBookmarksExpanded,
  };

  return <BookmarksContext.Provider value={value}>{children}</BookmarksContext.Provider>;
}

export function useBookmarksContext() {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error("useBookmarksContext must be used within BookmarksProvider");
  }
  return context;
}
