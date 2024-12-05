// 定义存储的key
const STORAGE_KEYS = {
  TOKEN: "token",
  USER_INFO: "userInfo",
  THEME: "theme"
} as const;

// 定义用户信息类型
export interface UserInfo {
  createTime: string;
  email: string | null;
  icon: string | null;
  id: number;
  loginTime: string | null;
  memberId: number | null;
  memberPrice: number | null;
  memberTags: string | null;
  nickName: string;
  note: string | null;
  password: string;
  status: number;
  stopDate: string | null;
  userType: number;
  username: string;
}

// 存储服务
const storageService = {
  // Token相关
  setToken(token: string) {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  },

  getToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  },

  removeToken() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  },

  // 用户信息相关
  setUserInfo(userInfo: UserInfo) {
    localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(userInfo));
  },

  getUserInfo(): UserInfo | null {
    const userInfo = localStorage.getItem(STORAGE_KEYS.USER_INFO);
    return userInfo ? JSON.parse(userInfo) : null;
  },

  removeUserInfo() {
    localStorage.removeItem(STORAGE_KEYS.USER_INFO);
  },

  // 清除所有存储
  clearAll() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_INFO);
  },

  // 检查是否登录
  isLoggedIn(): boolean {
    return !!this.getToken();
  },

  // 检查是否是VIP
  isVip(): boolean {
    const userInfo = this.getUserInfo();
    if (!userInfo) return false;

    if (!userInfo.memberId) return false;

    return true;
  }
};

export default storageService;
