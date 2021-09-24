import { TToken, TTokenList } from "@/models/main"
import { Getter } from "vuex-simple"
import { TokenSelectorState } from "./state"

export class TokenSelectorGetters extends TokenSelectorState {
  @Getter()
  get sortedTokensLists(): TTokenList[] {
    return this.tokensLists.sort((a, b) => +b.active - +a.active);
  }

  @Getter()
  get activeTokensLists(): TTokenList[] {
    return this.tokensLists.filter(list => list.active);
  }

  @Getter()
  get fullTokensList(): TToken[] {
    return this.activeTokensLists
      .reduce((fullList, tokenList) => {
        const addedSymbols = fullList.map((token) => token.symbol)
        const tokensFiltered = tokenList.tokens.filter(token => !addedSymbols.includes(token.symbol))
        return [...fullList, ...tokensFiltered]
      }, [] as TToken[])
        .sort((a, b) => a.symbol < b.symbol ? -1 : 1)

  }

  @Getter()
  get basicTokensList(): TToken[] {
    const list = ['ETH', 'DAI', 'USDC', 'USDT', 'WBTC', 'WETH']
    // Not sure how to remove duplicated parts of code here properly
    return this.tokensLists
      .reduce((fullList, tokenList) => {
        const addedSymbols = fullList.map((token) => token.symbol)
        const tokensFiltered = tokenList.tokens.filter(token => !addedSymbols.includes(token.symbol))
        return [...fullList, ...tokensFiltered]
      }, [] as TToken[])
        .sort((a, b) => a.symbol < b.symbol ? -1 : 1)
        .filter(token => list.includes(token.symbol))
  }
}
