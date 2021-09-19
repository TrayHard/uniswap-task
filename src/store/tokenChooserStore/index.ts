import api, { EApiEndpoints } from '@/api';
import { TToken, TTokenList } from '@/models/main';
import { VuexModule } from 'vuex-typed-modules';

export const tokenChooserStore = new VuexModule({
  name: 'tokenChooserModule',
  state: {
    isModalOpen: false,
    tokenChosen: null as TToken | null,
    tokensLists: [] as TTokenList[]
  },
  mutations: {
    setTokenChosen(state, value: TToken) {
      state.tokenChosen = value
    },
    addTokenList(state, list: TTokenList) {
      state.tokensLists.push(list)
    }
  },
  actions: {
    async getTokensList(ctx, listname: string) {
      const response = await api[EApiEndpoints.getTokensList](listname)
      if (response.success) ctx.commit('addTokenList', response.data)
    }
  },
  getters: {
    fullTokensList(state): TToken[] {
      return state.tokensLists.reduce((fullList, tokenList) => {
        const addedSymbols = fullList.map((token) => token.symbol)
        const tokensFiltered = tokenList.tokens.filter(token => !addedSymbols.includes(token.symbol))
        return [...fullList, ...tokensFiltered]
      }, [] as TToken[])
        .sort((a, b) => a.symbol < b.symbol ? -1 : 1)
    },
    basicTokensList(state): TToken[] {
      const list = ['ETH', 'DAI', 'USDC', 'USDT', 'WBTC', 'WETH']
      const fullTokensList = state.tokensLists.reduce((fullList, tokenList) => {
        const addedSymbols = fullList.map((token) => token.symbol)
        const tokensFiltered = tokenList.tokens.filter(token => !addedSymbols.includes(token.symbol))
        return [...fullList, ...tokensFiltered]
      }, [] as TToken[])
        .sort((a, b) => a.symbol < b.symbol ? -1 : 1)
      return fullTokensList.filter(token => list.includes(token.symbol))
    },
  }
});
