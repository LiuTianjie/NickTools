import { type UseFetchOptions } from "nuxt/app";
type Methods = "GET" | "POST" | "DELETE" | "PUT";

const BASE_URL = "https://api.enjoygpt.shop";

export interface IResultData<T> {
  code: number;
  data: T;
  msg: string;
}
class HttpRequest {
  request<T = any, U = any>(
    url: string,
    method: Methods,
    data: any,
    options?: UseFetchOptions<T>
  ) {
    return new Promise<IResultData<U>>((resolve, reject) => {
      const userInfo = useUserInfoStore();
      // 继承UseFetchOptions类型，包含了baseURL和method两个属性
      const newOptions: UseFetchOptions<T> = {
        baseURL: BASE_URL,
        method,
        server: false,
        headers: {
          Authorization: `Bearer ${userInfo.data?.token || ""}`,
        },
        ...options,
      };

      // 根据请求方法处理请求的数据
      if (method === "GET" || method === "DELETE") {
        // 将数据设置为newOptions的params属性
        newOptions.params = data;
      }
      if (method === "POST" || method === "PUT") {
        // 将数据设置为newOptions的body属性
        newOptions.body = data;
      }

      // 发送请求
      useFetch(url, newOptions)
        .then((res: any) => {
          if (res.status.value !== "success") {
            reject(res.error.value?.data.msg);
          } else {
            resolve(res.data.value);
          }
        })
        .catch((error) => {
          console.log({ error });
          reject(error);
        });
    });
  }

  // 封装常用方法
  get<T = any, U = any>(url: string, params?: T, options?: UseFetchOptions<T>) {
    return this.request<T, U>(url, "GET", params, options);
  }

  post<T = any, U = any>(url: string, data: T, options?: UseFetchOptions<T>) {
    return this.request<T, U>(url, "POST", data, options);
  }

  Put<T = any, U = any>(url: string, data: T, options?: UseFetchOptions<T>) {
    return this.request<T, U>(url, "PUT", data, options);
  }

  Delete<T = any, U = any>(
    url: string,
    params: T,
    options?: UseFetchOptions<T>
  ) {
    return this.request<T, U>(url, "DELETE", params, options);
  }

  async stream(url: string, body: any, callback: Function) {
    const userInfo = useUserInfoStore();
    const token = userInfo.data?.token || "";
    const config = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "stream",
      body,
    };
    const resp: any = await $fetch(`${BASE_URL}${url}`, config);
    const reader = resp.pipeThrough(new TextDecoderStream()).getReader();
    while (true) {
      const { done, value } = await reader.read();
      callback(value);
      if (done) {
        break;
      }
    }
  }
}

const httpRequest = new HttpRequest();

export default httpRequest;
