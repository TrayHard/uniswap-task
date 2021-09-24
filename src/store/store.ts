import { Module } from 'vuex-simple';
import { TokenSelectorModule as TokenSelectorModule } from './tokenSelectorStore';

export class RootStore {
  @Module()
  public tokenSelector = new TokenSelectorModule();
}