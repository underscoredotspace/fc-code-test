import React, { Component } from 'react'
import socketio from 'socket.io-client'
import UploadListItem from './UploadListItem'

export default class UploadList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      list: this.props.files
    }

    const io = socketio()

    const { list } = this.state
    io.on('new-upload', data => {
      list.push(Object.assign({ success: true }, data))
      this.setState({ list })
    })

    io.on('failed-upload', data => {
      list.push(Object.assign({ success: false }, data))
      this.setState({ list })
    })
  }

  select = (e, id) => {
    e.preventDefault()
    this.props.loadFile(id)
  }

  render() {
    return (
      <ul className="upload-list">
        {this.state.list.map(li => (
          <UploadListItem key={li.id} {...li} select={this.select} />
        ))}
      </ul>
    )
  }
}
