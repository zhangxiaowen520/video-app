"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Crown, Sparkles, Star } from "lucide-react";

export default function UnauthorizedHeader() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-gradient-to-b from-primary/20 via-primary/10 to-background pt-20 pb-8 overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, transparent 0%, transparent 100%)",
            "radial-gradient(circle at 100% 100%, rgba(var(--primary), 0.3) 0%, transparent 100%)",
            "radial-gradient(circle at 0% 0%, transparent 0%, transparent 100%)"
          ]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      <div className="px-4 space-y-8">
        <div className="text-center space-y-3 relative">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block relative">
            <Crown className="mx-auto h-16 w-16 text-yellow-500 drop-shadow-lg" />
            <motion.div
              className="absolute -right-2 -top-2"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
              <Sparkles className="w-5 h-5 text-yellow-500" />
            </motion.div>
          </motion.div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-bold bg-gradient-to-r from-yellow-500 to-primary bg-clip-text text-transparent">
            开启您的专属会员之旅
          </motion.h2>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>观看记录同步</span>
            <span>•</span>
            <span>高清视频</span>
            <span>•</span>
            <span>会员特权</span>
            <Star className="w-4 h-4 text-yellow-500" />
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4">
          <motion.button
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 20px rgba(var(--primary), 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/login")}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground relative overflow-hidden group">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative">登录</span>
          </motion.button>
          <motion.button
            whileHover={{
              scale: 1.02,
              backgroundColor: "hsl(var(--muted))"
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/register")}
            className="flex-1 py-3 rounded-xl bg-muted hover:bg-muted/80 transition-all duration-200 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative">注册</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
