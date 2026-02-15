import React, { createContext, useContext, useState, ReactNode } from "react";

interface FileManagerContextType {
  // File Management
  savedPdfs: Array<{ id?: number; name: string; url?: string }>;
  setSavedPdfs: (value: Array<{ id?: number; name: string; url?: string }>) => void;

  // UI State
  uploadExpanded: boolean;
  setUploadExpanded: (value: boolean) => void;
}

const FileManagerContext = createContext<FileManagerContextType | undefined>(undefined);

export function FileManagerProvider({ children }: { children: ReactNode }) {
  const [savedPdfs, setSavedPdfs] = useState<Array<{ id?: number; name: string; url?: string }>>([]);
  const [uploadExpanded, setUploadExpanded] = useState(false);

  const value: FileManagerContextType = {
    savedPdfs,
    setSavedPdfs,
    uploadExpanded,
    setUploadExpanded,
  };

  return <FileManagerContext.Provider value={value}>{children}</FileManagerContext.Provider>;
}

export function useFileManager() {
  const context = useContext(FileManagerContext);
  if (!context) {
    throw new Error("useFileManager must be used within FileManagerProvider");
  }
  return context;
}
