import React, { Component } from 'react'
import FileDropBox from './components/FileDropBox'
import UploadList from './components/UploadList'
import ReturnedDDList from './components/ReturnedDDList'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loaded: false,
      files: [],
      returnedDDs: []
    }

    fetch('/file/all')
      .then(res => res.json())
      .then(allFiles => {
        const files = allFiles.map(file => {
          const { fileName, date } = file
          return { id: file._id, fileName, date }
        })

        this.setState({ files, loaded: true })
      })
  }

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

  loadFile =(id) =>{
    fetch(`/file/${id}`)
      .then(res => res.json())
      .then(json => {
        this.setState({returnedDDs: [json]})
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
        {this.state.loaded ? (
          <UploadList files={this.state.files} loadFile={this.loadFile} />
        ) : null}
        <ReturnedDDList items={this.state.returnedDDs} />
      </div>
    )
  }
}
