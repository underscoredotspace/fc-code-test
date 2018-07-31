import React, { Component } from 'react'
import FileDropBox from './components/FileDropBox'
import UploadList from './components/UploadList'

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
    return fetch(`/${fileName}`, options).then(() => {
      console.log(`File ${fileName} action complete`)
      return { fileName }
    })
  }

  handleXMLPostComplete(responses) {
    console.log(`${responses.length} files uploaded`)
  }

  loadFile(id) {
    fetch(`/file/${id}`)
      .then(res => res.json())
      .then(json => {
        console.log(json)
      })
  }

  render() {
    return (
      <div>
        <FileDropBox
          filter={['text/xml']}
          dropAction={this.doXMLPost}
          dropComplete={this.handleXMLPostComplete}
        />
        <UploadList loadFile={this.loadFile} />
      </div>
    )
  }
}
