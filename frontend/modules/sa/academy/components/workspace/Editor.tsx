import * as React from 'react'
import { findDOMNode } from 'react-dom'

export type Props = {
}

export type State = {
  editor: AceAjax.Editor | null,
}

class Editor extends React.Component<Props, State> {
  editor: React.ReactInstance

  state: State = {
    editor: null,
  }

  componentDidMount() {
    console.log('editor did mount')
    require.ensure([], (require) => {
      require('brace')
      const editor = ace.edit(findDOMNode(this.editor) as HTMLElement)
      this.setState({ editor })
    })
  }

  componentWillUnmount() {
    console.log('editor will unmount')
    if (this.state.editor) {
      this.state.editor.destroy()
    }
    this.setState({ editor: null })
  }

  render() {
    const editorRef = (editor: React.ReactInstance) => this.editor = editor
    return (<div ref={editorRef} className="sa-editor" />)
  }
}

export default Editor
