import { Module } from 'vuex-simple';
import { TokenChooserModule } from './tokenChooserStore';

export class RootStore {
  @Module()
  public tokenChooser = new TokenChooserModule();
}