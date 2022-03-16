module.exports = {
  outputDir: 'dist',
  publicPath: './',
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "./src/assets/css/_variable.scss";`
      },
      less: {
        modifyVars: {
          'nav-bar-background-color': '#2058AB',
          'nav-bar-icon-color': '#FFF',
          'nav-bar-text-color': '#FFF',
          'nav-bar-title-text-color': '#FFF',
          'tabs-bottom-bar-color': '#1989fa',
          'cascader-title-line-height	': '16px',
          'dropdown-menu-height': '1rem',
          'dropdown-menu-weight': '1rem',
          'dropdown-menu-title-font-size': '0.35rem',
          'tabs-default-color': '#4d72ac',
          'tab-text-color': '#646566',
        }
      }
    }
  },
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true,
    port: 8000,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'https://tgtmhaseportal.haier.net:9665/Order_test',
        // target: 'https://tgtmhaseportal.haier.net:9665/',
        ws: false,
        changeOrigin: true
      }
    },
  }
}