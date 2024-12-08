// services/useHttpRequest.ts
import { type UseFetchOptions } from "nuxt/app";
import { UserLoginPopup } from "#components";

type Methods = "GET" | "POST" | "DELETE" | "PUT";

const BASE_URL = "https://api.enjoygpt.shop";

export interface IResultData<T> {
  code: number;
  data: T;
  msg: string;
}

export function useHttpRequest() {
  const userInfo = useUserInfoStore();
  const toast = useToastService();

  const request = <T = any, U = any>(
    url: string,
    method: Methods,
    data: any,
    options?: UseFetchOptions<T>
  ): Promise<IResultData<U>> => {
    return new Promise<IResultData<U>>((resolve, reject) => {
      const token = userInfo.data?.token || "";

      const newOptions: UseFetchOptions<T> = {
        baseURL: BASE_URL,
        method,
        server: false,
        headers: {
          Authorization: `Bearer ${token}`,
          ...options?.headers,
        },
        ...options,
      };

      // 根据请求方法处理请求的数据
      if (method === "GET" || method === "DELETE") {
        newOptions.params = data;
      }
      if (method === "POST" || method === "PUT") {
        newOptions.body = data;
      }

      // 发送请求
      useFetch(url, newOptions)
        .then((res: any) => {
          if (res.status.value !== "success") {
            reject(res.error.value?.data.msg);
            let message = "";
            if (res.error.value?.statusCode == 401) {
              message = "登录已过期，请重新登录";
              openPopup(UserLoginPopup);
            } else {
              message = res.error.value?.data.msg || "请求异常";
            }
            toast.add({
              severity: "error",
              summary: "请求出错",
              detail: message,
              life: 3000,
            });
          } else {
            resolve(res.data.value);
          }
        })
        .catch((error) => {
          toast.add({
            severity: "error",
            summary: "请求出错",
            detail: "",
            life: 3000,
          });
          reject(error);
        });
    });
  };

  // 封装常用方法
  const get = <T = any, U = any>(
    url: string,
    params?: T,
    options?: UseFetchOptions<T>
  ) => request<T, U>(url, "GET", params, options);

  const post = <T = any, U = any>(
    url: string,
    data: T,
    options?: UseFetchOptions<T>
  ) => request<T, U>(url, "POST", data, options);

  const put = <T = any, U = any>(
    url: string,
    data: T,
    options?: UseFetchOptions<T>
  ) => request<T, U>(url, "PUT", data, options);

  const del = <T = any, U = any>(
    url: string,
    params: T,
    options?: UseFetchOptions<T>
  ) => request<T, U>(url, "DELETE", params, options);

  /**
   * 支持 EventStream（Server-Sent Events）
   * @param url 请求的URL
   * @param body 请求体（如果需要）
   * @param callback 回调函数，接收每一条数据
   */
  const stream = async (
    url: string,
    body: any,
    callback: (data: string) => void
  ) => {
    const token = userInfo.data?.token || "";
    const config = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body,
      // @ts-ignore
      responseType: "text", // 确保响应为文本
    };

    try {
      // @ts-ignore
      const resp: any = await $fetch(`${BASE_URL}${url}`, config);
      const reader = resp.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value);
          callback(chunk);
        }
      }
    } catch (error) {
      console.error("Stream 连接出错:", error);
    }
  };

  return {
    get,
    post,
    put,
    del,
    stream,
  };
}
