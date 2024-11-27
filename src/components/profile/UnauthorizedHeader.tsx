"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function UnauthorizedHeader() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-gradient-to-b from-primary/20 to-background pt-20 pb-4">
      <div className="px-4 space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-bold">登录后享受更多功能</h2>
          <p className="text-sm text-muted-foreground mt-2">观看记录同步 · 高清视频 · 会员特权</p>
        </div>

        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/login")}
            className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground text-center">
            登录
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/register")}
            className="flex-1 py-2 rounded-lg bg-muted hover:bg-muted/80 text-center">
            注册
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
