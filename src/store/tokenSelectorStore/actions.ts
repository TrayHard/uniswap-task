import api, { EApiEndpoints } from "@/api";
import { Action } from "vuex-simple";
import { TokenSelectorMutations } from "./mutations";

export class TokenSelectorActions extends TokenSelectorMutations {
  @Action()
  async getTokensList(listname: string): Promise<void> {
    const response = await api[EApiEndpoints.getTokensList](listname);
    if (response.success) this.addTokenList(response.data);
  }

  @Action()
  async getAllTokensLists(): Promise<void> {
    const response = await api[EApiEndpoints.getAllTokensLists]();
    if (response.success)
      response.data.forEach(list => this.addTokenList(list));
  }
}
