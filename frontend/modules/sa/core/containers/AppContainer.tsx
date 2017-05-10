import * as React from 'react'
import { Provider } from 'react-redux'
import { History } from 'history'
import { Store } from 'redux'
import { Route } from 'react-router'
import { ConnectedRouter, push } from 'react-router-redux'
import '../styles/index.scss'

import createRoutes from '../createRoutes'

export interface IAppContainerProps {
  history: History
  store: Store<any>
  routes: Route[]
}

export default class AppContainer extends React.Component<IAppContainerProps, void> {

  shouldComponentUpdate() {
    return false
  }

  render() {
    const { store, history } = this.props

    return (
      <Provider store={store}>
        <div className="sa-app">
          <ConnectedRouter
              history={history}
              children={createRoutes(store)} />
        </div>
      </Provider>
    )
  }
}