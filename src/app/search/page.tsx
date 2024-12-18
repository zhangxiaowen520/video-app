"use client";

import VideoList from "@/components/VideoList";
import SearchBar from "@/components/SearchBar";
import { Suspense } from "react";

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

// eslint-disable-next-line @next/next/no-async-client-component
export default async function SearchPage({ searchParams }: PageProps) {
  const params = await searchParams;
  return (
    <main className="flex min-h-screen flex-col">
      <SearchBar />
      <div className="pt-16">
        <h1 className="px-4 text-lg font-medium">搜索：{params.q || ""}</h1>
        <Suspense fallback={<div>加载中...</div>}>
          <VideoList searchQuery={params.q} />
        </Suspense>
      </div>
    </main>
  );
}
