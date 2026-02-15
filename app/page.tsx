"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col items-center justify-center gap-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
            📖 PDF Book Viewer
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
            A client-side PDF viewer built with Next.js and PDF.js
          </p>
        </div>
        <button
          onClick={() => router.push("/book")}
          className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          Open PDF Viewer
        </button>
      </main>
    </div>
  );
}
