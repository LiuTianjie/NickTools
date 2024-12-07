import { type UseFetchOptions } from "nuxt/app";

type Methods = "GET" | "POST" | "DELETE" | "PUT";

const BASE_URL = "https://api.enjoygpt.shop";

export interface IResultData<T> {
  code: number;
  data: T;
  msg: string;
}
class HttpRequest {
  request<T = any>(
    url: string,
    method: Methods,
    data: any,
    options?: UseFetchOptions<T>
  ) {
    return new Promise((resolve, reject) => {
      // 继承UseFetchOptions类型，包含了baseURL和method两个属性
      const newOptions: UseFetchOptions<T> = {
        baseURL: BASE_URL,
        method,
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
        .then((res) => {
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
  get<T = any>(url: string, params?: any, options?: UseFetchOptions<T>) {
    return this.request(url, "GET", params, options);
  }

  post<T = any>(url: string, data: any, options?: UseFetchOptions<T>) {
    return this.request(url, "POST", data, options);
  }

  Put<T = any>(url: string, data: any, options?: UseFetchOptions<T>) {
    return this.request(url, "PUT", data, options);
  }

  Delete<T = any>(url: string, params: any, options?: UseFetchOptions<T>) {
    return this.request(url, "DELETE", params, options);
  }
}

const httpRequest = new HttpRequest();

export default httpRequest;
