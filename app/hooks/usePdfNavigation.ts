import { useState } from "react";
import { DEBOUNCE_DELAYS } from "../constants";

/**
 * Custom hook for PDF page navigation with animation
 */
export function usePdfNavigation(totalPages: number) {
  const [current, setCurrent] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const goToPage = (pageOneBased: number) => {
    const idx = Math.max(0, Math.min(pageOneBased - 1, Math.max(0, totalPages - 1)));
    if (idx === current) return;

    setDirection(idx > current ? "next" : "prev");
    setIsFlipping(true);

    setTimeout(() => {
      setCurrent(idx);
      setIsFlipping(false);
    }, DEBOUNCE_DELAYS.RENDER);
  };

  const goNext = () => {
    if (current >= Math.max(0, totalPages - 1) || isFlipping) return;
    setDirection("next");
    setIsFlipping(true);

    setTimeout(() => {
      setCurrent((c) => Math.min(c + 1, Math.max(0, totalPages - 1)));
      setIsFlipping(false);
    }, DEBOUNCE_DELAYS.RENDER);
  };

  const goPrev = () => {
    if (current <= 0 || isFlipping) return;
    setDirection("prev");
    setIsFlipping(true);

    setTimeout(() => {
      setCurrent((c) => Math.max(c - 1, 0));
      setIsFlipping(false);
    }, DEBOUNCE_DELAYS.RENDER);
  };

  return {
    current,
    setCurrent,
    isFlipping,
    direction,
    goToPage,
    goNext,
    goPrev,
  };
}
