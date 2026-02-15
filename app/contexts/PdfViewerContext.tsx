import React, { createContext, useContext, useState, ReactNode } from "react";

interface PdfViewerContextType {
  // PDF Document State
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;

  // PDF Source
  currentUrl: string | undefined;
  setCurrentUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
  currentArrayBuffer: ArrayBuffer | undefined;
  setCurrentArrayBuffer: React.Dispatch<React.SetStateAction<ArrayBuffer | undefined>>;
  currentPdfName: string;
  setCurrentPdfName: React.Dispatch<React.SetStateAction<string>>;

  // Navigation State
  isFlipping: boolean;
  setIsFlipping: React.Dispatch<React.SetStateAction<boolean>>;
  direction: "next" | "prev";
  setDirection: React.Dispatch<React.SetStateAction<"next" | "prev">>;
  gotoValue: string;
  setGotoValue: React.Dispatch<React.SetStateAction<string>>;
}

const PdfViewerContext = createContext<PdfViewerContextType | undefined>(undefined);

export function PdfViewerProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentUrl, setCurrentUrl] = useState<string | undefined>(undefined);
  const [currentArrayBuffer, setCurrentArrayBuffer] = useState<ArrayBuffer | undefined>(undefined);
  const [currentPdfName, setCurrentPdfName] = useState("Sample Report");
  const [isFlipping, setIsFlipping] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [gotoValue, setGotoValue] = useState("");

  const value: PdfViewerContextType = {
    loading,
    setLoading,
    current,
    setCurrent,
    totalPages,
    setTotalPages,
    currentUrl,
    setCurrentUrl,
    currentArrayBuffer,
    setCurrentArrayBuffer,
    currentPdfName,
    setCurrentPdfName,
    isFlipping,
    setIsFlipping,
    direction,
    setDirection,
    gotoValue,
    setGotoValue,
  };

  return <PdfViewerContext.Provider value={value}>{children}</PdfViewerContext.Provider>;
}

export function usePdfViewer() {
  const context = useContext(PdfViewerContext);
  if (!context) {
    throw new Error("usePdfViewer must be used within PdfViewerProvider");
  }
  return context;
}
