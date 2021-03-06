import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: true,
        themes: {
            dark: {
                colorDarkBg: '#191B1F',
                colorLightBlue: '#5090ea',
                colorBlue: '#2172e5',
                colorDarkBlue: '#172a43',
            }
        },
        options: { customProperties: true },
    },
    treeShake: true,
});
