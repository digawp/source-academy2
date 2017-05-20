import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { Button, IconClasses } from '@blueprintjs/core'

export type Props = {
  resource: number
  initialValue: string
  editorTheme: 'github' | 'tomorrow_night',
  editorFontSize: number

  increaseEditorFontSize(): void,
  decreaseEditorFontSize(): void,
  toggleLightDarkTheme(): void,
  onCodeChange(code: string): void,
}

export type State = {
  editor: AceAjax.Editor | null,
  changeHandler: (() => void) | null,
}

class Editor extends React.Component<Props, State> {
  editor: React.ReactInstance

  silent: boolean

  state: State = {
    editor: null,
    changeHandler: null,
  }

  componentWillReceiveProps(nextProps: Props) {
    const editor = this.state.editor
    if (editor) {
      if (nextProps.resource !== this.props.resource) {
        this.silent = true
        editor.setValue(nextProps.initialValue)
        this.silent = false
        this.setChangeHandler(editor)
      }
      if (nextProps.editorTheme !== this.props.editorTheme) {
        editor.setTheme(`ace/theme/${nextProps.editorTheme}`)
      }
      if (nextProps.editorFontSize !== this.props.editorFontSize) {
        editor.setFontSize(`${nextProps.editorFontSize}px`)
      }
    }
  }

  setChangeHandler(editor: AceAjax.Editor) {
    if (this.state.changeHandler) {
      (editor.session as any).off('change', this.state.changeHandler)
    }
    const changeHandler = () => {
      if (!this.silent) {
        this.props.onCodeChange(editor.getValue())
      }
    }
    editor.session.on('change', changeHandler)
    this.setState({
      editor,
      changeHandler,
    })
  }

  componentDidMount() {
    require.ensure([], (require) => {
      require('brace')
      require('brace/mode/javascript')
      require('brace/theme/tomorrow_night')
      require('brace/theme/github')

      const editor = ace.edit(findDOMNode(this.editor) as HTMLElement)
      editor.session.setMode('ace/mode/javascript')
      editor.setTheme(`ace/theme/${this.props.editorTheme}`)
      editor.setFontSize(`${this.props.editorFontSize}px`)
      editor.setValue(this.props.initialValue)
      editor.$blockScrolling = Infinity
      this.setChangeHandler(editor)
    })
  }

  componentWillUnmount() {
    if (this.state.editor) {
      this.state.editor.destroy()
    }
    this.setState({ editor: null })
  }

  render() {
    const {
      increaseEditorFontSize,
      decreaseEditorFontSize,
      toggleLightDarkTheme,
    } = this.props

    const editorRef = (editor: React.ReactInstance) => this.editor = editor
    const toolbar = (
      <div className="editor-toolbar pt-button-group pt-minimal">
        <Button iconName={IconClasses.PLAY} >Run</Button>
        <Button iconName={IconClasses.CODE_BLOCK}>Test</Button>
        <Button iconName={IconClasses.ZOOM_IN} onClick={increaseEditorFontSize} />
        <Button iconName={IconClasses.ZOOM_OUT} onClick={decreaseEditorFontSize} />
        <Button iconName={IconClasses.MOON} onClick={toggleLightDarkTheme} />
      </div>
    )
    return (
      <div className="col-xs-12 sa-editor-container">
        <div className="row">
          {toolbar}
        </div>
        <div ref={editorRef} className="sa-editor" />
      </div>
    )
  }
}

export default Editor
