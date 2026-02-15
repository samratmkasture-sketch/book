import React from "react";

// Common UI Styles
export const loadingMessageStyle: React.CSSProperties = {
  color: "#999",
  fontSize: "12px",
};

export const fileNameStyle: React.CSSProperties = {
  fontWeight: "bold",
};

// Flex utilities
export const flexContainerCenteredStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

export const flexContainerWrapStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexWrap: "wrap",
};

export const scrollableContainerStyle: React.CSSProperties = {
  maxHeight: "10vh",
  overflowY: "auto",
  flexShrink: 1,
};

// Collapse/Expand utilities
export const collapsibleHeaderStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  cursor: "pointer",
  marginBottom: "8px",
  flexShrink: 0,
};

export const collapsedArrowStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "#666",
};
