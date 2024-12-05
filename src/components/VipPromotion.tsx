"use client";

import { Crown, Sparkles, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function VipPromotion() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      onClick={() => router.push("/profile/vip")}
      className="relative overflow-hidden p-4 mx-4 mb-4 rounded-xl cursor-pointer border border-yellow-500/20">
      {/* 背景渐变 */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-yellow-500/10 to-yellow-500/5" />

      {/* 动态光效 */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, transparent 0%, transparent 100%)",
            "radial-gradient(circle at 100% 100%, rgba(234, 179, 8, 0.2) 0%, transparent 100%)",
            "radial-gradient(circle at 0% 0%, transparent 0%, transparent 100%)"
          ]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* 闪光效果 */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(45deg, transparent, rgba(234, 179, 8, 0.3), transparent)",
          backgroundSize: "200% 200%"
        }}
        animate={{
          backgroundPosition: ["200% 200%", "-200% -200%"]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      <div className="relative flex items-center gap-4">
        {/* VIP图标区域 */}
        <div className="relative flex-shrink-0">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="relative">
            <Crown className="w-12 h-12 text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.3)]" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute -top-1 -right-1">
              <Sparkles className="w-4 h-4 text-yellow-500" />
            </motion.div>
          </motion.div>
          {/* 光环效果 */}
          <motion.div
            className="absolute -inset-2 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(234,179,8,0.2) 0%, transparent 70%)"
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </div>

        {/* 文字内容 */}
        <div className="flex-1">
          <motion.h3
            className="text-lg font-bold flex items-center gap-2"
            animate={{
              color: ["hsl(var(--foreground))", "hsl(48, 100%, 50%)", "hsl(var(--foreground))"]
            }}
            transition={{ duration: 3, repeat: Infinity }}>
            开通会员观看完整视频
            <Star className="w-4 h-4 text-yellow-500" />
          </motion.h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-yellow-500 font-medium">尊贵会员</span>
            <motion.span
              className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}>
              限时特惠
            </motion.span>
          </div>
        </div>

        {/* 箭头动画 */}
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="text-yellow-500">
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center">
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>

      {/* 装饰性元素 */}
      <motion.div
        className="absolute top-0 right-0 w-32 h-32 opacity-10"
        style={{
          background: "radial-gradient(circle, rgba(234,179,8,0.3) 0%, transparent 70%)"
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </motion.div>
  );
}
