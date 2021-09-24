import { TTokenList } from "./main";

export type TApiResponse<T> = IApiSuccessResponse<T> | IApiErrorResponse;

export interface IApiSuccessResponse<T> {
  'success': true,
  'data': T,
}
export interface IApiErrorResponse {
  'success': false,
  'error': Error,
}

export enum EApiErrors {
  NO_MOCK = 'No mockup provided',
  INCORRECT_CALL = 'Incorrect API call',
  NO_API_PATH = 'No API URL',
}

export enum EApiMethods {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
  PUT = 'put',
  DELETE = 'delete',
}

export interface IMockItem<T> {
  'timeout'?: number,
  'mockData': TApiResponse<T>,
}

export type TApiTokensListResponse = TTokenList
export type TApiAllTokensListsResponse = TTokenList[]
export type TApiGetBalanceResponse = number