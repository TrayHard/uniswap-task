import api, { EApiEndpoints } from '@/api';
import { TToken } from '@/models/main';
import { VuexModule } from 'vuex-typed-modules';

export const tokenChooserStore = new VuexModule({
  name: 'tokenChooserModule',
  state: {
    isModalOpen: false,
    tokenChosen: null as TToken | null,
    tokensList: [] as TToken[]
  },
  actions: {
    async getTokensList(ctx, listname: string) {
      const list = await api[EApiEndpoints.getTokensList](listname)
      console.log({ list });
      return list
    }
  }
});
