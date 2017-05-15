/**
 * Common Webpack configuration used by production and development
 */
import * as path from 'path'
import {Configuration} from 'webpack'
import {TsConfigPathsPlugin} from 'awesome-typescript-loader'

export const packageSort = (packages: string[]) => {
  const len = packages.length - 1;
  const first = packages[0];
  const last = packages[len];

  return (left: any, right: any) => {
    const leftIndex = packages.indexOf(left.names[0]);
    const rightindex = packages.indexOf(right.names[0]);

    if (leftIndex < 0 || rightindex < 0) {
      throw "unknown package";
    }

    if (leftIndex > rightindex) {
      return 1;
    }

    return -1;
  }
}

const webpackConfig: Configuration = {
  entry: {
    vendor: [
      'axios',
      'babel-polyfill',
      'classnames',
      'history',
      'react',
      'moment',
      'redux',
      'react-redux',
      'react-router',
      'react-router-dom',
      'react-router-redux',
      'redux-saga',
      '@blueprintjs/core',
      path.resolve(__dirname, '../modules', 'vendor', 'index.ts')
    ]
  },
  module: {
    rules: [
      {
        exclude: ['node-modules'],
        test: /\.tsx?$/,
        use: [ 'awesome-typescript-loader' ]
      },

      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },

  output: {
    filename: '[name].js',
    chunkFilename: '[name].js'
  },

  resolve: {
    alias: {
      'sa-variables': path.resolve(__dirname, '..', 'modules', 'vendor', 'blueprint', '_variables.scss'),
      'sa': path.resolve(__dirname, '..', 'modules', 'sa')
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  }
}

export default webpackConfig
