import * as React from 'react'
import { Store } from 'redux'

import Bundle from './Bundle'

import loadHome from 'sa/home/loader'
import loadAcademy from 'sa/academy/loader'

const createBundle = (load: any) => (store: any) => () =>
  React.createElement(Bundle, { store, load })

export const Home = createBundle(loadHome)
export const Academy = createBundle(loadAcademy)
