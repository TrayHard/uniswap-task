import { State } from "vuex-simple"

export class MainState {
  @State()
  balances: Record<string, number> = {}

  @State()
  isConnected = false
}