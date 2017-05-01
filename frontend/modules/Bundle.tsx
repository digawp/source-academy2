import * as React from 'react'

export interface IBundleProps {
  load: (callback: Function) => void
}

export interface IBundleState {
  mod: any
}

class Bundle extends React.Component<IBundleProps, IBundleState> {

  state = {
    mod: null
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
    this.setState({
      mod: null
    })

    props.load((mod: any) => {
      this.setState({
        mod: mod.default ? mod.default : mod
      })
    })
  }

  render() {
    if (typeof this.props.children === 'function' && this.state.mod) {
      return this.props.children(this.state.mod)
    } else {
      return null
    }
  }
}

export default Bundle
