"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Crown, User, History, CreditCard, LogOut, Lock, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const menuItems = [
  {
    icon: Crown,
    label: "开通会员",
    path: "/profile/vip",
    highlight: true,
    isVip: true
  },
  {
    icon: User,
    label: "个人资料",
    path: "/profile/info"
  },
  {
    icon: Lock,
    label: "修改密码",
    path: "/profile/password"
  },
  {
    icon: History,
    label: "观看记录",
    path: "/profile/history"
  },
  {
    icon: CreditCard,
    label: "充值记录",
    path: "/profile/payments"
  }
];

export default function ProfileMenu() {
  const router = useRouter();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    // TODO: 实现退出登录逻辑
    console.log("退出登录");
    router.push("/login");
  };

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-4 space-y-2">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.path}
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { delay: index * 0.1 }
            }}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push(item.path)}
            className={`w-full flex items-center gap-3 p-4 rounded-lg ${
              item.highlight ? "bg-yellow-500/10 hover:bg-yellow-500/20" : "hover:bg-muted"
            } ${item.isVip ? "text-yellow-500" : ""}`}>
            <item.icon size={20} className={item.isVip ? "text-yellow-500" : ""} />
            <span>{item.label}</span>
            {item.isVip && (
              <motion.div
                className="ml-auto flex items-center"
                animate={{ x: [0, 3, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}>
                <span className="text-xs text-yellow-500">立即开通</span>
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-yellow-500 ml-1">
                  →
                </motion.span>
              </motion.div>
            )}
          </motion.button>
        ))}

        {/* 退出登录按钮 */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { delay: menuItems.length * 0.1 }
          }}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full flex items-center gap-3 p-4 rounded-lg text-red-500 hover:bg-red-500/10">
          <LogOut size={20} />
          <span>退出登录</span>
        </motion.button>
      </motion.div>

      {/* 退出登录确认框 */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowLogoutConfirm(false)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background rounded-lg p-6 max-w-sm w-full space-y-4"
              onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">确认退出登录？</h3>
                <button onClick={() => setShowLogoutConfirm(false)} className="p-1 hover:bg-muted rounded-full">
                  <X size={20} />
                </button>
              </div>
              <p className="text-sm text-muted-foreground">退出后需要重新登录才能继续使用</p>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-2 rounded-lg bg-muted hover:bg-muted/80">
                  取消
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogout}
                  className="flex-1 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600">
                  确认退出
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
