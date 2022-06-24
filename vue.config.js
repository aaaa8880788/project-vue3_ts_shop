const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: './build',
  configureWebpack: {
    resolve: {
      alias: {
        views: '@/views'
      },
      symlinks: true
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     views: '@/views'
  //   }
  // },
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('@', path.resolve(__dirname, 'src'))
  //     .set('views', '@/views'),
  //     config.resolve.symlinks(true)
  // }
})
