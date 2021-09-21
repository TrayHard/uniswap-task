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

export type TMocks = {[key in EApiEndpoints]?: Record<string, IMockItem<unknown>>};

const mocks: TMocks = {
  getTokensList: {
    aaveTokenList: {
      timeout: 1000,
      mockData: {
        success: true,
        data: aaveTokenList,
      },
    },
    arbitrumOne: {
      timeout: 1000,
      mockData: {
        success: true,
        data: arbitrumOne,
      },
    },
    basic: {
      timeout: 1000,
      mockData: {
        success: true,
        data: basic,
      },
    },
    cmcDefi: {
      timeout: 1000,
      mockData: {
        success: true,
        data: cmcDefi,
      },
    },
    cmcStablecoin: {
      timeout: 1000,
      mockData: {
        success: true,
        data: cmcStablecoin,
      },
    },
    coinGecko: {
      timeout: 1000,
      mockData: {
        success: true,
        data: coinGecko,
      },
    },
    compound: {
      timeout: 1000,
      mockData: {
        success: true,
        data: compound,
      },
    },
    klerosTokens: {
      timeout: 1000,
      mockData: {
        success: true,
        data: klerosTokens,
      },
    },
    optimism: {
      timeout: 1000,
      mockData: {
        success: true,
        data: optimism,
      },
    },
    wrappedTokens: {
      timeout: 1000,
      mockData: {
        success: true,
        data: wrappedTokens,
      },
    },
    failed: {
      timeout: 3000,
      mockData: {
        success: false,
        error: new Error('Ошибочка!'),
      },
    },
  },
}

export default mocks
