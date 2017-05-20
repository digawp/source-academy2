import * as React from 'react'
import { Button, IconClasses } from '@blueprintjs/core'
import { InterpreterOutput } from 'sa/core/types'
import { findDOMNode } from 'react-dom'

export type Props = {
  outputs: InterpreterOutput[],
}

type OutputProps = {
  output: InterpreterOutput,
  refFn: (instance: React.ReactInstance) => any,
}

const Output: React.StatelessComponent<OutputProps> =
  ({ output, refFn }) => (
    <div className="output">
      <div className="code">
        <span className="pt-icons pt-icon-code in-icon" />
        <pre ref={refFn}><code className="javascript">{output.code}</code></pre>
      </div>
      <div className={`value value-${status}`}>
        <Button className="pt-minimal out-icon" iconName={IconClasses.CHEVRON_RIGHT} />
        {output.value}
      </div>
    </div>
  )

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
    }, 'syntax-highlighter')
  }

  render() {
    const { outputs } = this.props
    const ref = (instance: React.ReactInstance) => this.outputs.push(instance)
    const outputComponents = outputs.map(
       (output, idx) => <Output output={output} key={idx} refFn={ref} />)
    return (
      <div className="sa-interpreter">
        {outputComponents}
      </div>
    )
  }
}

export default Interpreter
