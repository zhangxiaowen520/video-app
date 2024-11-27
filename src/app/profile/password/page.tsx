"use client";

import { motion } from "framer-motion";
import {  Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import BackButton from "@/components/BackButton";

interface PasswordForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function PasswordPage() {
  const [form, setForm] = useState<PasswordForm>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
      setError("请填写所有密码字段");
      return false;
    }
    if (form.newPassword.length < 6) {
      setError("新密码长度不能少于6位");
      return false;
    }
    if (form.newPassword !== form.confirmPassword) {
      setError("两次输入的新密码不一致");
      return false;
    }
    if (form.oldPassword === form.newPassword) {
      setError("新密码不能与旧密码相同");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    setError("");
    if (!validateForm()) return;

    try {
      setIsSaving(true);
      // TODO: 调用API修改密码
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("密码修改成功");
      // 重置表单
      setForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    } catch (err) {
      console.error("修改密码失败:", err);
      setError("修改密码失败，请重试");
    } finally {
      setIsSaving(false);
    }
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="min-h-screen pb-16">
      {/* 顶部导航 */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center">
            <BackButton fallbackPath="/profile" />
            <h1 className="ml-2 text-lg font-medium">修改密码</h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={isSaving}
            className={`px-4 py-1 text-sm rounded-full ${
              isSaving ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"
            }`}>
            {isSaving ? "保存中..." : "保存"}
          </motion.button>
        </div>
      </div>

      <div className="pt-16 p-4 space-y-6">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-lg bg-red-500/10 text-red-500 text-sm">
            {error}
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          {/* 旧密码 */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">当前密码</label>
            <div className="relative">
              <input
                type={showPasswords.old ? "text" : "password"}
                value={form.oldPassword}
                onChange={(e) => setForm((prev) => ({ ...prev, oldPassword: e.target.value }))}
                disabled={isSaving}
                className="w-full p-2 pr-10 rounded-lg bg-muted"
                placeholder="请输入当前密码"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("old")}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-muted-foreground/20 rounded-full">
                {showPasswords.old ? (
                  <EyeOff size={16} className="text-muted-foreground" />
                ) : (
                  <Eye size={16} className="text-muted-foreground" />
                )}
              </button>
            </div>
          </div>

          {/* 新密码 */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">新密码</label>
            <div className="relative">
              <input
                type={showPasswords.new ? "text" : "password"}
                value={form.newPassword}
                onChange={(e) => setForm((prev) => ({ ...prev, newPassword: e.target.value }))}
                disabled={isSaving}
                className="w-full p-2 pr-10 rounded-lg bg-muted"
                placeholder="请输入新密码"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("new")}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-muted-foreground/20 rounded-full">
                {showPasswords.new ? (
                  <EyeOff size={16} className="text-muted-foreground" />
                ) : (
                  <Eye size={16} className="text-muted-foreground" />
                )}
              </button>
            </div>
          </div>

          {/* 确认新密码 */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">确认新密码</label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? "text" : "password"}
                value={form.confirmPassword}
                onChange={(e) => setForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                disabled={isSaving}
                className="w-full p-2 pr-10 rounded-lg bg-muted"
                placeholder="请再次输入新密码"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-muted-foreground/20 rounded-full">
                {showPasswords.confirm ? (
                  <EyeOff size={16} className="text-muted-foreground" />
                ) : (
                  <Eye size={16} className="text-muted-foreground" />
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
