import * as React from 'react'
import createBrowserHistory from 'history/createBrowserHistory'
import { render, unmountComponentAtNode } from 'react-dom'
import { AppContainer as HotContainer } from 'react-hot-loader'
import createStore from './redux/createStore'
import AppContainer from './containers/AppContainer'

const history = createBrowserHistory()
const store = createStore(history)

const container = document.getElementById('sa-root')

const doRender = () => {
  render(
    <HotContainer>
      <AppContainer
        store={store}
        history={history} />
    </HotContainer>,
    container
  )
}

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept('./containers/AppContainer', () => {
      setImmediate(() => {
        container && unmountComponentAtNode(container)

        doRender()
      })
    })
  }
}

// Render the application
doRender()