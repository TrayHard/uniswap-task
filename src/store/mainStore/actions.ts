import api, { EApiEndpoints } from "@/api";
import { Action } from "vuex-simple";
import { MainMutations } from "./mutations";

export class MainActions extends MainMutations {
  @Action()
  async getTokensList(): Promise<void> {
    console.log();
  }
}
