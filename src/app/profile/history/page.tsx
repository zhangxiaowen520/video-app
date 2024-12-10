"use client";

import { motion } from "framer-motion";
import { History } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import BackButton from "@/components/BackButton";
import { getUserHistory } from "@/api/api";
import dayjs from "dayjs";

// 定义历史记录类型
interface HistoryItem {
  createDate: string;
  id: number;
  nickname: string | null;
  userId: number;
  userName: string;
  username: string | null;
  videoId: number;
  videoName: string;
  videoReduce: string;
  picture: string;
}

// 空状态组件
function EmptyPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block rounded-full">
          <History className="w-8 h-8 text-muted-foreground" />
        </motion.div>
        <h3 className="text-lg font-medium py-1">暂无观看记录</h3>
        <p className="text-sm text-muted-foreground">您还没有观看过任何视频</p>
      </motion.div>
    </div>
  );
}

export default function HistoryPage() {
  const router = useRouter();
  const [historyList, setHistoryList] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  // 当前页码
  const [hasMore, setHasMore] = useState(true);
  // 当前页码
  const [pageNum, setPageNum] = useState(1);
  // 总页码
  const [totalPage, setTotalPage] = useState(1);
  const { ref, inView } = useInView();

  const loadMore = async () => {
    try {
      if (loading || !hasMore) return;
      setHasMore(true);
      setLoading(true);
      const res = await getUserHistory({ pageNum: pageNum, pageSize: 5 });
      if (res.code === 200) {
        const { list: newData, totalPage: total } = res.data;
        setTotalPage(total);
        if (newData.length > 0) {
          setHistoryList((prev) => [...prev, ...newData]);
        }
        if (pageNum >= total) {
          setHasMore(false);
        } else {
          setPageNum((prev) => prev + 1);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // 监听滚动到底部
  useEffect(() => {
    if (inView && hasMore) {
      loadMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  useEffect(() => {
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen pb-16">
      {/* 顶部导航 */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center">
            <BackButton fallbackPath="/profile" />
            <h1 className="ml-2 text-lg font-medium">观看记录</h1>
          </div>
        </div>
      </div>
      {historyList.length === 0 ? (
        <EmptyPage />
      ) : (
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
                <Image src={item.picture || ""} alt={item.videoName} fill className="object-cover" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
                  <div className="h-full bg-primary" style={{ width: `50%` }} />
                </div>
              </div>
              {/* 视频信息 */}
              <div className="flex-1 space-y-1">
                <h3 className="line-clamp-2 text-sm font-medium">{item.videoName}</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground max-w-[200px]">
                  <span className="line-clamp-2">{item.videoReduce}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {dayjs(item.createDate).format("YYYY-MM-DD HH:mm:ss")}
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
      )}
    </div>
  );
}
