"use client";

import { motion } from "framer-motion";
import { Eye, EyeOff, Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";
import storageService from "@/utils/storageService";
import { updatePassword } from "@/api/login";
import { useRouter } from "next/navigation";

interface PasswordStrength {
  hasNumber: boolean;
  hasLowerCase: boolean;
  hasUpperCase: boolean;
  hasSpecialChar: boolean;
  isLengthValid: boolean;
}

export default function PasswordPage() {
  const router = useRouter();
  const [form, setForm] = useState<API.UpdatePasswordType>({
    username: "",
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
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    hasNumber: false,
    hasLowerCase: false,
    hasUpperCase: false,
    hasSpecialChar: false,
    isLengthValid: false
  });

  const validateForm = () => {
    if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
      setError("请填写所有密码字段");
      return false;
    }

    // 密码格式校验
    // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    // if (!passwordRegex.test(form.newPassword)) {
    //   setError("密码必须包含字母和数字，长度在8-20位之间");
    //   return false;
    // }

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
      form.username = storageService.getUserInfo()?.username || "";
      const data = await updatePassword(form);
      if (data.code === 200) {
        router.push("/profile/password/success");
      }
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

  useEffect(() => {
    checkPasswordStrength(form.newPassword);
  }, [form.newPassword]);

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
            className={`px-6 py-1.5 text-sm rounded-full ${
              isSaving ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"
            }`}>
            {isSaving ? "保存中..." : "保存"}
          </motion.button>
        </div>
      </div>

      <div className="pt-16 p-4 space-y-6 max-w-md mx-auto">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full p-3 rounded-lg bg-red-500/10 text-red-500 text-sm">
            {error}
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* 旧密码 */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">当前密码</label>
            <div className="relative">
              <input
                type={showPasswords.old ? "text" : "password"}
                value={form.oldPassword}
                onChange={(e) => setForm((prev) => ({ ...prev, oldPassword: e.target.value }))}
                disabled={isSaving}
                className="w-full p-3 rounded-lg bg-muted/50 border border-muted-foreground/20 focus:border-primary/50 focus:bg-muted transition-colors outline-none"
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
            <label className="text-sm font-medium flex items-center gap-2">新密码</label>
            <div className="relative">
              <input
                type={showPasswords.new ? "text" : "password"}
                value={form.newPassword}
                onChange={(e) => {
                  setForm((prev) => ({ ...prev, newPassword: e.target.value }));
                  checkPasswordStrength(e.target.value);
                }}
                disabled={isSaving}
                className="w-full p-3 rounded-lg bg-muted/50 border border-muted-foreground/20 focus:border-primary/50 focus:bg-muted transition-colors outline-none"
                placeholder="8-20位字母和数字组合"
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
            {form.newPassword && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
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
              </motion.div>
            )}
          </div>

          {/* 确认新密码 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">确认新密码</label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? "text" : "password"}
                value={form.confirmPassword}
                onChange={(e) => setForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                disabled={isSaving}
                className="w-full p-3 rounded-lg bg-muted/50 border border-muted-foreground/20 focus:border-primary/50 focus:bg-muted transition-colors outline-none"
                placeholder="请再次输入新密码"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
