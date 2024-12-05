"use client";

import { useEffect, useState } from "react";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileMenu from "@/components/profile/ProfileMenu";
import UnauthorizedHeader from "@/components/profile/UnauthorizedHeader";
import storageService, { UserInfo } from "@/utils/storageService";
import { getUserInfo } from "@/api/login";

export default function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isVip, setIsVip] = useState(false);

  const getUserInfoClick = async () => {
    try {
      const loggedIn = storageService.isLoggedIn();
      setIsLoggedIn(loggedIn);
      setIsLoading(false);
      if (!loggedIn) {
        return;
      }
      const res = await getUserInfo();
      if (res.code === 200) {
        setUserInfo(res.data);
        setIsVip(res.data.memberId ? true : false);
        storageService.setUserInfo(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserInfoClick();
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
          <ProfileHeader userInfo={userInfo} isVip={isVip} />
          <ProfileMenu />
        </>
      ) : (
        <UnauthorizedHeader />
      )}
    </div>
  );
}
