module.exports = {
  webpack: {
    configure(webpackConfig) {
      if (webpackConfig.mode === 'production') {
        //抽离公共代码，只在生产环境
        if (webpackConfig.optimization == null) {
          webpackConfig.optimization = {}
        }
        webpackConfig.optimization.splitChunks = {
          chunks: 'all',
          cacheGroups: {
            antd: {
              name: 'antd-chunk',
              test: /antd/,
              priority: 100,
            },
            reactDom: {
              name: 'reactDom-chunk',
              test: /react-dom/,
              priority: 99,
            },
            vendors: {
              name: 'vendor-chunk',
              test: /node-modules/,
              priority: 98,
            }
          }
        }
      }
      return webpackConfig
    }
  },

  devServer: {
    port: 8000, //B端
    proxy: {
      '/api': 'http://localhost:3001',  //Mock
    }
  }
}