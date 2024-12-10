"use client";

import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";
import ImageUpload from "@/components/ImageUpload";
import BackButton from "@/components/BackButton";
import storageService, { UserInfo } from "@/utils/storageService";
import { getUserInfo, saveUserInfo } from "@/api/login";
import { useRouter } from "next/navigation";

export default function ProfileInfoPage() {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  const getUserInfoClick = async () => {
    try {
      const res = await getUserInfo();
      if (res.code === 200) {
        storageService.setUserInfo(res.data);
        router.push("/profile");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const data = await saveUserInfo({ ...userInfo } as API.UserInfoType);
      if (data.code === 200) {
        getUserInfoClick();
      }
    } catch (error) {
      console.error("保存失败:", error);
      alert("保存失败，请重试");
    } finally {
      setIsSaving(false);
    }
  };

  const copyAccount = async () => {
    try {
      await navigator.clipboard.writeText(userInfo?.username || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("复制失败:", err);
    }
  };

  useEffect(() => {
    const userInfo = storageService.getUserInfo();
    if (userInfo) {
      setUserInfo(userInfo);
    }
  }, []);

  return (
    <div className="min-h-screen pb-16">
      {/* 顶部导航 */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center">
            <BackButton fallbackPath="/profile" />
            <h1 className="ml-2 text-lg font-medium">个人资料</h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            disabled={isSaving}
            className={`px-4 py-1 text-sm rounded-full ${
              isSaving ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"
            }`}>
            {isSaving ? "保存中..." : "保存"}
          </motion.button>
        </div>
      </div>

      <div className="pt-16 p-4 space-y-6">
        {/* 头像 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-4">
          <ImageUpload
            value={userInfo?.icon || "https://picsum.photos/200"}
            onChange={(value) => setUserInfo((prev) => (prev ? { ...prev, icon: value } : null))}
            disabled={isSaving}
          />
          <p className="text-xs text-muted-foreground">点击更换头像（不超过2MB）</p>
        </motion.div>

        {/* 表单 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          {/* 账号字段 - 只读 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">账号（唯一，请保存好）</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={userInfo?.username}
                readOnly
                className="flex-1 p-3 rounded-lg bg-muted border-2 border-transparent focus:bg-background focus:border-primary/50 focus:outline-none transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={copyAccount}
                className="p-2 rounded-lg bg-muted hover:bg-muted/80">
                {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
              </motion.button>
            </div>
          </div>

          {/* <div className="space-y-2">
            <label className="text-sm font-medium">入驻时间</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={userInfo?.createTime}
                readOnly
                className="flex-1 p-3 rounded-lg bg-muted border-2 border-transparent focus:bg-background focus:border-primary/50 focus:outline-none transition-all"
              />
            </div>
          </div> */}

          <div className="space-y-2">
            <label className="text-sm font-medium">昵称</label>
            <input
              type="text"
              value={userInfo?.nickName}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 8) {
                  setUserInfo((prev) => (prev ? { ...prev, nickName: value } : null));
                }
              }}
              minLength={2}
              maxLength={8}
              disabled={isSaving}
              className="w-full p-3 rounded-lg bg-muted border-2 border-transparent focus:bg-background focus:border-primary/50 focus:outline-none transition-all"
              placeholder="请输入昵称"
            />
            <p className="text-xs text-muted-foreground">
              {userInfo?.nickName ? `${userInfo.nickName.length}/8` : "0/8"} (2-8个字符)
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">个人简介</label>
            <textarea
              value={userInfo?.note ?? "这个人什么也没留，请写点什么吧..."}
              onChange={(e) => setUserInfo((prev) => (prev ? { ...prev, note: e.target.value } : null))}
              disabled={isSaving}
              rows={4}
              className="w-full p-3 rounded-lg bg-muted border-2 border-transparent focus:bg-background focus:border-primary/50 focus:outline-none transition-all resize-none"
              placeholder="请输入个人简介"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
