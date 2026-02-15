// LocalStorage Utilities for Bookmarks and Settings

/**
 * Safely retrieve and parse JSON from localStorage
 */
export function getFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    if (typeof window === "undefined") return defaultValue;
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Failed to retrieve from localStorage: ${key}`, error);
    return defaultValue;
  }
}

/**
 * Safely save JSON to localStorage
 */
export function saveToLocalStorage<T>(key: string, value: T): boolean {
  try {
    if (typeof window === "undefined") return false;
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`Failed to save to localStorage: ${key}`, error);
    return false;
  }
}

/**
 * Remove item from localStorage
 */
export function removeFromLocalStorage(key: string): boolean {
  try {
    if (typeof window === "undefined") return false;
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn(`Failed to remove from localStorage: ${key}`, error);
    return false;
  }
}
