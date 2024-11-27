"use client";

import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import BackButton from "@/components/BackButton";

// 模拟支付记录数据
const mockPaymentList = [
  {
    id: "1",
    type: "年度会员",
    amount: 298,
    status: "支付成功",
    date: "2024-03-15 12:34:56"
  },
  {
    id: "2",
    type: "月度会员",
    amount: 30,
    status: "支付成功",
    date: "2024-02-15 18:23:45"
  }
];

export default function PaymentsPage() {
  const [paymentList, setPaymentList] = useState(mockPaymentList);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      // 模拟加载更多数据
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setPaymentList((prev) => [...prev, ...mockPaymentList]);

      // 模拟数据加载完毕
      if (paymentList.length > 30) {
        setHasMore(false);
      }
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, paymentList.length]);

  // 监听滚动到底部
  if (inView) {
    loadMore();
  }

  return (
    <div className="min-h-screen pb-16">
      {/* 顶部导航 */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center p-2">
          <BackButton fallbackPath="/profile" />
          <h1 className="ml-2 text-lg font-medium">充值记录</h1>
        </div>
      </div>

      <div className="pt-16 p-4 space-y-4">
        {paymentList.map((item, index) => (
          <motion.div
            key={item.id + index}
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { delay: index * 0.1 }
            }}
            className="p-4 rounded-lg border space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">{item.type}</span>
              <span className="text-primary">¥{item.amount}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{item.status}</span>
              <span>{item.date}</span>
            </div>
          </motion.div>
        ))}

        {/* 加载更多 */}
        {hasMore && (
          <div ref={ref} className="py-4 text-center">
            {loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center items-center gap-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
                <span className="text-sm text-muted-foreground">加载中...</span>
              </motion.div>
            ) : (
              <span className="text-sm text-muted-foreground">上拉加载更多</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
