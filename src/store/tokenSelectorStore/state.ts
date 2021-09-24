import { TToken, TTokenList } from "@/models/main"
import { State } from "vuex-simple"

export class TokenSelectorState {
  @State()
  isModalOpen = false

  @State()
  tokenChosen = null as TToken | null

  @State()
  tokensLists = [] as TTokenList[]
}