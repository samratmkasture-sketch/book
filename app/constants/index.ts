// PDF Viewer Constants
export const PDF_DB_NAME = "pdf-reader";
export const PDF_STORE_NAME = "pdfs";

export const STORAGE_KEYS = {
  BOOKMARKS: (fileName: string) => `bookmarks:${fileName}`,
} as const;

export const UI_LIMITS = {
  FILE_MANAGER_MAX_HEIGHT: "20vh",
  SAVED_PDFS_MAX_HEIGHT: "12vh",
  BOOKMARKS_MAX_HEIGHT: "20vh",
  BOOKMARKS_LIST_MAX_HEIGHT: "10vh",
} as const;

export const DEBOUNCE_DELAYS = {
  RENDER: 600,
} as const;

export const MESSAGES = {
  DELETE_CONFIRM: "Delete this saved PDF?",
  LOAD_ERROR: "Failed to load PDF",
  SAVE_ERROR: "Failed to save PDF",
  DELETE_ERROR: "Failed to delete PDF",
  RENDER_ERROR: "Failed rendering page",
  BOOKMARK_LOAD_ERROR: "Failed to load bookmarks",
  BOOKMARK_SAVE_ERROR: "Failed to save bookmarks",
} as const;

export const DEFAULT_PDF = {
  name: "Sample PDF",
  url: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
} as const;
