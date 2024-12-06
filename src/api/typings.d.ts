declare namespace API {
  type RegisterType = {
    icon?: string;
    nickName: string;
    password: string;
    username: string;
  };

  type LoginType = {
    password: string;
    username: string;
  };

  type EditUserInfoType = {
    avatar: string;
    name: string;
    wallet: string;
  };

  type VideoPublishListParams = {
    keyword?: string;
    pageNum: number;
    pageSize: number;
  };

  type VideoDetailType = {
    id: number;
    longUrl: string;
    picture: string;
    publishDate: string;
    reduce: string;
    shortUrl: string;
    status: number;
    tags: string;
    title: string;
    totalWatch: number;
  };

  type UserInfoType = {
    createTime?: string;
    email?: string;
    icon?: string;
    id?: number;
    loginTime?: string;
    memberId?: number;
    nickName?: string;
    note?: string;
    password?: string;
    status?: number;
    userType?: number;
    username?: string;
  };

  type UpdatePasswordType = {
    username: string;
    oldPassword?: string;
    confirmPassword?: string;
    newPassword: string;
  };
}
