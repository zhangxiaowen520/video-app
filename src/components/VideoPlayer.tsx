"use client";

import { useRef, useState, useEffect } from "react";
import { Crown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  isVip?: boolean;
}

export default function VideoPlayer({ src, poster, isVip = false }: VideoPlayerProps) {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Plyr>();
  const [showVipModal, setShowVipModal] = useState(false);
  const [remainingTime, setRemainingTime] = useState(30);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 确保组件已经挂载并且video元素存在
    if (!videoRef.current) return;

    // 延迟初始化Plyr，确保DOM已经完全准备好
    const timer = setTimeout(() => {
      try {
        // 初始化Plyr
        const player = new Plyr(videoRef.current!, {
          controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "fullscreen"],
          hideControls: true,
          keyboard: { focused: true, global: true }
        });

        playerRef.current = player;

        // 监听时间更新
        player.on("timeupdate", () => {
          const currentTime = player.currentTime;

          // 非会员观看时间限制
          if (!isVip && currentTime >= 30) {
            player.pause();
            player.currentTime = 30;
            setShowVipModal(true);
          }

          // 更新剩余时间
          if (!isVip && currentTime < 30) {
            setRemainingTime(Math.ceil(30 - currentTime));
          }
        });

        // 监听进度条点击
        player.on("seeked", () => {
          if (!isVip && player.currentTime > 30) {
            player.currentTime = 30;
            player.pause();
            setShowVipModal(true);
          }
        });

        setIsReady(true);
      } catch (error) {
        console.error("Plyr initialization error:", error);
      }
    }, 0);

    return () => {
      clearTimeout(timer);
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [isVip]);

  return (
    <div className="relative group plyr-custom">
      {/* 非会员剩余时间提示 */}
      {!isVip && !showVipModal && remainingTime < 30 && (
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 text-white text-sm z-50">
          剩余试看时间：{remainingTime}秒
        </div>
      )}

      {/* 视频播放器 */}
      <div className={`w-full aspect-video ${!isReady ? 'bg-muted' : ''}`}>
        <video ref={videoRef} poster={poster} className="w-full h-full">
          <source src={src} type="video/mp4" />
        </video>
      </div>

      {/* VIP弹窗 */}
      <AnimatePresence>
        {showVipModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="p-4 rounded-xl bg-background/95 w-[280px] space-y-3 text-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block">
                <Crown className="w-8 h-8 mx-auto text-yellow-500" />
              </motion.div>
              <h3 className="text-base font-bold">开通会员观看完整视频</h3>
              <p className="text-xs text-muted-foreground">开通会员即可无限观看全站视频</p>
              <div className="space-y-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push("/profile/vip")}
                  className="w-full py-1.5 text-sm rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
                  立即开通会员
                </motion.button>
                <button
                  onClick={() => {
                    setShowVipModal(false);
                    if (playerRef.current) {
                      playerRef.current.play();
                    }
                  }}
                  className="w-full py-1.5 text-xs text-muted-foreground hover:text-foreground">
                  继续试看
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .plyr-custom {
          --plyr-color-main: hsl(var(--primary));
        }

        .plyr--video.plyr--hide-controls:not(.plyr--playing) .plyr__controls {
          opacity: 1;
          pointer-events: auto;
        }
      `}</style>
    </div>
  );
}