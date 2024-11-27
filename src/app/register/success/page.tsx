"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Copy, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";

interface CopyState {
  account: boolean;
  nickname: boolean;
  password: boolean;
}

export default function RegisterSuccessPage() {
  const router = useRouter();
  const [copied, setCopied] = useState<CopyState>({
    account: false,
    nickname: false,
    password: false
  });

  const account = "1234567890";
  const nickname = "用户1234567890";
  const password = "1234567890";

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
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-full max-w-md space-y-6">
          {/* 成功图标 */}
          <div className="text-center">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
              <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
            </motion.div>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 text-2xl font-bold">
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
            className="space-y-4 bg-muted/50 p-4 rounded-lg">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">账号</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={account}
                  readOnly
                  className="flex-1 p-2 rounded-lg bg-background cursor-default"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCopy(account, "account")}
                  className="p-2 rounded-lg bg-muted hover:bg-muted/80">
                  {copied.account ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                </motion.button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">昵称</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={nickname}
                  readOnly
                  className="flex-1 p-2 rounded-lg bg-background cursor-default"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCopy(nickname, "nickname")}
                  className="p-2 rounded-lg bg-muted hover:bg-muted/80">
                  {copied.nickname ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                </motion.button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">密码</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={password}
                  readOnly
                  className="flex-1 p-2 rounded-lg bg-background cursor-default"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCopy(password, "password")}
                  className="p-2 rounded-lg bg-muted hover:bg-muted/80">
                  {copied.password ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* 按钮组 */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/")}
              className="flex-1 py-2 rounded-lg bg-muted hover:bg-muted/80">
              返回首页
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/login")}
              className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground">
              立即登录
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </Suspense>
  );
}
