const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api/*': {
        target: 'https://flowing-gasket-421115.ew.r.appspot.com',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
