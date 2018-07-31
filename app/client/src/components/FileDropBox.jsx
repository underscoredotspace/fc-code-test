import React, { Component } from 'react'

export default class FileDropBox extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active: false
    }
  }

  dragEnterOver = event => {
    this.dragPreventDefault(event)
    this.setState({ active: true })
  }

  dragLeave = event => {
    this.dragPreventDefault(event)
    this.setState({ active: false })
  }

  dragPreventDefault = event => {
    event.preventDefault()
    event.stopPropagation()
  }

  drop = event => {
    this.dragPreventDefault(event)
    this.setState({ active: false })

    const dataTransfer = event.dataTransfer
    const files = dataTransfer.files

    console.log(`${files.length} files dropped`)
    this.doDropAction(files)
  }

  doDropAction = files => {
    const filesArray = Array.from(files).filter(file =>
      this.props.filter.includes(file.type)
    )

    const requests = filesArray.map(file => {
      return new Promise(resolve => {
        const reader = new FileReader()

        reader.onload = (file => event => {
          const xml = event.target.result
          resolve(this.props.dropAction(file.name, xml))
        })(file)

        reader.readAsText(file)
      })
    })

    Promise.all(requests).then(res => {
      this.props.dropComplete(res)
    })
  }

  render() {
    return (
      <div
        onDragEnter={this.dragEnterOver}
        onDragOver={this.dragEnterOver}
        onDragLeave={this.dragLeave}
        onDrop={this.drop}
        className={`xml-dropbox ${this.state.active ? 'active' : ''}`}
      >
        Drop files here
      </div>
    )
  }
}
