"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Copy, Check, Sparkles } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface CopyState {
  account: boolean;
  nickname: boolean;
  password: boolean;
}

function RegisterSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const account = searchParams.get("username") || "";
  const nickname = searchParams.get("nickName") || "";
  const password = searchParams.get("password") || "";

  const [copied, setCopied] = useState<CopyState>({
    account: false,
    nickname: false,
    password: false
  });

  const handleCopy = async (text: string, field: keyof CopyState) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied((prev) => ({ ...prev, [field]: true }));
      setTimeout(() => {
        setCopied((prev) => ({ ...prev, [field]: false }));
      }, 2000);
    } catch (err) {
      console.error("复制失败:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-primary/5 to-background">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-6">
        {/* 成功图标 */}
        <div className="text-center relative">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
            transition={{
              scale: { duration: 0.5 },
              rotate: { duration: 1, delay: 0.5 }
            }}
            className="relative inline-block">
            <CheckCircle2 className="mx-auto h-20 w-20 text-green-500" />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute inset-0 rounded-full bg-green-500/20"
            />
            <motion.div
              className="absolute -right-2 -top-2"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
              <Sparkles className="w-6 h-6 text-yellow-500" />
            </motion.div>
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-2xl font-bold bg-gradient-to-r from-green-500 to-primary bg-clip-text text-transparent">
            注册成功
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-2 text-sm text-muted-foreground">
            请保存好您的账号信息
          </motion.p>
        </div>

        {/* 账号信息 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-4 bg-card p-6 rounded-xl border shadow-lg backdrop-blur-sm">
          {[
            { label: "账号", value: account, key: "account" },
            { label: "昵称", value: nickname, key: "nickname" },
            { label: "密码", value: password, key: "password" }
          ].map((item, index) => (
            <motion.div
              key={item.key}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="space-y-2">
              <label className="text-sm text-muted-foreground">{item.label}</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={item.value}
                  readOnly
                  className="flex-1 p-3 rounded-lg bg-background/50 cursor-default border focus:outline-none"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCopy(item.value, item.key as keyof CopyState)}
                  className="p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                  {copied[item.key as keyof CopyState] ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 按钮组 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "hsl(var(--muted))" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/")}
            className="flex-1 py-3 rounded-lg bg-muted hover:bg-muted/80 transition-all duration-200">
            返回首页
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/login")}
            className="flex-1 py-3 rounded-lg bg-gradient-to-r from-green-500 to-primary text-primary-foreground hover:opacity-90 transition-opacity">
            立即登录
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function RegisterSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterSuccessContent />
    </Suspense>
  );
}
