import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { IAppDelegate, BundleLoader } from './types'

export type Props = {
  app: IAppDelegate
  loader: BundleLoader,
}

export type State = {
  component: React.ComponentClass<any> | null,
}

class Bundle extends React.Component<Props, State> {

  state: State = { component: null }

  bundleLoaded = (component: React.ComponentClass<any>) => {
    this.setState({ component: withRouter(component) })
  }

  componentWillMount() {
    this.load(this.props)
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.loader !== this.props.loader) {
      this.load(nextProps)
    }
  }

  load(props: Props) {
    this.setState({ component: null })
    props.loader(props.app, this.bundleLoaded)
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
