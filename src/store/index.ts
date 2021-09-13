import Vue from "vue";
import Vuex from "vuex";
import { Database } from "vuex-typed-modules";
import { tokenChooserStore } from '@/store/tokenChooserStore'

Vue.use(Vuex);

const database = new Database({ logger: true });

export default new Vuex.Store({
  plugins: [database.deploy([tokenChooserStore])]
})
