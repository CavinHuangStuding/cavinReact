const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const resolve = (dir) => path.resolve(__dirname, dir)

module.exports = {
    mode: 'development',
    entry: {
        app: './src/main.js',
        snabbdom: './src/snabbdom/index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: resolve('dist')
    },
    module: {
      rules: [
        {
          test: /\.js|jsx$/,
          exclude: /node_modules/,// 屏蔽不需要处理的文件（文件夹）
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              [
                "@babel/plugin-transform-react-jsx",
                { pragma: "CavinReact.createElement" },
              ],
            ],
          },
        },
      ],
    },
    plugins:[
      //热更新插件
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
        // favicon: './static/favicon.ico',
        inject: 'body'
      }),
      new HtmlWebpackPlugin({
        filename: 'snabbdom.html',
        template: './src/snabbdom/index.html',
        // favicon: './static/favicon.ico',
        inject: 'body',
        chunks: ['snabbdom']
      })
    ],
    devtool: 'inline-source-map',
    devServer: {
      contentBase: resolve('dist'),
      compress: false,
      port: 9000,
      open:true,//自动拉起浏览器
      hot:false,//热加载
      // hotOnly:true//
    }
}
