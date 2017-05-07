import * as React from 'react'
import { Store } from 'redux'

import Bundle from './Bundle'

import loadHome from './home'
import loadAcademy from './academy'

export const Home = (store: any) => () =>
  (<Bundle store={store} load={loadHome} />)

export const Academy = (store: any) => () =>
  (<Bundle store={store} load={loadAcademy} />)
