import React from "react";

// Bookmarks Section Styles
export const bookmarksContainerStyle: React.CSSProperties = {
  marginTop: "8px",
  padding: "12px",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  backgroundColor: "#f9fafb",
  maxHeight: "20vh",
  display: "flex",
  flexDirection: "column",
};

export const bookmarksHeaderStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  cursor: "pointer",
  marginBottom: "8px",
  flexShrink: 0,
};

export const bookmarksHeaderTitleStyle: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "bold",
};

export const bookmarkHeaderArrowStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "#666",
};

export const bookmarkFileInfoStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "#666",
  marginBottom: "8px",
  fontStyle: "italic",
  flexShrink: 0,
};

export const bookmarkEmptyStateStyle: React.CSSProperties = {
  color: "#999",
  fontSize: "12px",
};

export const bookmarkAddButtonStyle: React.CSSProperties = {
  marginTop: "8px",
  padding: "4px 8px",
  backgroundColor: "#4f46e5",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "12px",
  fontWeight: 600,
  transition: "all 0.2s ease",
};

export const bookmarkGoButtonStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "#4f46e5",
  cursor: "pointer",
  fontSize: "11px",
  fontWeight: 600,
  padding: 0,
};

export const bookmarkRemoveButtonStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "#dc2626",
  cursor: "pointer",
  fontSize: "11px",
  fontWeight: 600,
  padding: 0,
};
