/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { Video } from "@/types/video";
import VideoCard from "./VideoCard";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { getVideoPublishList } from "@/api/api";

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
  // 视频列表
  const [videos, setVideos] = useState<Video[]>([]);
  // 是否正在加载
  const [loading, setLoading] = useState(false);
  // 是否还有更多数据
  const [hasMore, setHasMore] = useState(true);
  // 初始加载
  const [initialLoading, setInitialLoading] = useState(true);
  // 当前页码
  const [pageNum, setPageNum] = useState(1);
  // 总页码
  const [totalPage, setTotalPage] = useState(1);

  const { ref, inView } = useInView();

  // 加载数据的函数
  const loadMoreVideos = async () => {
    try {
      if (loading || pageNum > totalPage) return;
      setLoading(true);
      const res = await getVideoPublishList({
        pageNum: pageNum,
        pageSize: 4,
        keyword: searchQuery || ""
      });
      if (res.code === 200) {
        const { list: newVideos, totalPage: total } = res.data;
        setTotalPage(total);
        if (newVideos.length > 0) {
          setVideos((prev) => [...prev, ...newVideos]);
        }
        if (pageNum >= total) {
          setHasMore(false);
        } else {
          setPageNum((prev) => prev + 1);
        }
      }
    } catch (error) {
      console.error("加载视频失败:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    // 重置状态
    setVideos([]);
    setPageNum(1);
    setTotalPage(1);
    setHasMore(true);
    setInitialLoading(true);
    // 只在初始化或搜索词变化时加载一次
    loadMoreVideos();
  }, [searchQuery]);

  // 滚动加载的 useEffect
  useEffect(() => {
    // 确保不是初始加载，且在视图内并还有更多数据时才触发
    if (!initialLoading && inView && hasMore) {
      loadMoreVideos();
    }
  }, [inView, initialLoading]);

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
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
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
