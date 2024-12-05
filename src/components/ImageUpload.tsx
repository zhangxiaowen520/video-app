"use client";

import { ChangeEvent, useRef } from "react";
import { Camera } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BASE_URL } from "@/api/request";
import storageService from "@/utils/storageService";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("图片大小不能超过2MB");
      return;
    }

    try {
      // 创建 FormData 对象
      const formData = new FormData();
      formData.append("file", file);

      // 发送图片到服务器
      const response = await fetch(`${BASE_URL}/aliyun/oss/upload`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: storageService.getToken() || ""
        }
      });

      if (!response.ok) {
        throw new Error("上传失败");
      }

      const data = await response.json();

      // 假设服务器返回的数据中包含图片URL
      onChange(data.data);
    } catch (error) {
      console.error("上传错误:", error);
      alert("图片上传失败，请重试");
    }
  };

  return (
    <div className="relative">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-24 h-24 cursor-pointer"
        onClick={handleClick}>
        <Image src={value || "/placeholder.jpg"} alt="头像" fill className="rounded-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full opacity-0 hover:opacity-100 transition-opacity">
          <Camera className="w-6 h-6 text-white" />
        </div>
      </motion.div>
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        accept="image/*"
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
}
