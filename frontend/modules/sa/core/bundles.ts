import * as React from 'react'
import { Store } from 'redux'

import { IAppDelegate, BundleLoader } from './types'
import Bundle from './Bundle'

import loadHome from 'sa/home/loader'
import loadAcademy from 'sa/academy/loader'

const createBundle = (loader: BundleLoader) => (app: IAppDelegate) => () =>
  React.createElement(Bundle, { loader, app })

export const Home = createBundle(loadHome)
export const Academy = createBundle(loadAcademy)
