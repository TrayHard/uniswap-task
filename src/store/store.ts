import { Module } from "vuex-simple";
import { TokenSelectorModule } from "./tokenSelectorStore";
import { MainModule } from "./mainStore";
import { SettingsModule } from "./settingsStore";

export class RootStore {
  @Module()
  public tokenSelector = new TokenSelectorModule();

  @Module()
  public main = new MainModule();

  @Module()
  public settings = new SettingsModule();
}
