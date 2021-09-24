import { IMockItem } from "@/models/api";
import { EApiEndpoints } from "@/api";

import aaveTokenList from './tokenLists/Aave Token List.json';
import arbitrumOne from './tokenLists/Arbitrum One.json';
import basic from './tokenLists/Basic.json';
import cmcDefi from './tokenLists/CMC Defi.json';
import cmcStablecoin from './tokenLists/CMC Stablecoin.json';
import coinGecko from './tokenLists/CoinGecko.json';
import compound from './tokenLists/Compound.json';
import klerosTokens from './tokenLists/Kleros Tokens.json';
import optimism from './tokenLists/Optimism.json';
import wrappedTokens from './tokenLists/Wrapped Tokens.json';

export type TMocks = {[key in EApiEndpoints]?: Record<string, IMockItem<any>>};

const mocks: TMocks = {
  getTokensList: {
    arbitrumOne: {
      timeout: 1000,
      mockData: {
        success: true,
        data: arbitrumOne,
      },
    },
    optimism: {
      timeout: 1000,
      mockData: {
        success: true,
        data: optimism,
      },
    },
    failed: {
      timeout: 3000,
      mockData: {
        success: false,
        error: new Error('Mock Error!'),
      },
    },
  },
  getAllTokensLists: {
    success: {
      timeout: 1000,
      mockData: {
        success: true,
        data: [
          arbitrumOne,
          optimism,
        ],
      },
    },
  },
  getBalance: {
    ETH: {
      timeout: 1000,
      mockData: {
        success: true,
        data: 0,
      },
    },
  },
}

export default mocks
