import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter } from 'react-router-redux'
import { Store } from 'redux'
import Bundle from './Bundle'
import { Home, Academy } from './loaders' 
import NotFound from './components/NotFound'

export default function createRoutes(store: Store<any>) {
  const academy = Academy(store)
  return (
    <div className="sa-content">
      <Switch>
        <Route exact path="/" component={Home(store)} />
        <Route path="/academy/inbox" component={academy} />
        <Route path="/academy/journal" component={academy} />
        <Route path="/academy/files" component={academy} />
        <Route path="/academy" component={academy} />
        <Route component={NotFound} />
      </Switch>
    </div>
  )
}
