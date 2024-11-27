"use client";

import { useEffect, useState, useCallback } from "react";
import { Video } from "@/types/video";
import VideoCard from "./VideoCard";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

// 将mockVideos移到单独的文件中
const mockVideos: Video[] = [
  {
    id: "1",
    title: "示例视频1 - 这是一个较长的标题，用来测试多行显示效果",
    description: "这是示例视频1的描述",
    coverUrl: "https://picsum.photos/seed/1/800/450",
    videoUrl: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
    views: 1234,
    duration: "3:45",
    createdAt: "2024-03-15",
    tags: ["娱乐", "音乐"]
  },
  {
    id: "2",
    title: "示例视频2",
    description: "这是示例视频2的描述",
    coverUrl: "https://picsum.photos/seed/2/800/450",
    videoUrl: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
    views: 5678,
    duration: "2:30",
    createdAt: "2024-03-14",
    tags: ["科技", "教育"]
  },
  {
    id: "3",
    title: "示例视频2",
    description: "这是示例视频2的描述",
    coverUrl: "https://picsum.photos/seed/2/800/450",
    videoUrl: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
    views: 5678,
    duration: "2:30",
    createdAt: "2024-03-14",
    tags: ["科技", "教育"]
  },
  {
    id: "4",
    title: "示例视频2",
    description: "这是示例视频2的描述",
    coverUrl: "https://picsum.photos/seed/2/800/450",
    videoUrl: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
    views: 5678,
    duration: "2:30",
    createdAt: "2024-03-14",
    tags: ["科技", "教育"]
  },
  {
    id: "5",
    title: "示例视频2",
    description: "这是示例视频2的描述",
    coverUrl: "https://picsum.photos/seed/2/800/450",
    videoUrl: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
    views: 5678,
    duration: "2:30",
    createdAt: "2024-03-14",
    tags: ["科技", "教育"]
  }
];

// 创建一个单独的数据服务
export const videoService = {
  getVideos: () => mockVideos,
  getVideoById: (id: string) => mockVideos.find((v) => v.id === id),
  searchVideos: (query: string) =>
    mockVideos.filter(
      (v) =>
        v.title.toLowerCase().includes(query.toLowerCase()) || v.description.toLowerCase().includes(query.toLowerCase())
    )
};

// 加载动画骨架屏组件
const VideoCardSkeleton = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 space-y-2">
    {/* 视频封面骨架 */}
    <div className="relative aspect-video rounded-lg overflow-hidden bg-muted animate-pulse" />

    {/* 标题骨架 */}
    <div className="space-y-2">
      <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
      <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
    </div>

    {/* 信息骨架 */}
    <div className="flex items-center gap-2">
      <div className="h-3 bg-muted rounded animate-pulse w-16" />
      <div className="h-3 bg-muted rounded animate-pulse w-3" />
      <div className="h-3 bg-muted rounded animate-pulse w-12" />
    </div>
  </motion.div>
);

interface VideoListProps {
  searchQuery?: string;
}

export default function VideoList({ searchQuery }: VideoListProps) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true); // 添加初始加载状态

  const { ref, inView } = useInView();

  const loadMoreVideos = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newVideos = searchQuery ? videoService.searchVideos(searchQuery) : videoService.getVideos();

    setVideos((prev) => [...prev, ...newVideos]);
    setLoading(false);
    setInitialLoading(false);

    if (videos.length > 30) {
      setHasMore(false);
    }
  }, [loading, hasMore, searchQuery, videos.length]);

  useEffect(() => {
    loadMoreVideos();
  }, [loadMoreVideos]);

  useEffect(() => {
    if (inView) {
      loadMoreVideos();
    }
  }, [inView, loadMoreVideos]);

  // 初始加载时显示骨架屏
  if (initialLoading) {
    return (
      <div className="grid grid-cols-1 pb-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(8)].map((_, index) => (
          <VideoCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 pb-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {videos.map((video, index) => (
        <VideoCard key={video.id + index} video={video} />
      ))}

      {hasMore && (
        <div ref={ref} className="col-span-full py-8 flex justify-center">
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-2">
              {/* 加载动画 */}
              <div className="flex gap-1">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: 0
                  }}
                  className="w-2 h-2 rounded-full bg-primary"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: 0.2
                  }}
                  className="w-2 h-2 rounded-full bg-primary"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: 0.4
                  }}
                  className="w-2 h-2 rounded-full bg-primary"
                />
              </div>
              <span className="text-sm text-muted-foreground">加载中...</span>
            </motion.div>
          )}
          {!loading && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-muted-foreground">
              向上滚动加载更多
            </motion.span>
          )}
        </div>
      )}
    </div>
  );
}
