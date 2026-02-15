// IndexedDB Utilities for PDF Storage

import { PDF_DB_NAME, PDF_STORE_NAME } from "../constants";

export async function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(PDF_DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(PDF_STORE_NAME)) {
        db.createObjectStore(PDF_STORE_NAME, { keyPath: "id", autoIncrement: true });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function getAllPdfs(): Promise<Array<any>> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(PDF_STORE_NAME, "readonly");
    const store = tx.objectStore(PDF_STORE_NAME);
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

export async function addPdfToDB(file: File): Promise<any> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(PDF_STORE_NAME, "readwrite");
    const store = tx.objectStore(PDF_STORE_NAME);
    const rec = { name: file.name, blob: file, createdAt: Date.now() };
    const req = store.add(rec as any);
    req.onsuccess = () => {
      resolve({ id: req.result as number, ...rec });
    };
    req.onerror = () => reject(req.error);
  });
}

export async function deletePdfFromDB(id: number): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(PDF_STORE_NAME, "readwrite");
    const store = tx.objectStore(PDF_STORE_NAME);
    const req = store.delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export async function getPdfFromDB(id: number): Promise<File | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(PDF_STORE_NAME, "readonly");
    const store = tx.objectStore(PDF_STORE_NAME);
    const req = store.get(id);
    req.onsuccess = () => {
      const rec = req.result;
      resolve(rec?.blob || null);
    };
    req.onerror = () => reject(req.error);
  });
}
