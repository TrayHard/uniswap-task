import { EApiErrors, EApiHeaders, IMockItem, TApiResponse } from '@/models/api';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export enum EApiEndpoints {
  getCoins = 'getCoins'
}

const isMocked: Record<EApiEndpoints, boolean> = {
  getCoins: true,
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
    const headerContentType = options.headers && options.headers[EApiHeaders.CONTENT_TYPE]
      ? options.headers[EApiHeaders.CONTENT_TYPE]
      : 'application/json';
    const requestParams: AxiosRequestConfig = {
      url: options.url,
      method,
      /* eslint @typescript-eslint/no-unsafe-assignment: 'off' */
      [['get', 'delete', 'put'].includes(method) ? 'params' : 'data']: options.params,
      headers: {
        [EApiHeaders.CONTENT_TYPE]: headerContentType,
        ...options.headers,
      },
    };

    const SUCCESS_CODES = [200, 201, 204];
    this.axiosInstance.interceptors.response.use(
      response => {
        if (SUCCESS_CODES.includes(response.status)) return response;
        else throw new Error(response.statusText);
      },
      error => { throw error; }
    );

    try {
      const apiResponse = await this.axiosInstance.request(requestParams);
      return {
        success: true,
        data: apiResponse.data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error?.response || error,
      };
    }
  }

  [EApiEndpoints.getCoins](): Promise<TApiResponse<TApiCurrUserInfoResponse>> {
    if (!isMocked.getCoins) {
      return this.doRequest<TApiCurrUserInfoResponse>({ options: {
        method: EApiMethods.GET,
        url: 'currentuserinfo',
      } });
    } else if (mocks.getCoins) {
      return this.doRequest<TApiCurrUserInfoResponse>({ mock: mocks.getCoins?.ok });
    } else throw new Error(EApiErrors.NO_MOCK);
  }
}