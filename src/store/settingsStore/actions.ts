import { Action } from "vuex-simple";
import { SettingsMutations } from "./mutations";
import { TSettings } from "./state";

export class SettingsActions extends SettingsMutations {
  @Action()
  loadSettings(): void {
    const settingsString = localStorage.getItem("settings");
    if (settingsString) {
      const settings = JSON.parse(settingsString) as TSettings;
      for (const key in settings) {
        if (Object.prototype.hasOwnProperty.call(settings, key)) {
          const name = key as keyof TSettings;
          this.setSetting({ name, value: settings[name] });
        }
      }
    }
  }

  @Action()
  saveSettings(): void {
    localStorage.setItem("settings", JSON.stringify(this.settings));
  }
}
