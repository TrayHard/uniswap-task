import { Getter } from "vuex-simple"
import { MainState } from "./state"

export class MainGetters extends MainState {
  @Getter()
  get test(): number {
    return 0;
  }
}
