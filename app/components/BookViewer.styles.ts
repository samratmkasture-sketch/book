import React from "react";

// Container & Layout
export const containerStyle: React.CSSProperties = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
};

export const contentWrapperStyle: React.CSSProperties = {
  width: "98%",
  maxWidth: "100%",
};

export const mainFlexStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

// Upload Section
export const uploadSectionStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
  padding: 10,
  borderRadius: 12,
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  maxHeight: "20vh",
  overflowY: "auto",
};

export const uploadButtonContainerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  cursor: "pointer",
  padding: "8px 12px",
  background: "white",
  borderRadius: 6,
  border: "2px solid #4f46e5",
  transition: "all 0.3s ease",
  boxShadow: "0 2px 8px rgba(79, 70, 229, 0.15)",
};

export const uploadLabelStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
};

export const uploadTextStyle: React.CSSProperties = {
  fontWeight: 600,
  fontSize: 13,
  color: "#4f46e5",
};

export const hiddenFileInputStyle: React.CSSProperties = {
  display: "none",
};

export const savedPdfsContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
};

export const savedPdfsTitleStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  color: "#64748b",
  marginBottom: 6,
  textTransform: "uppercase",
  letterSpacing: "0.3px",
};

export const savedPdfsGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
  gap: 6,
  maxHeight: "12vh",
  overflowY: "auto",
  paddingRight: "4px",
};

export const pdfCardStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 6,
  background: "white",
  padding: "8px 10px",
  borderRadius: 6,
  border: "1.5px solid #e2e8f0",
  transition: "all 0.2s ease",
  cursor: "pointer",
};

export const pdfNameButtonStyle: React.CSSProperties = {
  flex: 1,
  textAlign: "left",
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: 12,
  fontWeight: 500,
  color: "#1e293b",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  padding: 0,
};

export const deleteButtonStyle: React.CSSProperties = {
  background: "#fee2e2",
  color: "#dc2626",
  border: "none",
  borderRadius: 4,
  width: 24,
  height: 24,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  fontSize: 14,
  fontWeight: 600,
  transition: "all 0.2s ease",
  padding: 0,
};

// Loading State
export const loadingStyle: React.CSSProperties = {
  textAlign: "center",
  padding: 40,
};

// Toolbar
export const toolbarStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
  padding: "8px 0",
};

export const documentInfoStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
};

export const documentLabelStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  lineHeight: "28px",
};

export const pageCountStyle: React.CSSProperties = {
  fontSize: 12,
  lineHeight: "28px",
};

export const gotoContainerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  marginTop: 0,
  minHeight: "28px",
};

export const gotoInputStyle: React.CSSProperties = {
  width: 100,
  padding: "5px 8px",
  fontSize: 12,
  height: "28px",
  border: "1.5px solid #e5e7eb",
  borderRadius: 4,
  outline: "none",
  transition: "all 0.3s ease",
  boxSizing: "border-box",
  fontFamily: "inherit",
  backgroundColor: "#fff",
  color: "#1f2937",
};

export const gotoButtonStyle: React.CSSProperties = {
  padding: "5px 10px",
  fontSize: 11,
  fontWeight: 600,
  border: "none",
  borderRadius: 4,
  backgroundColor: "#4f46e5",
  color: "#fff",
  cursor: "pointer",
  transition: "all 0.3s ease",
  boxShadow: "0 2px 8px rgba(79, 70, 229, 0.2)",
  height: "28px",
};

export const bookmarkButtonToolbarStyle: React.CSSProperties = {
  padding: "5px 10px",
  fontSize: 11,
  fontWeight: 600,
  border: "none",
  borderRadius: 4,
  backgroundColor: "#7c3aed",
  color: "#fff",
  cursor: "pointer",
  transition: "all 0.3s ease",
  boxShadow: "0 2px 8px rgba(124, 58, 237, 0.2)",
  height: "28px",
};

// Bookmarks
export const bookmarksContainerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
};

export const bookmarksListStyle: React.CSSProperties = {
  display: "flex",
  gap: 8,
  alignItems: "center",
  flexWrap: "wrap",
};

export const bookmarkTagStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 4,
  background: "#f3f3f3",
  padding: "4px 6px",
  borderRadius: 4,
  fontSize: 12,
};

// Controls
export const controlsContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

export const buttonRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  gap: 8,
};

export const navButtonStyle: React.CSSProperties = {
  padding: 0,
  width: 32,
  height: 32,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 12,
  fontWeight: 600,
  background: "transparent",
  color: "#0f172a",
  border: "1px solid rgba(15,23,42,0.06)",
  borderRadius: 9999,
  boxShadow: "none",
  transition: "background 0.12s ease, transform 0.08s ease",
  cursor: "pointer",
};

export const navButtonIconStyle: React.CSSProperties = {
  width: 14,
  height: 14,
  display: "block",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
};

export const viewerCenterStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

// PDF Book Viewer
export const bookStyle: React.CSSProperties = {
  width: '100%',
  height: 900,
  maxWidth: "100%",
  perspective: 2000,
  position: "relative",
};

export const pageCommonStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  position: "absolute",
  top: 0,
  left: 0,
  transformStyle: "preserve-3d",
  transition: "transform 600ms ease",
};

export const pageCanvasStyle: React.CSSProperties = {
  backfaceVisibility: "hidden",
  width: "100%",
  height: "100%",
  overflow: "hidden",
  boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
  borderRadius: 6,
  position: "relative",
};

export const pageNumberBadgeStyle: React.CSSProperties = {
  position: "absolute",
  right: 12,
  bottom: 12,
  background: "rgba(0,0,0,0.6)",
  color: "#ffffff",
  padding: "4px 8px",
  borderRadius: 6,
  fontSize: 11,
  lineHeight: "14px",
  zIndex: 20,
  pointerEvents: "none",
};

export const navOverlayLeftStyle: React.CSSProperties = {
  position: "absolute",
  left: 0,
  top: 0,
  bottom: 0,
  width: "40%",
  background: "transparent",
  zIndex: 15,
  cursor: "pointer",
};

export const navOverlayRightStyle: React.CSSProperties = {
  position: "absolute",
  right: 0,
  top: 0,
  bottom: 0,
  width: "40%",
  background: "transparent",
  zIndex: 15,
  cursor: "pointer",
};

// Transform helpers
export const getPageTransform = (isFlipping: boolean, direction: "next" | "prev"): string => {
  return isFlipping
    ? direction === "next"
      ? "rotateY(-180deg)"
      : "rotateY(180deg)"
    : "rotateY(0deg)";
};
