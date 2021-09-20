import { TToken, TTokenList } from "@/models/main";
import { Mutation } from "vuex-simple";
import { TokenChooserGetters } from "./getters";

export class TokenChooserMutations extends TokenChooserGetters {
  @Mutation()
  setTokenChosen(value: TToken): void {
    this.tokenChosen = value
  }

  @Mutation()
  addTokenList(list: TTokenList): void {
    this.tokensLists.push(list)
  }

  @Mutation()
  setIsModalOpen(value: boolean): void {
    this.isModalOpen = value
  }
}
