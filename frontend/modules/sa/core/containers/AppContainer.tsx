import * as React from 'react'
import { Provider } from 'react-redux'
import { History } from 'history'
import { Store } from 'redux'
import { ConnectedRouter, push } from 'react-router-redux'
import { Route, Switch } from 'react-router-dom'

import NotFound from '../components/NotFound'
import { Home, Academy } from '../bundles'
import { IAppDelegate } from '../types'

// tslint:disable-next-line:no-import-side-effect
import '../styles/index.scss'

export type Props = {
  app: IAppDelegate,
}

const AppContainer: React.StatelessComponent<Props> = (props) => {
  const home = Home(props.app)
  const academy = Academy(props.app)

  return (
    <Provider store={props.app.store}>
      <div className="sa-app">
        <ConnectedRouter history={props.app.history}>
          <div className="sa-content">
            <Switch>
              <Route exact={true} path="/" component={home} />
              <Route path="/academy" component={academy} />
              <Route path="/academy/:tab" component={academy} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </ConnectedRouter>
      </div>
    </Provider>
  )
}

export default AppContainer
