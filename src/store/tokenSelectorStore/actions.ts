import api, { EApiEndpoints } from "@/api";
import { Action } from "vuex-simple";
import { TokenSelectorMutations } from "./mutations";

export class TokenSelectorActions extends TokenSelectorMutations {
  @Action()
  async getTokensList(listname: string): Promise<void> {
    return api[EApiEndpoints.getTokensList](listname).then((tokenList) =>
      this.addTokenList(tokenList)
    );
  }

  @Action()
  async getAllTokensLists(): Promise<void> {
    return api[EApiEndpoints.getAllTokensLists]().then((lists) =>
      lists.forEach((list) => this.addTokenList(list))
    );
  }
}
