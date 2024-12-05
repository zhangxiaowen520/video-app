"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import storageService from "@/utils/storageService";
import { login } from "@/api/login";
import { Eye, EyeOff, LogIn, User, KeyRound } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState<API.LoginType>({
    username: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.username || !form.password) {
      setError("请填写所有字段");
      return;
    }

    try {
      setIsLoading(true);
      // TODO: 调用登录API
      const response = await login(form);
      if (response.code === 200) {
        // 保存token
        storageService.setToken(response.data.tokenHead + response.data.token);

        router.push("/profile");
      } else {
        setError("登录失败，请检查账号密码");
      }
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
          <BackButton fallbackPath="/profile" />
          <h1 className="ml-2 text-lg font-medium">登录</h1>
        </div>
      </div>

      <div className="pt-16 p-4 flex flex-col items-center">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-sm p-3 rounded-lg bg-red-500/10 text-red-500 text-sm mb-4">
            {error}
          </motion.div>
        )}

        <motion.form
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="w-full max-w-sm space-y-6">
          <div className="space-y-4">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-2">
              <label className="text-sm text-muted-foreground flex items-center gap-2">
                <User size={16} className="text-primary" />
                账号
              </label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
                placeholder="请输入登录账号"
                className="w-full p-3 rounded-lg bg-muted/50 border border-muted-foreground/20 focus:border-primary/50 focus:bg-muted transition-colors outline-none"
                disabled={isLoading}
              />
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-2">
              <label className="text-sm text-muted-foreground flex items-center gap-2">
                <KeyRound size={16} className="text-primary" />
                密码
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                  placeholder="请输入密码"
                  className="w-full p-3 rounded-lg bg-muted/50 border border-muted-foreground/20 focus:border-primary/50 focus:bg-muted transition-colors outline-none"
                  disabled={isLoading}
                />
                <motion.button
                  whileHover={{ backgroundColor: "hsl(var(--muted-foreground) / 0.2)" }}
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full transition-colors">
                  {showPassword ? (
                    <EyeOff size={16} className="text-muted-foreground" />
                  ) : (
                    <Eye size={16} className="text-muted-foreground" />
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-lg relative overflow-hidden ${
                isLoading ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"
              }`}>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative flex items-center justify-center gap-2">
                <LogIn size={18} />
                {isLoading ? "登录中..." : "登录"}
              </span>
            </motion.button>

            <div className="flex justify-between text-sm">
              <motion.div whileHover={{ x: 3 }}>
                <Link href="/register" className="text-primary hover:underline inline-flex items-center gap-1">
                  注册账号
                  <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    →
                  </motion.span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.form>
      </div>
    </div>
  );
}
