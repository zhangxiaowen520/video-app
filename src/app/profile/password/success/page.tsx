"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PasswordSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // 3秒后自动跳转到个人资料页
    const timer = setTimeout(() => {
      router.push("/profile");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center gap-4 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}>
          <CheckCircle2 size={64} className="text-green-500" />
        </motion.div>
        <h1 className="text-2xl font-bold">密码修改成功！</h1>
        <p className="text-muted-foreground">
          页面将在3秒后自动跳转到个人中心
          <br />
          或点击下方按钮立即跳转
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/profile")}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-full text-sm">
          返回个人中心
        </motion.button>
      </motion.div>
    </div>
  );
}
