import { TToken } from "@/models/main"
import { Getter } from "vuex-simple"
import { TokenChooserState } from "./state"

export class TokenChooserGetters extends TokenChooserState {
  @Getter()
  get fullTokensList(): TToken[] {
    return this.tokensLists.reduce((fullList, tokenList) => {
      const addedSymbols = fullList.map((token) => token.symbol)
      const tokensFiltered = tokenList.tokens.filter(token => !addedSymbols.includes(token.symbol))
      return [...fullList, ...tokensFiltered]
    }, [] as TToken[])
      .sort((a, b) => a.symbol < b.symbol ? -1 : 1)
  }

  @Getter()
  get basicTokensList(): TToken[] {
    const list = ['ETH', 'DAI', 'USDC', 'USDT', 'WBTC', 'WETH']
    return this.fullTokensList.filter(token => list.includes(token.symbol))
  }
}
