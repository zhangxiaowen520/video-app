"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Crown } from "lucide-react";

interface ProfileHeaderProps {
  isVip?: boolean;
}

export default function ProfileHeader({ isVip = true }: ProfileHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-gradient-to-b from-primary/20 to-background pt-20 pb-4">
      <div className="px-4 space-y-4">
        <div className="flex items-center gap-4">
          {/* 头像容器 */}
          <div className="relative">
            {/* VIP皇冠效果 */}
            {isVip && (
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute -top-8 -right-2 z-10 flex items-center justify-center">
                <motion.div
                  animate={{
                    y: [0, -4, 0],
                    rotate: [15, 10, 15]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="flex items-center justify-center">
                  <Crown
                    className="w-8 h-8 text-yellow-500 drop-shadow-lg filter saturate-150"
                    style={{
                      transformOrigin: "center",
                      filter: "drop-shadow(0 2px 4px rgba(234, 179, 8, 0.3))"
                    }}
                  />
                </motion.div>
              </motion.div>
            )}

            {/* 头像 */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative w-20 h-20">
              <Image
                src="https://picsum.photos/200"
                alt="头像"
                fill
                className="rounded-full object-cover border-4 border-background dark:border-background"
              />
              {/* VIP光环效果 */}
              {isVip && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(45deg, transparent, rgba(255,215,0,0.3), transparent)"
                  }}
                  animate={{
                    background: [
                      "linear-gradient(0deg, transparent, rgba(255,215,0,0.3), transparent)",
                      "linear-gradient(360deg, transparent, rgba(255,215,0,0.3), transparent)"
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              )}
            </motion.div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">用户昵称</h2>
              {/* VIP标签 */}
              {isVip && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="px-2 py-0.5 text-xs rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 flex items-center">
                  VIP会员
                </motion.span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">{isVip ? "尊贵会员" : "普通用户"}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
