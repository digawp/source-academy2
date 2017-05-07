import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Store } from 'redux'

export interface IBundleProps {
  load: (store: Store<any>, callback: Function) => void
  store: Store<any>
}

export interface IBundleState {
  component: React.ComponentClass<any> | null
}

class Bundle extends React.Component<IBundleProps, IBundleState> {

  state: IBundleState = { component: null }

  componentWillMount() {
    this.load(this.props)
  }

  componentWillReceiveProps(nextProps: IBundleProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }

  load(props: IBundleProps) {
    this.setState({ component: null })

    props.load(this.props.store, (component: any) => {
      this.setState({ component: withRouter(component) })
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
