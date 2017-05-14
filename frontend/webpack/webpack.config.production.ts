/// <reference path='webpack.d.ts' />

import * as ExtractTextPlugin from 'extract-text-webpack-plugin'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as path from 'path'
import * as webpack from 'webpack'
import * as ParallelUglifyPlugin from 'webpack-parallel-uglify-plugin'

import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

import baseConfig, { packageSort } from './webpack.config.base'

const merge = require('webpack-merge') // tslint:disable-line

export default merge(baseConfig, {
  devtool: 'cheap-module-source-map',

  entry: {
    core: [
      path.resolve(__dirname, '..', 'index.ts')
    ]
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?minimize',
            'postcss-loader',
            'sass-loader'
          ]
        })
      }
    ]
  },

  output: {
    filename: '[name].[hash].min.js',
    chunkFilename: '[name].[chunkhash].min.js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/'
  },

  plugins: (process.env.SKIP_BA ? [] : [
    new BundleAnalyzerPlugin()
  ]).concat([
    new ParallelUglifyPlugin({
      cacheDir: path.resolve(__dirname, '../.uglifycache')
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'body',
      template: path.resolve(__dirname, '../index.html'),
      chunksSortMode: packageSort(['vendor', 'core'])
    }),
    new webpack.optimize.OccurrenceOrderPlugin(false),
    new ExtractTextPlugin({
      allChunks: true,
      filename: '[name].min.css'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        DEMO_MODE: JSON.stringify(process.env.DEMO_MODE ? true : false)
      }
    })
  ])
})

