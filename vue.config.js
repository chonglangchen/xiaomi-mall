const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  devServer: {
    proxy: {
      '/xiaomi/v2': {
        target: 'http://www.codeedu.com.cn/',
      }
    }
  }
})
