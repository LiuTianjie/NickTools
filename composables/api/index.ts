export interface LoginData {
  account: string;
  password: string;
}

export interface CodeData {
  email?: string;
  phone?: string;
  codeType: string;
}

export interface RegisterData {
  code: number;
  codeType: string;
  phone?: string;
  email?: string;
  password: string;
  traceId: string;
}

export interface ChatListReq {
  chatId: string | undefined;
  offset: number;
  pageSize: number;
}

export interface ChatListData {
  chatId: string;
  title: string;
}

export interface ChatDetailItem {
  dataId: string;
  obj: string;
  value: {
    type: string;
    text: {
      content: string;
    };
  }[];
  time: string;
  totalRunningTime?: number;
  historyPreviewLength?: number;
}

export interface ChatDetailData {
  list: ChatDetailItem[];
  total: number;
}

export interface SendMessageData {
  chatId: string | undefined;
  message: string;
}
