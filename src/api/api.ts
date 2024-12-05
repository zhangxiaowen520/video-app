import fetchRequest from "./request";

/**
 * 获取视频发布列表
 */
export const getVideoPublishList = async (bodyData: API.VideoPublishListParams) => {
  return await fetchRequest(`/video/publishList`, {
    method: "GET",
    body: bodyData
  });
};

/**
 * 获取视频详情
 */
export const getVideoDetail = async (bodyData: { id: number }) => {
  return await fetchRequest(`/video/detail`, {
    method: "GET",
    body: bodyData
  });
};

/**
 * 获取会员列表
 */
export const getMemberList = async () => {
  return await fetchRequest(`/member/list`, {
    method: "GET"
  });
};

/**
 * 获取用户浏览记录
 */
export const getUserHistory = async () => {
  return await fetchRequest(`/history/currenList`, {
    method: "GET"
  });
};

/**
 * 新增浏览记录
 */
export const addUserHistory = async (bodyData: { videoId: number }) => {
  return await fetchRequest(`/history/add`, {
    method: "POST",
    body: bodyData
  });
};

/**
 * 文件上传
 */
export const uploadFile = async (bodyData: { file: File }) => {
  return await fetchRequest(`/aliyun/oss/upload`, {
    method: "POST",
    body: bodyData
  });
};
