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

type InputProps = {
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

const Input: React.StatelessComponent<InputProps> =
  ({ refFn }) => (
    <div className="input">
       <Button className="pt-minimal in-icon" iconName={IconClasses.CODE} />
       <div ref={refFn} className="input-editor" />
    </div>
  )

class Interpreter extends React.Component<Props, void> {
  hjs: any
  outputs: React.ReactInstance[] = []
  input: React.ReactInstance

  componentDidMount() {
    require.ensure([], () => {
      require('brace')
      require('brace/theme/tomorrow')
      require('brace/mode/javascript')

      const hjs = require('highlight.js/lib/highlight')
      const javascript = require('highlight.js/lib/languages/javascript')

      require('highlight.js/styles/tomorrow.css')
      hjs.registerLanguage('javascript', javascript)

      this.hjs = hjs
      this.setupInputEditor()
      this.highlightOutputCodes()
    }, 'interpreter')
  }

  componentDidUpdate() {
    this.highlightOutputCodes()
  }

  setupInputEditor() {
    const $input = findDOMNode(this.input) as HTMLElement
    const editor = ace.edit($input)
    editor.setTheme('ace/theme/tomorrow')
    editor.session.setMode('ace/mode/javascript')
    editor.$blockScrolling = Infinity
    editor.renderer.setShowGutter(false)
  }

  highlightOutputCodes() {
    this.outputs.forEach(i => {
      const el = findDOMNode(i)
      if (this.hjs) {
        this.hjs.highlightBlock(el)
      }
    })
  }

  render() {
    const { outputs } = this.props
    const outputRef = (instance: React.ReactInstance) => this.outputs.push(instance)
    const inputRef = (instance: React.ReactInstance) => this.input = instance
    const outputComponents = outputs.map(
       (output, idx) => <Output output={output} key={idx} refFn={outputRef} />)
    const handleSubmit = (code: string) => {
      return
    }
    return (
      <div className="sa-interpreter">
        {outputComponents}
        <Input refFn={inputRef} />
      </div>
    )
  }
}

export default Interpreter
