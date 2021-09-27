import { Mutation } from "vuex-simple";
import { MainGetters } from "./getters";

export class MainMutations extends MainGetters {
  @Mutation()
  setConnectedStatus(value: boolean): void {
    this.isConnected = value;
  }

  @Mutation()
  setWalletAddress(value: string): void {
    this.address = value;
  }

  @Mutation()
  setDelta(value: number): void {
    this.delta = value;
  }

  @Mutation()
  updateBalance(payload: { tokenSymbol: string; amount: number }): void {
    this.balances = { ...this.balances, [payload.tokenSymbol]: payload.amount };
  }
}
