import { TToken, TTokenList } from "@/models/main";
import { Mutation } from "vuex-simple";
import { TokenSelectorGetters } from "./getters";

export class TokenSelectorMutations extends TokenSelectorGetters {
  @Mutation()
  setTokenChosen(value: TToken): void {
    this.tokenChosen = value;
  }

  @Mutation()
  addTokenList(list: TTokenList): void {
    const tempList = list;
    tempList.active = false;
    this.tokensLists.push(tempList);
  }

  @Mutation()
  setIsModalOpen(value: boolean): void {
    this.isModalOpen = value;
  }

  @Mutation()
  setListActivity(payload: { listname: string, value: boolean }): void {
    const list = this.tokensLists.find(list => list.name === payload.listname);
    if (list) list.active = payload.value;
    else console.error(`List ${payload.listname} does not exist`);
  }
}
