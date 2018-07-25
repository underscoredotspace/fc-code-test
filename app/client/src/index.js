import XMLDropBox from './XMLDropBox'

new XMLDropBox(document.querySelector('.xml-dropbox'), handleXMLPost)

function handleXMLPost(fileName, fileData) {
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
