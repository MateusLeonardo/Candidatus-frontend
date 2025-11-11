export interface IUser {
  id: string;
  email: string;
}

export type IResponseError = {
  errors?: string[];
  tokenIsExpired: boolean;
};
export type IResponseToken = {
  accessToken: string;
  refreshToken: string;
};
export type IRequestUserLogin = {
  email: string;
  password: string;
};
export type IResponseUserLoggedIn = {
  user: IUser;
  tokens: IResponseToken;
};
export type IRequestRegisterUser = {
  email: string;
  password: string;
};
export type IResponseRegisteredUser = {
  user: IUser;
  tokens: IResponseToken;
};
export type IRequestRefreshToken = {
  refreshToken: string;
};
