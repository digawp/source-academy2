/// <reference path='scripts.d.ts' />
import * as _debug from 'debug'
import * as express from 'express'
import * as path from 'path'
import * as webpack from 'webpack'
import * as webpackDevMiddleware from 'webpack-dev-middleware'
import * as webpackHotMiddleware from 'webpack-hot-middleware'

import { spawn } from 'child_process'

const env = (process.env.DEMO_MODE && 'demo') || process.env.NODE_ENV
const config = require(`../webpack/webpack.config.${env}`).default

const port = process.env.PORT || 8000
const app = express()
const debug = _debug('source-academy')

let compiler: any

try {
  compiler = webpack(config)
} catch (e) {
  console.error(e)
}

const wdm = webpackDevMiddleware(compiler, {
  contentBase: path.resolve(__dirname, '..'),
  hot: true,
  lazy: false,
  publicPath: config.output.publicPath,
  quiet: false,
  stats: {
    colors: true
  }
})

app.use(wdm)

app.use(express.static(path.resolve(__dirname, '../../public')))

app.use(webpackHotMiddleware(compiler, {
  path: '/__webpack_hmr'
}))
app.use('*', (req, res, next) => {
  const filename = path.join(compiler.outputPath, 'index.html')
  compiler.outputFileSystem.readFile(filename, (err: any, result: any) => {
    if (err) {
      return next(err)
    }
    res.set('content-type', 'text/html')
    res.send(result)
    res.end()
  })
})

const server = app.listen(port, 'localhost', (error: Error) => {
  if (error) {
    return console.error(error)
  }
  debug(`Listening at http://localhost:${port}`)
})

process.on('SIGTERM', () => {
  debug('Stopping dev server')
  wdm.close()
  server.close(() => {
    process.exit(0)
  })
})
