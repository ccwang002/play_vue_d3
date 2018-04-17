const path = require('path')

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'assets')
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.csv(\?.*)?$/,
          use: [{
            loader: 'file-loader',
            options: {
              'name': 'data/[name].[ext]'
            }
          }]
        }
      ]
    }
  }
}
