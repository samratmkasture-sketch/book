import { useEffect, useState } from "react";
import { STORAGE_KEYS, MESSAGES } from "../constants";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/localStorage";

/**
 * Custom hook for managing PDF bookmarks
 */
export function useBookmarks(pdfName: string) {
  const [bookmarks, setBookmarks] = useState<number[]>([]);

  // Load bookmarks when PDF name changes
  useEffect(() => {
    const key = STORAGE_KEYS.BOOKMARKS(pdfName);
    const savedBookmarks = getFromLocalStorage<number[]>(key, []);
    setBookmarks(savedBookmarks);
  }, [pdfName]);

  // Save bookmarks whenever they change
  useEffect(() => {
    const key = STORAGE_KEYS.BOOKMARKS(pdfName);
    saveToLocalStorage(key, bookmarks);
  }, [bookmarks, pdfName]);

  const addBookmark = (pageNo: number) => {
    setBookmarks((prev) => {
      if (prev.includes(pageNo)) return prev;
      return [...prev, pageNo].sort((a, b) => a - b);
    });
  };

  const removeBookmark = (pageNo: number) => {
    setBookmarks((prev) => prev.filter((p) => p !== pageNo));
  };

  const hasBookmark = (pageNo: number) => bookmarks.includes(pageNo);

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    hasBookmark,
  };
}
