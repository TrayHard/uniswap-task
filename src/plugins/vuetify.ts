import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: { dark: true },
    treeShake: true,
    customVariables: ['~/styles/_vars.scss'],
});
