module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/styles/main.scss";`,
      },
    },
  },

  lintOnSave: false,

  transpileDependencies: [
    'vuetify'
  ],

  chainWebpack: config => {
    config
    .plugin('html')
    .tap(args => {
      args[0].title = 'My Uniswap'
      return args
    })
  }
};
