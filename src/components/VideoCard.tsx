"use client";

import { Video } from "@/types/video";
import { Play } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative space-y-2 p-4">
      {/* 视频封面 */}
      <div className="relative aspect-video overflow-hidden rounded-lg">
        <Image
          src={video.picture}
          alt={video.title}
          fill
          className="object-cover transition-all duration-300 group-hover:scale-105"
        />
        <motion.button
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1, scale: 1.1 }}
          className="absolute inset-0 flex items-center justify-center bg-black/30"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/video/${video.id}`);
          }}>
          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            <Play className="h-12 w-12 text-white" />
          </motion.div>
        </motion.button>
      </div>

      {/* 视频信息 */}
      <motion.div
        className="space-y-1 cursor-pointer"
        onClick={() => router.push(`/video/${video.id}`)}
        whileHover={{ x: 5 }}>
        <h3 className="line-clamp-2 text-sm font-medium">{video.title}</h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{Number(video.totalWatch) + Math.floor(Math.random() * 10000)}次观看</span>
          <span>•</span>
          <span>{video.publishDate || '刚刚更新'}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
