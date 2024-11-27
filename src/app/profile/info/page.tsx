"use client";

import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import ImageUpload from "@/components/ImageUpload";
import BackButton from "@/components/BackButton";

export default function ProfileInfoPage() {
  const [userInfo, setUserInfo] = useState({
    account: "13800138000",
    avatar: "https://picsum.photos/200",
    nickname: "用户昵称",
    // gender: "保密",
    bio: "这个人很懒，什么都没有写~"
  });
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      // TODO: 调用API保存用户信息
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("保存成功");
    } catch (error) {
      console.error("保存失败:", error);
      alert("保存失败，请重试");
    } finally {
      setIsSaving(false);
    }
  };

  const copyAccount = async () => {
    try {
      await navigator.clipboard.writeText(userInfo.account);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("复制失败:", err);
    }
  };

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
            value={userInfo.avatar}
            onChange={(value) => setUserInfo((prev) => ({ ...prev, avatar: value }))}
            disabled={isSaving}
          />
          <p className="text-xs text-muted-foreground">点击更换头像（不超过5MB）</p>
        </motion.div>

        {/* 表单 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          {/* 账号字段 - 只读 */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">账号</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={userInfo.account}
                readOnly
                className="flex-1 p-2 rounded-lg bg-muted/50 cursor-default"
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

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">昵称</label>
            <input
              type="text"
              value={userInfo.nickname}
              onChange={(e) => setUserInfo((prev) => ({ ...prev, nickname: e.target.value }))}
              disabled={isSaving}
              className="w-full p-2 rounded-lg bg-muted"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">个人简介</label>
            <textarea
              value={userInfo.bio}
              onChange={(e) => setUserInfo((prev) => ({ ...prev, bio: e.target.value }))}
              disabled={isSaving}
              rows={4}
              className="w-full p-2 rounded-lg bg-muted resize-none"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
