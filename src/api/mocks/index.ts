import { IMockItem } from "@/models/api";
import { EApiEndpoints } from "@/api";

import arbitrumOne from "./tokenLists/Arbitrum One.json";
import optimism from "./tokenLists/Optimism.json";

export type TMocks = {
  [key in EApiEndpoints]?: Record<string, IMockItem<any>>;
};

export const getRandomDelay = (): number => {
  const DELAY_MIN = 1000;
  const DELAY_RANGE = 2000;
  return DELAY_MIN + Math.random() * DELAY_RANGE;
};

const mocks: TMocks = {
  getTokensList: {
    arbitrumOne: {
      timeout: "random",
      mockData: arbitrumOne,
    },
    optimism: {
      timeout: "random",
      mockData: optimism,
    },
    failed: {
      timeout: "random",
      mockData: new Error("Mock Error!"),
    },
  },
  getAllTokensLists: {
    success: {
      timeout: "random",
      mockData: [arbitrumOne, optimism],
    },
  },
  getBalance: {
    ETH: {
      timeout: "random",
      mockData: 0.192992,
    },
    WETH: {
      timeout: "random",
      mockData: 0.863549,
    },
    USDT: {
      timeout: "random",
      mockData: 32.5,
    },
    USDC: {
      timeout: "random",
      mockData: 0,
    },
    DAI: {
      timeout: "random",
      mockData: 2.92,
    },
    WBTC: {
      timeout: "random",
      mockData: 0.02663,
    },
  },
  getWallet: {
    success: {
      timeout: "random",
      mockData: { address: "0x160Ff42A636702afde1303175810D3bBF0305AE4" },
    },
  },
  getQuote: {
    ETH_WBTC: {
      timeout: "random",
      mockData: { quote: 0.06852122 },
    },
    WBTC_ETH: {
      timeout: "random",
      mockData: { quote: 14.594019 },
    },
    ETH_USDT: {
      timeout: "random",
      mockData: { quote: 2861.86231 },
    },
    USDT_ETH: {
      timeout: "random",
      mockData: { quote: 0.000349423 },
    },
    ETH_DAI: {
      timeout: "random",
      mockData: { quote: 2861.82421 },
    },
    DAI_ETH: {
      timeout: "random",
      mockData: { quote: 0.000349561 },
    },
    ETH_USDC: {
      timeout: "random",
      mockData: { quote: 2861.45898 },
    },
    USDC_ETH: {
      timeout: "random",
      mockData: { quote: 0.000349843 },
    },
    ETH_WETH: {
      timeout: "random",
      mockData: { quote: 1 },
    },
    WETH_ETH: {
      timeout: "random",
      mockData: { quote: 1 },
    },
  },
  getUsdQuote: {
    ETH: {
      timeout: "random",
      mockData: { quote: 2861.86 },
    },
    WETH: {
      timeout: "random",
      mockData: { quote: 2861.86 },
    },
    WBTC: {
      timeout: "random",
      mockData: { quote: 42046 },
    },
    USDT: {
      timeout: "random",
      mockData: { quote: 1.00103 },
    },
    USDC: {
      timeout: "random",
      mockData: { quote: 1.00093 },
    },
    DAI: {
      timeout: "random",
      mockData: { quote: 1.00391 },
    },
  },
};

export default mocks;
