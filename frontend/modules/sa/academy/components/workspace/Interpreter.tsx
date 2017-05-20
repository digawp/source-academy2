import * as React from 'react'
import { InterpreterOutput } from 'sa/core/types'
import { findDOMNode } from 'react-dom'

export type Props = {
  outputs: InterpreterOutput[],
}

class Interpreter extends React.Component<Props, void> {
  outputs: React.ReactInstance[] = []

  componentDidMount() {
    require.ensure([], () => {
      const hjs = require('highlight.js/lib/highlight')
      const javascript = require('highlight.js/lib/languages/javascript')

      require('highlight.js/styles/github.css')
      hjs.registerLanguage('javascript', javascript)

      this.outputs.forEach(i => {
        const el = findDOMNode(i)
        hjs.highlightBlock(el)
      })
    })
  }

  renderOutput(output: InterpreterOutput, key: number) {
    const { code, value } = output
    const outputRef = (i: React.ReactInstance) => this.outputs.push(i)
    return (
      <div key={key} className="output">
        <div className="code">
          <pre ref={outputRef}><code className="javascript">{code}</code></pre>
        </div>
        <div className={`value value-${status}`}>
          {value}
        </div>
      </div>
    )
  }

  render() {
    const { outputs } = this.props
    const outputComponents = outputs.map((output, idx) => this.renderOutput(output, idx))
    return (
      <div className="sa-interpreter">
        {outputComponents}
      </div>
    )
  }
}

export default Interpreter
