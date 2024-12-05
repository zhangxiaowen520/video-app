import storageService from "@/utils/storageService";

export interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: Record<string, string | number | boolean | File | Blob>;
  isFileUpload?: boolean;
}

/** 网络请求地址 */
export const BASE_URL = "http://www.weiliuyinshi.cn:8080";

async function fetchRequest(endpoint: string, options: RequestOptions = {}) {
  const { method = "GET", headers = {}, body, isFileUpload = false } = options;

  // 构建URL
  let url = `${BASE_URL}${endpoint}`;

  // 构建请求头
  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...headers
  };

  // 添加token到请求头
  const token = storageService.getToken();
  if (token) {
    requestHeaders.Authorization = token;
  }

  let requestBody: string | FormData | undefined;

  // 处理GET请求的查询参数
  if (method === "GET" && body) {
    const params = new URLSearchParams();
    Object.entries(body).forEach(([key, value]) => {
      params.append(key, String(value));
    });
    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  // 处理请求体
  if (method !== "GET") {
    if (isFileUpload && body) {
      requestBody = new FormData();
      Object.entries(body).forEach(([key, value]) => {
        (requestBody as FormData).append(key, String(value));
      });
      delete requestHeaders["Content-Type"]; // 让浏览器自动设置
    } else if (body) {
      requestBody = JSON.stringify(body);
    }
  }

  try {
    const response = await fetch(url, {
      method,
      headers: requestHeaders,
      body: requestBody
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "请求失败");
    }

    // 处理token过期
    if (responseData.code === 604) {
      storageService.clearAll();
      window.location.href = "/login";
      throw new Error("登录已过期，请重新登录");
    }

    return responseData;
  } catch (error) {
    console.error("请求错误:", error);
    throw error;
  }
}

export default fetchRequest;
