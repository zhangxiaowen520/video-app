import fetchRequest from "./request";

/**
 * 注册
 */
export const register = async (bodyData: API.RegisterType) => {
  return await fetchRequest(`/admin/appRegister`, {
    method: "POST",
    body: bodyData
  });
};

/**
 * 登录
 */
export const login = async (bodyData: API.LoginType) => {
  return await fetchRequest(`/admin/appLogin`, {
    method: "POST",
    body: bodyData
  });
};

/**
 * 获取用户信息
 */
export const getUserInfo = async () => {
  return await fetchRequest(`/admin/currentInfo`, {
    method: "POST"
  });
};

/**
 * 保存用户信息
 */
export const saveUserInfo = async (bodyData: API.UserInfoType) => {
  return await fetchRequest(`/admin/update/${bodyData.id}`, {
    method: "POST",
    body: bodyData
  });
};

/**
 * 修改密码
 */
export const updatePassword = async (bodyData: API.UpdatePasswordType) => {
  return await fetchRequest(`/admin/updatePassword`, {
    method: "POST",
    body: bodyData
  });
};

/**
 * 登出
 */
export const logout = async () => {
  return await fetchRequest(`/admin/logout`, {
    method: "POST"
  });
};
