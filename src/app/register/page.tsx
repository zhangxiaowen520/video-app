"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { Eye, EyeOff, Wand2, Check, X } from "lucide-react";

interface RegisterForm {
  account: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

interface PasswordStrength {
  hasNumber: boolean;
  hasLowerCase: boolean;
  hasUpperCase: boolean;
  hasSpecialChar: boolean;
  isLengthValid: boolean;
}

interface AccountValidation {
  hasLowerCase: boolean;
  hasUpperCase: boolean;
  hasNumber: boolean;
  isLengthValid: boolean;
  hasSpecialChar: boolean; // 用于检测非法字符
}

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState<RegisterForm>({
    account: "",
    nickname: "",
    password: "",
    confirmPassword: ""
  });
  const [showPasswords, setShowPasswords] = useState({
    password: false,
    confirm: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    hasNumber: false,
    hasLowerCase: false,
    hasUpperCase: false,
    hasSpecialChar: false,
    isLengthValid: false
  });
  const [accountValidation, setAccountValidation] = useState<AccountValidation>({
    hasLowerCase: false,
    hasUpperCase: false,
    hasNumber: false,
    isLengthValid: false,
    hasSpecialChar: false
  });

  const checkPasswordStrength = (password: string) => {
    setPasswordStrength({
      hasNumber: /\d/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasUpperCase: /[A-Z]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      isLengthValid: password.length >= 8
    });
  };

  const getPasswordStrengthScore = () => {
    const { hasNumber, hasLowerCase, hasUpperCase, hasSpecialChar, isLengthValid } = passwordStrength;
    const score = [hasNumber, hasLowerCase, hasUpperCase, hasSpecialChar, isLengthValid].filter(Boolean).length;
    return score;
  };

  const getPasswordStrengthColor = () => {
    const score = getPasswordStrengthScore();
    if (score <= 2) return "bg-red-500";
    if (score <= 3) return "bg-yellow-500";
    if (score <= 4) return "bg-blue-500";
    return "bg-green-500";
  };

  const checkAccountValidation = (account: string) => {
    setAccountValidation({
      hasLowerCase: /[a-z]/.test(account),
      hasUpperCase: /[A-Z]/.test(account),
      hasNumber: /\d/.test(account),
      isLengthValid: account.length >= 4 && account.length <= 20,
      hasSpecialChar: /[^a-zA-Z0-9]/.test(account)
    });
  };

