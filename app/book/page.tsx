"use client";

import React from "react";
import BookViewer from "../components/BookViewer";

export default function Page() {
  const [title, setTitle] = React.useState("Sample Report");

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ textAlign: "center", marginBottom: 16 }}>{title} — Book View</h1>
      <BookViewer url="./sample-report.pdf" onTitleChange={setTitle} />
    </main>
  );
}
