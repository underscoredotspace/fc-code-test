import XMLDropBox from './XMLDropBox'

new XMLDropBox(document.querySelector('.xml-dropbox'), handleXMLPost)

function handleXMLPost(fileName, fileData) {
  console.log(fileName, fileData.length)
}
