import { IMockItem } from "@/models/api";
import { EApiEndpoints } from "@/api";

import arbitrumOne from "./tokenLists/Arbitrum One.json";
import optimism from "./tokenLists/Optimism.json";

export type TMocks = {
  [key in EApiEndpoints]?: Record<string, IMockItem<any>>;
};

export const getRandomDelay = (): number => {
  const DELAY_MIN = 1000
  const DELAY_RANGE = 2000
  return DELAY_MIN + Math.random() * DELAY_RANGE
}

const mocks: TMocks = {
  getTokensList: {
    arbitrumOne: {
      timeout: 'random',
      mockData: arbitrumOne,
    },
    optimism: {
      timeout: 'random',
      mockData: optimism,
    },
    failed: {
      timeout: 'random',
      mockData: new Error("Mock Error!"),
    },
  },
  getAllTokensLists: {
    success: {
      timeout: 'random',
      mockData: [arbitrumOne, optimism],
    },
  },
  getBalance: {
    ETH: {
      timeout: 'random',
      mockData: 0.192992,
    },
    USDT: {
      timeout: 'random',
      mockData: 32.5,
    },
  },
  getWallet: {
    success: {
      timeout: 'random',
      mockData: { address: '0x160Ff42A636702afde1303175810D3bBF0305AE4' }
    }
  }
};

export default mocks;
