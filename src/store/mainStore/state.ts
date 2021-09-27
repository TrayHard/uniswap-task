import { State } from "vuex-simple";

export class MainState {
  @State()
  balances: Record<string, number> = {};

  @State()
  delta: null | number = null;

  @State()
  address: string | null = null;

  @State()
  isConnected = false;
}