  const validateForm = () => {
    if (!form.account || !form.nickname || !form.password || !form.confirmPassword) {
      setError("请填写所有字段");
      return false;
    }

    // 账号验证
    if (accountValidation.hasSpecialChar) {
      setError("账号只能包含字母和数字");
      return false;
    }
    if (!accountValidation.isLengthValid) {
      setError("账号长度应在4-20位之间");
      return false;
    }
    if (!accountValidation.hasNumber && !accountValidation.hasLowerCase && !accountValidation.hasUpperCase) {
      setError("账号必须包含字母或数字");
      return false;
    }

    if (form.nickname.length < 2 || form.nickname.length > 20) {
      setError("昵称长度应在2-20个字符之间");
      return false;
    }

    if (!passwordStrength.hasNumber || !passwordStrength.hasLowerCase) {
      setError("密码必须同时包含数字和字母");
      return false;
    }

    if (form.password.length < 8) {
      setError("密码长度不能少于8位");
      return false;
    }

    if (form.password !== form.confirmPassword) {
      setError("两次输入的密码不一致");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    try {
      setIsLoading(true);
      // TODO: 实现注册逻辑
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 注册成功后跳转到成功页面，并传递账号信息
      const params = new URLSearchParams({
        account: form.account,
        nickname: form.nickname,
        password: form.password
      });
      router.push(`/register/success?${params.toString()}`);
    } catch (err) {
      console.error("注册失败:", err);
      setError("注册失败，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickRegister = async () => {
    try {
      setIsLoading(true);
      // 生成随机账号信息
      const randomAccount = `user${Math.floor(Math.random() * 1000000)}`;
      const randomNickname = `用户${Math.floor(Math.random() * 1000000)}`;
      const randomPassword = Math.random().toString(36).slice(-8);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 注册成功后跳转到成功页面
      const params = new URLSearchParams({
        account: randomAccount,
        nickname: randomNickname,
        password: randomPassword
      });
      router.push(`/register/success?${params.toString()}`);
    } catch (err) {
      console.error("一键注册失败:", err);
      setError("一键注册失败，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center p-2">
          <BackButton fallbackPath="/" />
          <h1 className="ml-2 text-lg font-medium">注册</h1>
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

        {/* 一键注册按钮 */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleQuickRegister}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 py-3 mb-6 rounded-lg bg-primary/10 text-primary hover:bg-primary/20">
          <Wand2 size={20} />
          <span>一键注册</span>
        </motion.button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">或者手动填写</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">账号</label>
            <input
              type="text"
              value={form.account}
              onChange={(e) => {
                setForm((prev) => ({ ...prev, account: e.target.value }));
                checkAccountValidation(e.target.value);
              }}
              placeholder="请输入账号（4-20位字母或数字）"
              className={`w-full p-2 rounded-lg bg-muted ${
                form.account && accountValidation.hasSpecialChar ? "border-red-500 border" : ""
              }`}
              disabled={isLoading}
            />

            {/* 账号验证提示 */}
            {form.account && (
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-1">
                  {accountValidation.isLengthValid ? (
                    <Check size={12} className="text-green-500" />
                  ) : (
                    <X size={12} className="text-red-500" />
                  )}
                  <span>长度在4-20位之间</span>
                </div>
                <div className="flex items-center gap-1">
                  {!accountValidation.hasSpecialChar ? (
                    <Check size={12} className="text-green-500" />
                  ) : (
                    <X size={12} className="text-red-500" />
                  )}
                  <span>只能包含字母和数字</span>
                </div>
                <div className="flex items-center gap-1">
                  {accountValidation.hasNumber || accountValidation.hasLowerCase || accountValidation.hasUpperCase ? (
                    <Check size={12} className="text-green-500" />
                  ) : (
                    <X size={12} className="text-red-500" />
                  )}
                  <span>至少包含字母或数字</span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">昵称</label>
            <input
              type="text"
              value={form.nickname}
              onChange={(e) => setForm((prev) => ({ ...prev, nickname: e.target.value }))}
              placeholder="请输入昵称"
              className="w-full p-2 rounded-lg bg-muted"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">密码</label>
            <div className="relative">
              <input
                type={showPasswords.password ? "text" : "password"}
                value={form.password}
                onChange={(e) => {
                  setForm((prev) => ({ ...prev, password: e.target.value }));
                  checkPasswordStrength(e.target.value);
                }}
                placeholder="请输入密码"
                className="w-full p-2 pr-10 rounded-lg bg-muted"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    password: !prev.password
                  }))
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-muted-foreground/20 rounded-full">
                {showPasswords.password ? (
                  <EyeOff size={16} className="text-muted-foreground" />
                ) : (
                  <Eye size={16} className="text-muted-foreground" />
                )}
              </button>
            </div>

            {/* 密码强度指示器 */}
            {form.password && (
              <div className="space-y-2">
                <div className="h-1 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className={`h-full ${getPasswordStrengthColor()}`}
                    initial={{ width: "0%" }}
                    animate={{ width: `${(getPasswordStrengthScore() / 5) * 100}%` }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    {passwordStrength.hasNumber ? (
                      <Check size={12} className="text-green-500" />
                    ) : (
                      <X size={12} className="text-red-500" />
                    )}
                    <span>包含数字</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {passwordStrength.hasLowerCase ? (
                      <Check size={12} className="text-green-500" />
                    ) : (
                      <X size={12} className="text-red-500" />
                    )}
                    <span>包含小写字母</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {passwordStrength.hasUpperCase ? (
                      <Check size={12} className="text-green-500" />
                    ) : (
                      <X size={12} className="text-red-500" />
                    )}
                    <span>包含大写字母</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {passwordStrength.hasSpecialChar ? (
                      <Check size={12} className="text-green-500" />
                    ) : (
                      <X size={12} className="text-red-500" />
                    )}
                    <span>包含特殊字符</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {passwordStrength.isLengthValid ? (
                      <Check size={12} className="text-green-500" />
                    ) : (
                      <X size={12} className="text-red-500" />
                    )}
                    <span>长度不少于8位</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">确认密码</label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? "text" : "password"}
                value={form.confirmPassword}
                onChange={(e) => setForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                placeholder="请再次输入密码"
                className="w-full p-2 pr-10 rounded-lg bg-muted"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    confirm: !prev.confirm
                  }))
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-muted-foreground/20 rounded-full">
                {showPasswords.confirm ? (
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
            {isLoading ? "注册中..." : "注册"}
          </motion.button>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">已有账号？</span>
            <Link href="/login" className="ml-1 text-primary hover:underline">
              立即登录
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
