import {
  EApiErrors,
  EApiMethods,
  IMockItem,
  TApiAllTokensListsResponse,
  TApiGetBalanceResponse,
  TApiGetQuoteResponse,
  TApiGetUSDQuoteResponse,
  TApiGetWalletResponse,
  TApiTokensListResponse,
} from "@/models/api";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import mocks, { getRandomDelay } from "./mocks";

export enum EApiEndpoints {
  getTokensList = "getTokensList",
  getAllTokensLists = "getAllTokensLists",
  getBalance = "getBalance",
  getWallet = "getWallet",
  getQuote = "getQuote",
  getUsdQuote = "getUsdQuote",
}

const isMocked: Record<EApiEndpoints, boolean> = {
  getTokensList: true,
  getAllTokensLists: true,
  getBalance: true,
  getWallet: true,
  getQuote: true,
  getUsdQuote: true,
};

export class Api {
  private axiosInstance: AxiosInstance;

  constructor() {
    if (process.env.VUE_APP_API_URL) {
      this.axiosInstance = axios.create({
        baseURL: process.env.VUE_APP_API_URL,
      });
    } else throw new Error(EApiErrors.NO_API_PATH);
  }

  private async doRequest<T>(args: {
    options?: AxiosRequestConfig | null;
    mock?: IMockItem<T>;
  }): Promise<T> {
    const { options, mock } = args;
    if (mock) {
      return new Promise((resolve) =>
        setTimeout(
          () => {
            resolve(mock.mockData);
          },
          mock.timeout == "random" ? getRandomDelay() : mock.timeout
        )
      );
    } else if (!options) {
      throw new Error(EApiErrors.INCORRECT_CALL);
    }
    const method = options.method || "get";
    const headerContentType = "application/json";
    const requestParams: AxiosRequestConfig = {
      url: options.url,
      method,
      [["get", "delete", "put"].includes(method) ? "params" : "data"]:
        options.params,
      headers: {
        "Content-Type": headerContentType,
        ...options.headers,
      },
    };

    const SUCCESS_CODES = [200, 201, 204];

    this.axiosInstance.interceptors.response.use(
      (response) => {
        if (SUCCESS_CODES.includes(response.status)) return response.data;
        else throw response.statusText;
      },
      (error) =>
        Promise.reject({
          success: false,
          error: error?.response || error,
        })
    );

    return this.axiosInstance.request(requestParams);
  }

  [EApiEndpoints.getTokensList](
    listName: string
  ): Promise<TApiTokensListResponse> {
    if (!isMocked.getTokensList) {
      return this.doRequest<TApiTokensListResponse>({
        options: {
          method: EApiMethods.GET,
          url: "getTokensList",
          params: { listName },
        },
      });
    } else if (mocks.getTokensList) {
      return this.doRequest<TApiTokensListResponse>({
        mock: mocks.getTokensList[listName],
      });
    } else throw new Error(EApiErrors.NO_MOCK);
  }

  [EApiEndpoints.getAllTokensLists](): Promise<TApiAllTokensListsResponse> {
    if (!isMocked.getAllTokensLists) {
      return this.doRequest<TApiAllTokensListsResponse>({
        options: {
          method: EApiMethods.GET,
          url: "getAllTokensLists",
        },
      });
    } else if (mocks.getAllTokensLists) {
      return this.doRequest<TApiAllTokensListsResponse>({
        mock: mocks.getAllTokensLists.success,
      });
    } else throw new Error(EApiErrors.NO_MOCK);
  }

  [EApiEndpoints.getBalance](
    tokenSymbol: string
  ): Promise<TApiGetBalanceResponse> {
    if (!isMocked.getBalance) {
      return this.doRequest<TApiGetBalanceResponse>({
        options: {
          method: EApiMethods.GET,
          url: "getBalance",
          params: { tokenSymbol },
        },
      });
    } else if (mocks.getBalance) {
      return this.doRequest<TApiGetBalanceResponse>({
        mock: mocks.getBalance[tokenSymbol],
      });
    } else throw new Error(EApiErrors.NO_MOCK);
  }

  [EApiEndpoints.getWallet](): Promise<TApiGetWalletResponse> {
    if (!isMocked.getWallet) {
      return this.doRequest<TApiGetWalletResponse>({
        options: {
          method: EApiMethods.GET,
          url: "getWallet",
        },
      });
    } else if (mocks.getWallet) {
      return this.doRequest<TApiGetWalletResponse>({
        mock: mocks.getWallet.success,
      });
    } else throw new Error(EApiErrors.NO_MOCK);
  }

  [EApiEndpoints.getQuote](
    from: string,
    to: string
  ): Promise<TApiGetQuoteResponse> {
    if (!isMocked.getQuote) {
      return this.doRequest<TApiGetQuoteResponse>({
        options: {
          method: EApiMethods.GET,
          url: "quote",
          params: { from, to },
        },
      });
    } else if (mocks.getQuote) {
      return this.doRequest<TApiGetQuoteResponse>({
        mock: mocks.getQuote[`${from}_${to}`],
      });
    } else throw new Error(EApiErrors.NO_MOCK);
  }

  [EApiEndpoints.getUsdQuote](token: string): Promise<TApiGetUSDQuoteResponse> {
    if (!isMocked.getUsdQuote) {
      return this.doRequest<TApiGetUSDQuoteResponse>({
        options: {
          method: EApiMethods.GET,
          url: "quote",
          params: { from: token, to: "USD" },
        },
      });
    } else if (mocks.getUsdQuote) {
      return this.doRequest<TApiGetUSDQuoteResponse>({
        mock: mocks.getUsdQuote[token],
      });
    } else throw new Error(EApiErrors.NO_MOCK);
  }
}

const api = new Api();

export default api;
