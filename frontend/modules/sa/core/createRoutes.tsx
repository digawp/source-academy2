import * as React from 'react'
import { Route } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter } from 'react-router-redux'
import { Store } from 'redux'
import Bundle from './Bundle'
import { Home, Academy } from './loaders' 

export default function createRoutes(store: Store<any>) {
  return (
    <div className="sa-content">
      <Route exact path="/" component={Home(store)} />
      <Route path="/academy" component={Academy(store)} />
    </div>
  )
}
