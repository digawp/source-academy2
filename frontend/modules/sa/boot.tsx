import * as React from 'react'
import { Store } from 'redux'
import { render, unmountComponentAtNode } from 'react-dom'
import { AppContainer as HotContainer } from 'react-hot-loader'

import App from 'sa/core'
import AppContainer from 'sa/core/containers/AppContainer'
import { API } from 'sa/core/types'

const boot = (container = document.getElementById('sa-root')!) => {
  const app = new App()

  const doRender = () => {
    render(
      <HotContainer>
        <AppContainer app={app} />
      </HotContainer>,
      container,
    )
  }

  if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
      module.hot.accept('./core/containers/AppContainer', () => {
        if (container) {
          unmountComponentAtNode(container)
        }
        doRender()
      })
    }
  }

  // Render the application
  doRender()

  return app
}

export default boot
