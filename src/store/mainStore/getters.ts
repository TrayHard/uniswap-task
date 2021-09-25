import { Getter } from "vuex-simple"
import { MainState } from "./state"

export class MainGetters extends MainState {
  @Getter()
  get currEthBalance(): number {
    return this.balances.ETH
  }
}
