import { EApiErrors, EApiMethods, IMockItem, TApiResponse, TApiTokensListResponse } from '@/models/api';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import mocks from './mocks';

export enum EApiEndpoints {
  getTokensList = 'getTokensList',
}

const isMocked: Record<EApiEndpoints, boolean> = {
  getTokensList: true,
};

export class Api {
  private axiosInstance: AxiosInstance;

  constructor() {
    if (process.env.API_URL) {
      this.axiosInstance = axios.create({ baseURL: process.env.API_URL });
    } else throw new Error(EApiErrors.NO_API_PATH);
  }

  private async doRequest<T>(args: { options?: AxiosRequestConfig | null, mock?: IMockItem<T> }): Promise<TApiResponse<T>> {
    const { options, mock } = args;
    if (mock) {
      return new Promise(resolve => setTimeout(() => {
        resolve(mock.mockData);
      }, mock.timeout));
    } else if (!options) {
      throw new Error(EApiErrors.INCORRECT_CALL);
    }
    const method = options.method || 'get';
    const headerContentType = 'application/json';
    const requestParams: AxiosRequestConfig = {
      url: options.url,
      method,
      [['get', 'delete', 'put'].includes(method) ? 'params' : 'data']: options.params,
      headers: {
        'Content-Type': headerContentType,
        ...options.headers,
      },
    };

    const SUCCESS_CODES = [200, 201, 204];

    this.axiosInstance.interceptors.response.use(
      response => {
        if (SUCCESS_CODES.includes(response.status)) return {
          success: true,
          data: response.data,
        };
        else return {
          success: false,
          error: response.statusText,
        };
      },
      error => ({
        success: false,
        error: error?.response || error,
      })
    );

    return this.axiosInstance.request(requestParams);
  }

  [EApiEndpoints.getTokensList](listName: string): Promise<TApiResponse<TApiTokensListResponse>> {
    if (!isMocked.getTokensList) {
      return this.doRequest<TApiTokensListResponse>({ options: {
        method: EApiMethods.GET,
        url: 'getTokensList',
        params: { listName }
      } });
    } else if (mocks.getTokensList) {
      return this.doRequest<TApiTokensListResponse>({ mock: mocks.getTokensList?.[listName] });
    } else throw new Error(EApiErrors.NO_MOCK);
  }
}