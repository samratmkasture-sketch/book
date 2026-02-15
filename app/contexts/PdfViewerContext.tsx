import React, { createContext, useContext, useState, ReactNode } from "react";

interface PdfViewerContextType {
  // PDF Document State
  loading: boolean;
  setLoading: (value: boolean) => void;
  current: number;
  setCurrent: (value: number) => void;
  totalPages: number;
  setTotalPages: (value: number) => void;

  // PDF Source
  currentUrl: string | undefined;
  setCurrentUrl: (value: string | undefined) => void;
  currentArrayBuffer: ArrayBuffer | undefined;
  setCurrentArrayBuffer: (value: ArrayBuffer | undefined) => void;
  currentPdfName: string;
  setCurrentPdfName: (value: string) => void;

  // Navigation State
  isFlipping: boolean;
  setIsFlipping: (value: boolean) => void;
  direction: "next" | "prev";
  setDirection: (value: "next" | "prev") => void;
  gotoValue: string;
  setGotoValue: (value: string) => void;
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
