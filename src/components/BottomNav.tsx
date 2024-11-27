"use client";

import { Home, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  // 只在首页和个人中心页面显示底部导航
  const shouldShowNav = pathname === "/" || pathname === "/profile";

  if (!shouldShowNav) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background">
      <div className="flex justify-around py-2">
        <button
          onClick={() => router.push("/")}
          className={`flex flex-col items-center p-2 ${pathname === "/" ? "text-primary" : "text-muted-foreground"}`}>
          <Home size={24} />
          <span className="text-xs">首页</span>
        </button>
        <button
          onClick={() => router.push("/profile")}
          className={`flex flex-col items-center p-2 ${
            pathname === "/profile" ? "text-primary" : "text-muted-foreground"
          }`}>
          <User size={24} />
          <span className="text-xs">我的</span>
        </button>
      </div>
    </div>
  );
}
