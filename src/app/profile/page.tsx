"use client";

import { useEffect, useState } from "react";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileMenu from "@/components/profile/ProfileMenu";
import UnauthorizedHeader from "@/components/profile/UnauthorizedHeader";

export default function Profile() {
  // TODO: 实现实际的登录状态检查
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 模拟检查登录状态
    const checkAuth = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // TODO: 实际检查登录状态的逻辑
      setIsLoggedIn(true);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-muted-foreground">加载中...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col pb-16">
      {isLoggedIn ? (
        <>
          <ProfileHeader />
          <ProfileMenu />
        </>
      ) : (
        <UnauthorizedHeader />
      )}
    </div>
  );
}
