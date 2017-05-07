/// <reference path='webpack.d.ts' />

import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as path from 'path'
import * as webpack from 'webpack'

import { CheckerPlugin } from 'awesome-typescript-loader'
import baseConfig, { packageSort } from './webpack.config.base'

const merge = require('webpack-merge') // tslint:disable-line

const port = process.env.PORT || 8000

const publicPath = `http://localhost:${port}/`

const hot = 'webpack-hot-middleware/client?path=' +
  publicPath + '__webpack_hmr'

const config: webpack.Configuration = {
  devtool: 'inline-source-map',

  entry: {
    core: [
      'react-hot-loader/patch',
      hot,
      path.resolve(__dirname, '../modules', 'index.tsx')
    ]
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        exclude: ['node_modules'],
        test: /\.js$/,
        use: ['source-map-loader']
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader?sourceMap',
          'sass-loader'
        ]
      }
     ]
  },

  output: {
    publicPath
  },

  plugins: [
    new CheckerPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(false),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'body',
      template: path.resolve(__dirname, '../index.html'),
      chunksSortMode: packageSort(['vendor', 'core'])
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
}

export default merge(baseConfig, config)
