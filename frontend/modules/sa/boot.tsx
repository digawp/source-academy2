import * as React from 'react'
import { Store } from 'redux'
import createBrowserHistory from 'history/createBrowserHistory'
import { render, unmountComponentAtNode } from 'react-dom'
import { AppContainer as HotContainer } from 'react-hot-loader'
import createStore from 'sa/core/createStore'
import AppContainer from 'sa/core/containers/AppContainer'
import { API } from 'sa/core/types'

const boot = (api: API, container = document.getElementById('sa-root')!) => {
  const history = createBrowserHistory()
  const store = createStore(history)

  const doRender = () => {
    render(
      <HotContainer>
        <AppContainer store={store} history={history} />
      </HotContainer>,
      container
    )
  }

  if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
      module.hot.accept('./core/containers/AppContainer', () => {
        container && unmountComponentAtNode(container)

        doRender()
      })
    }
  }

  (global as any).CURRENT_API = api

  // Render the application
  doRender()

  return store
}

export default boot
