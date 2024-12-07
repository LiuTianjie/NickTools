import httpRequest from "../service/index";

const login = (data: LoginData) => {
  return httpRequest.post<LoginData, any>("/user/login", data);
};

const getCode = (data: CodeData) => {
  return httpRequest.post("/user/getCode", data);
};

const register = (data: RegisterData) => {
  return httpRequest.post("/user/register", data);
};

/** 获取GPT聊天列表 */
const getChatList = () => {
  return httpRequest.get<any, ChatListData[]>("/gpt/getChatList");
};

/** 获取GPT聊天详情 */
const getChatDetail = (params: ChatListReq) => {
  return httpRequest.get<ChatListReq, ChatDetailData>(
    "/gpt/getChatDetail",
    params
  );
};

/** 发送消息 */
const sendMessage = (data: SendMessageData, callback: Function) => {
  return httpRequest.stream("/gpt/sendMessage", data, callback);
};

export { login, getCode, register, getChatList, getChatDetail, sendMessage };
