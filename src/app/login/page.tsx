"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { Eye, EyeOff } from "lucide-react";

interface LoginForm {
  account: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState<LoginForm>({
    account: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.account || !form.password) {
      setError("请填写所有字段");
      return;
    }

    try {
      setIsLoading(true);
      // TODO: 实现登录逻辑
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/profile");
    } catch (err) {
      console.error("登录失败:", err);
      setError("登录失败，请检查账号密码");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center p-2">
          <BackButton fallbackPath="/" />
          <h1 className="ml-2 text-lg font-medium">登录</h1>
        </div>
      </div>

      <div className="pt-16 p-4">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-lg bg-red-500/10 text-red-500 text-sm mb-4">
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">手机号</label>
            <input
              type="text"
              value={form.account}
              onChange={(e) => setForm((prev) => ({ ...prev, account: e.target.value }))}
              placeholder="请输入手机号"
              className="w-full p-2 rounded-lg bg-muted"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">密码</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                placeholder="请输入密码"
                className="w-full p-2 pr-10 rounded-lg bg-muted"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-muted-foreground/20 rounded-full">
                {showPassword ? (
                  <EyeOff size={16} className="text-muted-foreground" />
                ) : (
                  <Eye size={16} className="text-muted-foreground" />
                )}
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded-lg ${
              isLoading ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"
            }`}>
            {isLoading ? "登录中..." : "登录"}
          </motion.button>

          <div className="flex justify-between text-sm">
            <Link href="/register" className="text-primary hover:underline">
              注册账号
            </Link>
            {/* <Link href="/forgot-password" className="text-muted-foreground hover:underline">
              忘记密码？
            </Link> */}
          </div>
        </form>
      </div>
    </div>
  );
}
