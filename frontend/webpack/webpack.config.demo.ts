import * as webpack from 'webpack'
import * as path from 'path'

// tslint:disable-next-line
const config = require(`./webpack.config.${process.env.NODE_ENV}`).default

config.entry.core.pop()
config.entry.core.push(path.resolve(__dirname, '..', 'demo', 'index.ts'))

config.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      DEMO_MODE: JSON.stringify(true),
    },
  }),
)

config.resolve.alias['sa/core/api'] =
  path.resolve(__dirname, '..', 'demo', 'api')

if (process.env.NODE_ENV === 'production') {
  config.output.path = path.resolve(__dirname, '..', 'demo-dist')
}

export default config
