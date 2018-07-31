import React, { Component } from 'react'
import socketio from 'socket.io-client'

export default class UploadList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      list: []
    }

    const io = socketio()

    const { list } = this.state
    io.on('new-upload', data => {
      list.push(data)
      this.setState({ list })
    })
  }

  render() {
    return (
      <ul>
        {this.state.list.map(li => {
          return <li>{`${li.id}, ${li.fileName}`}</li>
        })}
      </ul>
    )
  }
}
