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
  NO_MOCK = 'Попытка использовать несуществующий mockup!',
  INCORRECT_CALL = 'Некорректный вызов API!',
  NO_API_PATH = 'Не предоставлен путь к API!',
}

export enum EApiHeaders {
  CONTENT_SAVE_MODE = 'Content-SaveMode',
  CONTENT_NAME = 'Content-Name',
  CONTENT_TYPE = 'Content-Type',
  CONTENT_CONFIRMATION = 'Content-Confirmation',
}

export enum EApiMethods {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
  PUT = 'put',
  DELETE = 'delete',
}

// Мокапы
export interface IMockItem<T> {
  'timeout'?: number,
  'mockData': TApiResponse<T>,
}