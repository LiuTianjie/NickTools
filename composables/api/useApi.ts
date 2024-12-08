import { useHttpRequest } from "~/service/useHttpRequest";
import type {
  ChatDetailData,
  ChatListData,
  ChatListReq,
  CodeData,
  LoginData,
  RegisterData,
  SendMessageData,
} from ".";

export function useApi() {
  const { get, post, stream } = useHttpRequest();

  /** 用户登录 */
  const login = (data: LoginData) => {
    return post<LoginData, any>("/user/login", data);
  };

  /** 获取验证码 */
  const getCode = (data: CodeData) => {
    return post("/user/getCode", data);
  };

  /** 用户注册 */
  const register = (data: RegisterData) => {
    return post("/user/register", data);
  };

  /** 获取GPT聊天列表 */
  const getChatList = () => {
    return get<any, ChatListData[]>("/gpt/getChatList");
  };

  /** 获取GPT聊天详情 */
  const getChatDetail = (params: ChatListReq) => {
    return get<ChatListReq, ChatDetailData>("/gpt/getChatDetail", params);
  };

  /** 发送消息 */
  const sendMessage = (
    data: SendMessageData,
    callback: (data: string) => void
  ) => {
    return stream("/gpt/sendMessage", data, callback);
  };

  return {
    login,
    getCode,
    register,
    getChatList,
    getChatDetail,
    sendMessage,
  };
}
