import Vue from 'vue';
import Vuex from 'vuex';
import { createVuexStore } from 'vuex-simple';

import { RootStore } from './store';

Vue.use(Vuex);

const instance = new RootStore();

export default createVuexStore(instance, {
  strict: false,
  modules: {},
  plugins: []
});
