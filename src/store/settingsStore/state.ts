import { State } from "vuex-simple";

export type TSettings = {
  slippageTolerance: string
  transactionDeadline: string
  isAutoRouter: boolean
  isExpertMode: boolean
}

export class SettingsState {
  @State()
  settings: TSettings = {
    slippageTolerance: "",
    transactionDeadline: "",
    isAutoRouter: false,
    isExpertMode: false,
  }
}
