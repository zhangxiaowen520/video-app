"use client";

import { Suspense, use } from "react";
import VideoPlayer from "@/components/VideoPlayer";
import VipPromotion from "@/components/VipPromotion";
import BackButton from "@/components/BackButton";
import { addUserHistory, getVideoDetail } from "@/api/api";
import { useEffect, useState } from "react";
import storageService from "@/utils/storageService";
import dayjs from "dayjs";

// Separate client component for video content
function VideoContent({ videoId }: { videoId: number }) {
  const [video, setVideo] = useState<API.VideoDetailType | null>(null);
  const [isVip, setIsVip] = useState(false);

  const getVideoDetailClick = async () => {
    try {
      const res = await getVideoDetail({ id: videoId });
      if (res.code === 200) {
        setVideo(res.data);
        setIsVip(storageService.isVip());
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addUserHistoryClick = async () => {
    try {
      const res = await addUserHistory({ videoId });
      if (res.code === 200) {
        console.log("添加成功");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (videoId) {
      getVideoDetailClick();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  useEffect(() => {
    const isLogin = storageService.isLoggedIn();
    if (isLogin) {
      addUserHistoryClick();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!video) {
    return <div>视频不存在</div>;
  }

  return (
    <div className="pt-14">
      <VideoPlayer src={isVip ? video.longUrl : video.shortUrl} poster={video.picture} />
      <div className="p-4 space-y-4">
        <h1 className="text-lg font-medium">{video.title}</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{video.totalWatch || 0} 次观看</span>
          <span>•</span>
          <span>{dayjs(video.publishDate).format("YYYY-MM-DD HH:mm:ss")}</span>
        </div>
        {video.tags && (
          <div className="flex flex-wrap gap-2">
            {video.tags.split(",").map((tag, index) => (
              <span key={index} className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">
                {tag.trim()}
              </span>
            ))}
          </div>
        )}
        <p className="text-sm text-muted-foreground">{video.reduce}</p>
      </div>
      <VipPromotion />
    </div>
  );
}

// Main page component
export default function VideoPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const videoId = Number(resolvedParams.id);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center p-2">
          <BackButton fallbackPath="/" />
        </div>
      </div>

      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-pulse text-center">
              <div className="h-4 w-24 bg-muted rounded mb-2"></div>
              <div className="text-sm text-muted-foreground">加载中...</div>
            </div>
          </div>
        }>
        <VideoContent videoId={videoId} />
      </Suspense>
    </div>
  );
}
