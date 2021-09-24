import { Mutation } from "vuex-simple";
import { MainGetters } from "./getters";

export class MainMutations extends MainGetters {
  @Mutation()
  setConnectedStatus(value: boolean): void {
    this.isConnected = value;
  }
}
