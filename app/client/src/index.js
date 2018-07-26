import FileDropBox from './FileDropBox'

new FileDropBox(
  document.querySelector('.xml-dropbox'),
  ['text/xml'],
  doXMLPost,
  handleXMLPostComplete
)

function doXMLPost(fileName, fileData) {
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/xml'
    },
    body: fileData
  }
  return fetch('/xml-to-json', options)
    .then(res => res.json())
    .then(json => ({ fileName, json }))
}

function handleXMLPostComplete(responses) {
  console.log(responses)
}
