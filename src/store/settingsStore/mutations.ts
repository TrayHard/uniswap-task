import { Mutation } from "vuex-simple";
import { SettingsGetters } from "./getters";
import { TSettings } from "./state";

export class SettingsMutations extends SettingsGetters {
  @Mutation()
  setSetting<T extends keyof TSettings>(payload: { name: T; value: TSettings[T] }): void {
    this.settings[payload.name] = payload.value;
  }
}
