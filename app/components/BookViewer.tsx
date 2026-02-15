"use client";

import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import * as styles from "./BookViewer.styles";
import * as fileManagerStyles from "../styles/fileManager";
import * as bookmarkStyles from "../styles/bookmarks";
import * as commonStyles from "../styles/common";
import { usePdfViewer } from "../contexts/PdfViewerContext";
import { useFileManager } from "../contexts/FileManagerContext";
import { useBookmarksContext } from "../contexts/BookmarksContext";
import { useBookmarks } from "../hooks/useBookmarks";
import { getAllPdfs, addPdfToDB, deletePdfFromDB, getPdfFromDB } from "../utils/storage";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/localStorage";
import { STORAGE_KEYS, MESSAGES, DEFAULT_PDF, DEBOUNCE_DELAYS } from "../constants";

type Props = { url?: string; onTitleChange?: (title: string) => void };

// use pdfjs worker from CDN
(pdfjsLib as any).GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${(pdfjsLib as any).version}/pdf.worker.min.js`;

export default function BookViewer({ url, onTitleChange }: Props) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Context Hooks
  const pdfViewerContext = usePdfViewer();
  const fileManagerContext = useFileManager();
  const bookmarksContext = useBookmarksContext();
  
  // Custom Hooks
  const { bookmarks, addBookmark, removeBookmark, hasBookmark } = useBookmarks(pdfViewerContext.currentPdfName);
  
  // Refs
  const pdfRef = useRef<any>(null);
  const pageContainerRef = useRef<HTMLDivElement | null>(null);

  // Destructure context values for cleaner code
  const {
    loading, setLoading,
    current, setCurrent,
    totalPages, setTotalPages,
    currentUrl, setCurrentUrl,
    currentArrayBuffer, setCurrentArrayBuffer,
    currentPdfName, setCurrentPdfName,
    isFlipping, setIsFlipping,
    direction, setDirection,
    gotoValue, setGotoValue,
  } = pdfViewerContext;

  const { savedPdfs, setSavedPdfs, uploadExpanded, setUploadExpanded } = fileManagerContext;
  const { bookmarksExpanded, setBookmarksExpanded } = bookmarksContext;



  // Load PDF when source changes
  useEffect(() => {
    let cancelled = false;
    async function loadPdf() {
      if (!currentUrl && !currentArrayBuffer) return;
      try {
        setLoading(true);
        let loadingTask;
        if (currentArrayBuffer) {
          loadingTask = (pdfjsLib as any).getDocument({ data: currentArrayBuffer });
        } else {
          loadingTask = (pdfjsLib as any).getDocument(currentUrl);
        }
        const pdf = await loadingTask.promise;
        if (cancelled) return;
        pdfRef.current = pdf;
        const n = pdf.numPages;
        setTotalPages(n);
        setCurrent(0);
      } catch (err) {
        console.error(MESSAGES.LOAD_ERROR, err);
        pdfRef.current = null;
        setTotalPages(0);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadPdf();
    return () => {
      cancelled = true;
      pdfRef.current = null;
    };
  }, [currentUrl, currentArrayBuffer]);

  // Render current page into canvas
  useEffect(() => {
    let cancelled = false;
    async function renderCurrent() {
      const pdf = pdfRef.current;
      if (!pdf || totalPages === 0) return;
      const pageNo = Math.max(1, Math.min(current + 1, totalPages));
      try {
        const page = await pdf.getPage(pageNo);
        if (cancelled) return;
        const scale = 1.5;
        const viewport = page.getViewport({ scale });

        const container = pageContainerRef.current;
        if (!container) return;
        container.innerHTML = "";

        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        const ctx = canvas.getContext("2d");

        container.appendChild(canvas);

        const renderTask = page.render({ canvasContext: ctx as any, viewport });
        await renderTask.promise;
      } catch (e) {
        console.error(MESSAGES.RENDER_ERROR, e);
      }
    }
    renderCurrent();
    return () => {
      cancelled = true;
    };
  }, [current, totalPages]);


  function goNext() {
    if (current >= Math.max(0, totalPages - 1) || isFlipping) return;
    setDirection("next");
    setIsFlipping(true);
    setTimeout(() => {
      setCurrent(Math.min(current + 1, Math.max(0, totalPages - 1)));
      setIsFlipping(false);
    }, DEBOUNCE_DELAYS.RENDER);
  }

  // Handle file uploads
  // load saved PDFs from indexedDB on mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const items = await getAllPdfs();
        if (!mounted) return;
        // Map to simple metadata (id, name)
        const meta = items.map((it: any) => ({ id: it.id as number, name: it.name as string }));
        setSavedPdfs(meta);
        // if nothing saved and no incoming url, set a default remote PDF
        if (meta.length === 0 && !url && !currentUrl) {
          const sample = {
            id: undefined,
            name: "Sample PDF",
            url: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
          };
          setSavedPdfs([sample]);
          setCurrentUrl(sample.url);
        } else if (!currentUrl && url) {
          setCurrentUrl(url);
        }
      } catch (e) {
        console.warn("Failed to load saved PDFs", e);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  async function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      const rec = await addPdfToDB(f);
      setSavedPdfs([{ id: rec.id, name: rec.name, url: undefined }, ...savedPdfs]);
      // Read file as ArrayBuffer and open
      const arrayBuffer = await f.arrayBuffer();
      setCurrentUrl(undefined);
      setCurrentArrayBuffer(arrayBuffer);
      // Update PDF name and document title
      setCurrentPdfName(f.name);
      document.title = `${f.name} — Book Viewer`;
      onTitleChange?.(f.name);
    } catch (err) {
      console.error("Failed to save PDF", err);
    } finally {
      // clear input
      if (e.target) e.target.value = "";
    }
  }

  async function openSavedPdf(item: { id?: number; name: string; url?: string }) {
    if (item.url) {
      setCurrentArrayBuffer(undefined);
      setCurrentUrl(item.url);
      setCurrentPdfName(item.name);
      document.title = `${item.name} — Book Viewer`;
      onTitleChange?.(item.name);
      return;
    }
    // load blob from IDB as ArrayBuffer
    if (!item.id) return;
    try {
      const file = await getPdfFromDB(item.id);
      if (file) {
        const arrayBuffer = await file.arrayBuffer();
        setCurrentUrl(undefined);
        setCurrentArrayBuffer(arrayBuffer);
        setCurrentPdfName(item.name);
        document.title = `${item.name} — Book Viewer`;
        onTitleChange?.(item.name);
      }
    } catch (e) {
      console.error(MESSAGES.SAVE_ERROR, e);
    }
  }

  async function removeSavedPdf(id?: number) {
    if (!id) return;
    try {
      // confirm deletion
      const ok = typeof window !== "undefined" ? window.confirm("Delete this saved PDF?") : true;
      if (!ok) return;
      await deletePdfFromDB(id);
      setSavedPdfs((s) => s.filter((p) => p.id !== id));
    } catch (e) {
      console.error("Failed to delete PDF", e);
    }
  }

  function goToPage(pageOneBased: number) {
    const idx = Math.max(0, Math.min(pageOneBased - 1, Math.max(0, totalPages - 1)));
    if (idx === current) return;
    setDirection(idx > current ? "next" : "prev");
    setIsFlipping(true);
    setTimeout(() => {
      setCurrent(idx);
      setIsFlipping(false);
    }, DEBOUNCE_DELAYS.RENDER);
  }

  function handleAddBookmark() {
    const pageNo = current + 1;
    addBookmark(pageNo);
  }

  function goPrev() {
    if (current <= 0 || isFlipping) return;
    setDirection("prev");
    setIsFlipping(true);
    setTimeout(() => {
      setCurrent(Math.max(current - 1, 0));
      setIsFlipping(false);
    }, DEBOUNCE_DELAYS.RENDER);
  }

  const frontTransform = styles.getPageTransform(isFlipping, direction);

  return (
    <div style={styles.containerStyle}>
      <div style={styles.contentWrapperStyle}>
        <div style={styles.mainFlexStyle}>
          {/* Selector / Upload row */}
          <div style={styles.uploadSectionStyle}>
            <div style={fileManagerStyles.fileManagerHeaderStyle} onClick={() => setUploadExpanded(!uploadExpanded)}>
              <span style={fileManagerStyles.fileManagerHeaderTitleStyle}>📁 File Manager</span>
              <span style={fileManagerStyles.expandArrowStyle}>{uploadExpanded ? "▼" : "▶"}</span>
            </div>

            {uploadExpanded && (
              <>
                <div>
                  <label style={styles.uploadLabelStyle}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2">
                      <path d="M12 2v20M2 12h20" />
                    </svg>
                    <span style={styles.uploadTextStyle}>Upload PDF</span>
                    <input type="file" accept="application/pdf" onChange={handleFileInput} style={styles.hiddenFileInputStyle} />
                  </label>
                </div>

                {isMounted && savedPdfs.length > 0 && (
                  <div style={styles.savedPdfsContainerStyle}>
                    <div style={styles.savedPdfsTitleStyle}>
                      Saved PDFs ({savedPdfs.length})
                    </div>
                    <div style={styles.savedPdfsGridStyle}>
                      {savedPdfs.map((p) => (
                        <div key={p.id || p.name} style={styles.pdfCardStyle}>
                          <button onClick={() => openSavedPdf(p)} style={styles.pdfNameButtonStyle}>
                            {p.name}
                          </button>
                          {p.id && (
                            <button onClick={() => removeSavedPdf(p.id)} aria-label={`Delete ${p.name}`} style={styles.deleteButtonStyle}>
                              ×
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Bookmarks Section */}
          {totalPages > 0 && (
            <div style={bookmarkStyles.bookmarksContainerStyle}>
              <div style={bookmarkStyles.bookmarksHeaderStyle} onClick={() => setBookmarksExpanded(!bookmarksExpanded)}>
                <span style={bookmarkStyles.bookmarksHeaderTitleStyle}>🔖 Bookmarks</span>
                <span style={bookmarkStyles.bookmarkHeaderArrowStyle}>{bookmarksExpanded ? "▼" : "▶"}</span>
              </div>
              <div style={bookmarkStyles.bookmarkFileInfoStyle}>
                File: <span style={commonStyles.fileNameStyle}>{currentPdfName}</span>
              </div>

              {isMounted && bookmarksExpanded && (
                <>
                  <div style={{ ...styles.bookmarksListStyle, ...commonStyles.scrollableContainerStyle }}>
                    {bookmarks.length === 0 ? (
                      <p style={bookmarkStyles.bookmarkEmptyStateStyle}>No bookmarks yet for this file</p>
                    ) : (
                      bookmarks.map((p) => (
                        <div key={p} style={styles.bookmarkTagStyle}>
                          <button onClick={() => goToPage(p)} style={bookmarkStyles.bookmarkGoButtonStyle}>
                            Go {p}
                          </button>
                          <button onClick={() => removeBookmark(p)} aria-label={`Remove bookmark ${p}`} style={bookmarkStyles.bookmarkRemoveButtonStyle}>
                            x
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {loading && totalPages === 0 ? (
            <div style={styles.loadingStyle}>Loading PDF...</div>
          ) : totalPages > 0 ? (
            <>
              {/* Top toolbar: page info, goto, bookmarks */}
              <div style={styles.toolbarStyle}>
                <div style={styles.documentInfoStyle}>
                  <div style={styles.documentLabelStyle}>Document</div>
                  <div style={styles.pageCountStyle}>
                    Page <strong>{current + 1}</strong> of <strong>{totalPages}</strong>
                  </div>
                  <div style={styles.gotoContainerStyle}>
                    <input
                      type="number"
                      min={1}
                      max={Math.max(1, totalPages)}
                      value={gotoValue}
                      onChange={(e) => setGotoValue(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          const v = parseInt(gotoValue || "", 10);
                          if (!isNaN(v)) {
                            goToPage(v);
                            setGotoValue("");
                          }
                        }
                      }}
                      placeholder={`Go to page (1-${totalPages})`}
                      style={styles.gotoInputStyle}
                    />
                    <button
                      onClick={() => {
                        const v = parseInt(gotoValue || "", 10);
                        if (!isNaN(v)) goToPage(v);
                        setGotoValue("");
                      }}
                      disabled={!gotoValue}
                      title="Press Enter or click Go to navigate"
                      style={{
                        ...styles.gotoButtonStyle,
                        opacity: !gotoValue ? 0.5 : 1,
                        cursor: !gotoValue ? "not-allowed" : "pointer",
                      }}
                      onMouseOver={(e) => {
                        if (gotoValue) {
                          (e.target as HTMLButtonElement).style.backgroundColor = "#4338ca";
                          (e.target as HTMLButtonElement).style.boxShadow = "0 4px 12px rgba(79, 70, 229, 0.3)";
                        }
                      }}
                      onMouseOut={(e) => {
                        (e.target as HTMLButtonElement).style.backgroundColor = "#4f46e5";
                        (e.target as HTMLButtonElement).style.boxShadow = "0 2px 8px rgba(79, 70, 229, 0.2)";
                      }}
                    >
                      Go
                    </button>
                    <button
                      onClick={handleAddBookmark}
                      disabled={hasBookmark(current + 1)}
                      title={hasBookmark(current + 1) ? "Page bookmarked" : "Bookmark this page"}
                      style={{
                        ...styles.bookmarkButtonToolbarStyle,
                        opacity: hasBookmark(current + 1) ? 0.6 : 1,
                      }}
                      onMouseOver={(e) => {
                        if (!hasBookmark(current + 1)) {
                          (e.target as HTMLButtonElement).style.backgroundColor = "#6d28d9";
                          (e.target as HTMLButtonElement).style.boxShadow = "0 4px 12px rgba(124, 58, 237, 0.3)";
                        }
                      }}
                      onMouseOut={(e) => {
                        (e.target as HTMLButtonElement).style.backgroundColor = "#7c3aed";
                        (e.target as HTMLButtonElement).style.boxShadow = "0 2px 8px rgba(124, 58, 237, 0.2)";
                      }}
                    >
                      {hasBookmark(current + 1) ? "✓ Bookmarked" : "🔖 Bookmark"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Controls row: Prev / Next centered and side-by-side */}
              <div style={styles.controlsContainerStyle}>
                <div style={styles.buttonRowStyle}>
                  <button
                    onClick={goPrev}
                    disabled={current === 0 || isFlipping}
                    aria-label="Previous page"
                    title="Previous page"
                    style={styles.navButtonStyle}
                  >
                    <svg viewBox="0 0 24 24" style={styles.navButtonIconStyle} aria-hidden="true">
                      <polyline points="15 18 9 12 15 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  <button
                    onClick={goNext}
                    disabled={current >= Math.max(0, totalPages - 1) || isFlipping}
                    aria-label="Next page"
                    title="Next page"
                    style={styles.navButtonStyle}
                  >
                    <svg viewBox="0 0 24 24" style={styles.navButtonIconStyle} aria-hidden="true">
                      <polyline points="9 18 15 12 9 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>

                <div style={styles.viewerCenterStyle}>
                  <div style={styles.bookStyle}>
                    <div style={{ ...styles.pageCommonStyle, transform: frontTransform, zIndex: 2 }}>
                      <div ref={pageContainerRef} style={styles.pageCanvasStyle} />
                      <div
                        style={styles.navOverlayLeftStyle}
                        onClick={() => {
                          goPrev();
                        }}
                        aria-hidden="true"
                      />
                      <div
                        style={styles.navOverlayRightStyle}
                        onClick={() => {
                          goNext();
                        }}
                        aria-hidden="true"
                      />
                      <div style={styles.pageNumberBadgeStyle}>Page {current + 1}/{totalPages}</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
