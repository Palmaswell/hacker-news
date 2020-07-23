/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { join, resolve } = require('path');

module.exports = {
  mode: 'development',
  entry: {
    app: join(__dirname, 'src', 'index.tsx'),
    sw: join(__dirname, 'src', 'sw.ts')
  },
  devServer: {
    contentBase: './dist',
  },
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: '/node_modules/'
      }
    ],
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: join(__dirname, 'src', 'index.html')
    })
  ]
}
