import { State } from "vuex-simple"

export class MainState {
  @State()
  balances: Record<string, number> = {}

  @State()
  address: string | null = null

  @State()
  isConnected = false
}