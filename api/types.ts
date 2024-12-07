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
