import React, { Component } from 'react'
import FileDropBox from './FileDropBox'

export default class App extends Component {
  doXMLPost(fileName, fileData) {
    console.log(`File ${fileName} action initiated`)
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/xml'
      },
      body: fileData
    }
    return fetch('/xml-to-json', options)
      .then(res => res.json())
      .then(json => {
        console.log(`File ${fileName} action complete`)
        return { fileName, json }
      })
  }

  handleXMLPostComplete(responses) {
    console.log(`${responses.length} files uploaded`)
  }

  render() {
    return (
      <div>
        <FileDropBox
          filter={['text/xml']}
          dropAction={this.doXMLPost}
          dropComplete={this.handleXMLPostComplete}
        />
      </div>
    )
  }
}
