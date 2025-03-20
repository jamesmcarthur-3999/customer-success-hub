/**
 * Local Storage Service
 * Provides utility functions for storing and retrieving data from browser's local storage
 */

// Generic get method with type safety
export function getItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error retrieving ${key} from localStorage:`, error);
    return defaultValue;
  }
}

// Generic set method
export function setItem<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error storing ${key} in localStorage:`, error);
    return false;
  }
}

// Remove an item
export function removeItem(key: string): boolean {
  try {
    localStorage.setItem(key, '');
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
    return false;
  }
}

// Clear all items with a specific prefix
export function clearItemsWithPrefix(prefix: string): boolean {
  try {
    Object.keys(localStorage)
      .filter(key => key.startsWith(prefix))
      .forEach(key => localStorage.removeItem(key));
    return true;
  } catch (error) {
    console.error(`Error clearing items with prefix ${prefix} from localStorage:`, error);
    return false;
  }
}

// Check if a key exists
export function hasItem(key: string): boolean {
  return localStorage.getItem(key) !== null;
}

// Get all keys that match a prefix
export function getKeys(prefix: string = ''): string[] {
  return Object.keys(localStorage).filter(key => key.startsWith(prefix));
}

// Utility for handling data with expiration
export interface StorageItemWithExpiry<T> {
  value: T;
  expiry: number; // timestamp
}

export function setItemWithExpiry<T>(
  key: string, 
  value: T, 
  expiryInMinutes: number
): boolean {
  try {
    const item: StorageItemWithExpiry<T> = {
      value,
      expiry: Date.now() + expiryInMinutes * 60 * 1000
    };
    localStorage.setItem(key, JSON.stringify(item));
    return true;
  } catch (error) {
    console.error(`Error storing ${key} with expiry in localStorage:`, error);
    return false;
  }
}

export function getItemWithExpiry<T>(key: string, defaultValue: T): T {
  try {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return defaultValue;
    }
    
    const item: StorageItemWithExpiry<T> = JSON.parse(itemStr);
    const now = Date.now();
    
    // Check if the item has expired
    if (now > item.expiry) {
      // If expired, remove the item and return default
      removeItem(key);
      return defaultValue;
    }
    
    return item.value;
  } catch (error) {
    console.error(`Error retrieving ${key} with expiry from localStorage:`, error);
    return defaultValue;
  }
}

// Export a single object with all methods
const localStorageService = {
  getItem,
  setItem,
  removeItem,
  clearItemsWithPrefix,
  hasItem,
  getKeys,
  setItemWithExpiry,
  getItemWithExpiry
};

export default localStorageService;