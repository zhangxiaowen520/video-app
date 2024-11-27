"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface BackButtonProps {
  fallbackPath?: string;
}

export default function BackButton({ fallbackPath = "/" }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    // 如果有浏览器历史记录，则返回上一页
    if (window.history.length > 2) {
      router.back();
    } else {
      // 否则跳转到指定的fallback路径
      router.push(fallbackPath);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleBack}
      className="p-2 hover:bg-muted rounded-full">
      <ArrowLeft size={24} />
    </motion.button>
  );
}
