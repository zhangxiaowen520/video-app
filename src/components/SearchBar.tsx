"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchBar() {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    // 从localStorage获取搜索历史
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("searchHistory");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const handleSearch = (query: string) => {
    if (!query.trim()) return;

    // 保存到搜索历史
    const newHistory = [query, ...searchHistory.filter((item) => item !== query)].slice(0, 10);
    setSearchHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));

    // 跳转到搜索结果页面
    router.push(`/search?q=${encodeURIComponent(query)}`);
    setIsSearchOpen(false);
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

  const removeHistoryItem = (item: string) => {
    const newHistory = searchHistory.filter((i) => i !== item);
    setSearchHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

  return (
    <>
      <AnimatePresence>
        {!isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm p-2 border-b">
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsSearchOpen(true)}
                className="flex-1 flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors">
                <Search size={20} />
                <span className="text-sm">搜索视频</span>
              </motion.button>
              <ThemeToggle />
            </div>
          </motion.div>
        )}

        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background">
            <motion.div initial={{ y: -20 }} animate={{ y: 0 }} className="flex items-center gap-2 p-2 border-b">
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery("");
                }}
                className="p-2">
                <X size={20} />
              </button>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch(searchQuery);
                  }
                }}
                placeholder="搜索视频"
                className="flex-1 bg-transparent outline-none text-base placeholder:text-sm"
                autoFocus
              />
              <button onClick={() => handleSearch(searchQuery)} className="px-4 py-1 text-sm text-primary">
                搜索
              </button>
            </motion.div>

            {/* 搜索历史 */}
            {searchHistory.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">搜索历史</h3>
                  <button onClick={clearHistory} className="text-sm text-muted-foreground">
                    清空
                  </button>
                </div>
                <div className="space-y-2">
                  {searchHistory.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <button onClick={() => handleSearch(item)} className="text-sm text-muted-foreground">
                        {item}
                      </button>
                      <button onClick={() => removeHistoryItem(item)} className="p-1">
                        <X size={16} className="text-muted-foreground" />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
