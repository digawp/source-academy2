import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { injectReducers, createRootReducer } from './ducks'
import { IAppDelegate } from './types'
import { AsyncStore } from './types'

export interface IBundleProps {
  load: (delegate: IAppDelegate) => void
  store: AsyncStore
}

export interface IBundleState {
  component: React.ComponentClass<any> | null
}

class Bundle extends React.Component<IBundleProps, IBundleState> {

  state: IBundleState = { component: null }

  bundleLoaded = (component: React.ComponentClass<any>) => {
    this.setState({ component: withRouter(component) })
  }

  componentWillMount() {
    this.load(this.props)
  }

  componentWillReceiveProps(nextProps: IBundleProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }

  load(props: IBundleProps) {
    const { store } = this.props

    this.setState({ component: null })

    props.load({
      store,
      injectReducers,
      createRootReducer,
      bundleLoaded: this.bundleLoaded
    })
  }

  render() {
    if (this.state.component) {
      return React.createElement(this.state.component)
    } else {
      return null
    }
  }
}

export default Bundle
