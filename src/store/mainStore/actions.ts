import api, { EApiEndpoints } from "@/api";
import { Action } from "vuex-simple";
import { MainMutations } from "./mutations";

export class MainActions extends MainMutations {
  @Action()
  async getBalance(tokenSymbol: string): Promise<number> {
    return api[EApiEndpoints.getBalance](tokenSymbol).then((amount) => {
      this.updateBalance({ tokenSymbol, amount });
      return amount
    });
  }

  @Action()
  async login(): Promise<void> {
    return api[EApiEndpoints.getWallet]().then(({ address }) => {
      this.setWalletAddress(address);
      this.getBalance("ETH");
      this.setConnectedStatus(true);
    });
  }
}
