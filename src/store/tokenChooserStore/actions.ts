import api, { EApiEndpoints } from "@/api";
import { Action } from "vuex-simple";
import { TokenChooserMutations } from "./mutations";

export class TokenChooserActions extends TokenChooserMutations {
  @Action()
  async getTokensList(listname: string): Promise<void> {
    const response = await api[EApiEndpoints.getTokensList](listname)
    if (response.success) this.addTokenList(response.data)
  }
}
