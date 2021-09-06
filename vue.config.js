module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/styles/main.scss";`,
      },
    },
  },

  lintOnSave: false,

  transpileDependencies: [
    'vuetify'
  ]
};
