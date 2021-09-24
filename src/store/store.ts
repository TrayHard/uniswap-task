import { Module } from 'vuex-simple';
import { TokenSelectorModule } from './tokenSelectorStore';
import { MainModule } from './mainStore';

export class RootStore {
  @Module()
  public tokenSelector = new TokenSelectorModule();

  @Module()
  public main = new MainModule();
}