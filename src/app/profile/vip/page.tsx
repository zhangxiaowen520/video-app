"use client";

import { motion } from "framer-motion";
import { Crown, Check, Sparkles, Star } from "lucide-react";
import BackButton from "@/components/BackButton";

const vipPlans = [
  {
    id: "yearly",
    name: "年度会员",
    price: "298",
    duration: "每年",
    features: ["无限观看", "1080P高清", "去除广告", "优先更新", "专属客服", "尊享标识"],
    originalPrice: "540",
    bestValue: true
  },
  {
    id: "quarterly",
    name: "季度会员",
    price: "78",
    duration: "每季",
    features: ["无限观看", "1080P高清", "去除广告", "优先更新", "专属客服"],
    originalPrice: "135",
    recommended: true
  },
  {
    id: "monthly",
    name: "月度会员",
    price: "30",
    duration: "每月",
    features: ["无限观看", "1080P高清", "去除广告", "优先更新"],
    originalPrice: "45"
  }
];

export default function VipPage() {
  return (
    <div className="min-h-screen pb-16">
      {/* 顶部导航 */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center p-2">
          <BackButton fallbackPath="/profile" />
          <h1 className="ml-2 text-lg font-medium flex items-center gap-2">
            开通会员
            <Crown size={16} className="text-yellow-500" />
          </h1>
        </div>
      </div>

      <div className="pt-16 px-4 space-y-6 max-w-7xl mx-auto">
        {/* 会员特权介绍 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2 relative">
          {/* 背景光效 */}
          <div className="absolute inset-0 bg-gradient-radial from-yellow-500/20 via-transparent to-transparent" />

          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="relative">
            <Crown size={48} className="mx-auto text-yellow-500 drop-shadow-lg" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute -top-2 -right-2">
              <Sparkles className="w-6 h-6 text-yellow-500" />
            </motion.div>
          </motion.div>

          <h2 className="text-xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            开通会员 尊享优质内容
          </h2>
          <p className="text-sm text-muted-foreground">海量视频无限观看，尊享1080P蓝光画质</p>
        </motion.div>

        {/* 会员套餐 */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {vipPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { delay: index * 0.1 }
              }}
              className={`relative p-4 rounded-xl border ${
                plan.recommended
                  ? "border-primary shadow-lg"
                  : plan.bestValue
                  ? "border-yellow-500/50 shadow-lg bg-gradient-to-b from-yellow-500/10 to-transparent"
                  : "border-border"
              }`}>
              {plan.recommended && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs rounded-full whitespace-nowrap">
                  超值推荐
                </span>
              )}
              {plan.bestValue && (
                <motion.span
                  animate={{
                    boxShadow: [
                      "0 0 0 rgba(234, 179, 8, 0.4)",
                      "0 0 20px rgba(234, 179, 8, 0.2)",
                      "0 0 0 rgba(234, 179, 8, 0.4)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-yellow-500 text-yellow-50 text-xs rounded-full flex items-center gap-1 whitespace-nowrap">
                  <Star size={12} />
                  最优惠
                  <Star size={12} />
                </motion.span>
              )}
              <div className="space-y-4 mt-4">
                <h3 className="text-lg font-medium">{plan.name}</h3>
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">{plan.bestValue && "¥"}</span>
                    <span className={`text-3xl font-bold ${plan.bestValue ? "text-yellow-500" : ""}`}>
                      {plan.price}
                    </span>
                    <span className="text-sm text-muted-foreground">/{plan.duration}</span>
                  </div>
                  {plan.originalPrice && (
                    <div className="text-sm text-muted-foreground">
                      <span className="line-through">原价: ¥{plan.originalPrice}</span>
                      <span className="ml-2 text-red-500">省¥{Number(plan.originalPrice) - Number(plan.price)}</span>
                    </div>
                  )}
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <Check size={16} className={plan.bestValue ? "text-yellow-500" : "text-primary"} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-2 rounded-lg ${
                    plan.recommended
                      ? "bg-primary text-primary-foreground"
                      : plan.bestValue
                      ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:from-yellow-600 hover:to-yellow-700"
                      : "bg-muted hover:bg-muted/80"
                  }`}>
                  立即开通
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 支付说明 */}
        <div className="text-sm text-muted-foreground space-y-2">
          <p className="flex items-center gap-1">
            <Crown size={14} className="text-yellow-500" />
            开通说明：
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li>会员服务在支付成功后立即生效</li>
            <li>购买会员服务即表示同意《会员服务协议》</li>
            <li>系统将在会员到期前自动续费，可随时取消</li>
            <li>如有其他问题，请联系客服</li>
          </ul>
        </div>
      </div>
    </div>
  );
}