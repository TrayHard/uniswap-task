import api, { EApiEndpoints } from "@/api";
import { TQuote } from "@/models/main";
import { Action } from "vuex-simple";
import { MainMutations } from "./mutations";

export class MainActions extends MainMutations {
  @Action()
  async getBalance(tokenSymbol: string): Promise<number> {
    return api[EApiEndpoints.getBalance](tokenSymbol)
      .then((amount) => {
        this.updateBalance({ tokenSymbol, amount });
        return amount;
      })
      .catch(() => {
        // bypassing for mocks; in actual wallet we always will get correct value
        this.updateBalance({ tokenSymbol, amount: 0 });
        return 0;
      });
  }

  @Action()
  async getQuote(payload: { from: string; to: string }): Promise<TQuote> {
    return api[EApiEndpoints.getQuote](payload.from, payload.to);
  }

  @Action()
  async getUsdQuote(token: string): Promise<TQuote> {
    return api[EApiEndpoints.getUsdQuote](token);
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
