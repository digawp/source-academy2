
import * as _debug from 'debug'
import * as webpack from 'webpack'

const env = (process.env.DEMO_MODE && 'demo') || process.env.NODE_ENV
// tslint:disable-next-line
const config = require(`../webpack/webpack.config.${env}`).default

const debug = _debug('source-academy')

webpack(config).run((error, stats) => {
  if (error) {
    debug('Webpack encountered fatal error', error)
  }

  const jsonStats = stats.toJson()
  debug('Webpack compile completed')
  debug(stats.toString({
    chunkModules: false,
    chunks: true,
    colors: true,
  }))

  if (jsonStats.errors.length > 0) {
    debug('Webpack compiler encountered errors.')
    debug(jsonStats.errors.join('\n'))
    process.exit(1)
  } else if (jsonStats.warnings.length > 0) {
    debug('Webpack compiler encountered warnings.')
    debug(jsonStats.warnings.join('\n'))
  } else {
    debug('No errors or warnings encountered.')
  }
})
