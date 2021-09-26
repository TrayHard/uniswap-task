import { TQuote, TTokenList, TWallet } from "./main";

export enum EApiErrors {
  NO_MOCK = "No mockup provided",
  INCORRECT_CALL = "Incorrect API call",
  NO_API_PATH = "No API URL",
}

export enum EApiMethods {
  GET = "get",
  POST = "post",
  PATCH = "patch",
  PUT = "put",
  DELETE = "delete",
}

export interface IMockItem<T> {
  timeout?: number | "random";
  mockData: T;
}

export type TApiTokensListResponse = TTokenList;
export type TApiAllTokensListsResponse = TTokenList[];
export type TApiGetBalanceResponse = number;
export type TApiGetWalletResponse = TWallet;
export type TApiGetQuoteResponse = TQuote;
export type TApiGetUSDQuoteResponse = TQuote;
