"use client";

import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import BackButton from "@/components/BackButton";

// 模拟历史记录数据
const mockHistoryList = [
  {
    id: "1",
    title: "示例视频1",
    coverUrl: "https://picsum.photos/seed/1/800/450",
    duration: "12:34",
    progress: 60,
    watchedAt: "2024-03-15 12:34"
  }
  // ... 其他记录
];

export default function HistoryPage() {
  const router = useRouter();
  const [historyList, setHistoryList] = useState(mockHistoryList);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      // 模拟加载更多数据
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setHistoryList((prev) => [...prev, ...mockHistoryList]);

      // 模拟数据加载完毕
      if (historyList.length > 30) {
        setHasMore(false);
      }
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, historyList.length]);

  // 监听滚动到底部
  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView, loadMore]);

  return (
    <div className="min-h-screen pb-16">
      {/* 顶部导航 */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center">
            <BackButton fallbackPath="/profile" />
            <h1 className="ml-2 text-lg font-medium">观看记录</h1>
          </div>
          <button className="p-2 hover:bg-muted rounded-full text-red-500">
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      <div className="pt-16 p-4 space-y-4">
        {historyList.map((item, index) => (
          <motion.div
            key={item.id + index}
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { delay: index * 0.1 }
            }}
            className="flex gap-4 cursor-pointer"
            onClick={() => router.push(`/video/${item.id}`)}>
            {/* 视频封面 */}
            <div className="relative w-40 aspect-video rounded-lg overflow-hidden">
              <Image src={item.coverUrl} alt={item.title} fill className="object-cover" />
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
                <div className="h-full bg-primary" style={{ width: `${item.progress}%` }} />
              </div>
            </div>

            {/* 视频信息 */}
            <div className="flex-1 space-y-1">
              <h3 className="line-clamp-2 text-sm font-medium">{item.title}</h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{item.duration}</span>
                <span>•</span>
                <span>{item.watchedAt}</span>
              </div>
            </div>
          </motion.div>
        ))}

        {/* 加载更多 */}
        {hasMore && (
          <div ref={ref} className="py-4 text-center">
            {loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center items-center gap-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
                <span className="text-sm text-muted-foreground">加载中...</span>
              </motion.div>
            ) : (
              <span className="text-sm text-muted-foreground">上拉加载更多</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
