import { VuexModule } from 'vuex-typed-modules';

export const swapModule = new VuexModule({
  name: 'swapModule',
  state: {
    isTokenChooserDialog: false,
  },
});
