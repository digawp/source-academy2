import * as path from 'path'

const config = require(`./webpack.config.${process.env.NODE_ENV}`).default

config.entry.core.pop()
config.entry.core.push(path.resolve(__dirname, '..', 'demo', 'index.ts'))

if (process.env.NODE_ENV === 'production') {
  config.output.path = path.resolve(__dirname, '..', 'demo-dist')
}

export default config