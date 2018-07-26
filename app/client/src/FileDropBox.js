export default class FileDropBox {
  constructor(target, fileTypes, doFileAction, handleFileActionComplete) {
    this.dropbox = target
    if (!this.dropbox) throw new Error('target element must exist')
    this.fileTypes = fileTypes
    this.doFileAction = doFileAction
    this.handleFileActionComplete = handleFileActionComplete

    this.active = false

    this.dropbox.addEventListener('dragenter', this.dragEnterOver, false)
    this.dropbox.addEventListener('dragover', this.dragEnterOver, false)
    this.dropbox.addEventListener('dragleave', this.dragLeave, false)
    this.dropbox.addEventListener('drop', this.drop, false)
  }

  dragEnterOver = event => {
    this.dragPreventDefault(event)
    if (this.active) return
    this.dropbox.classList.add('active')
    this.active = true
  }

  dragLeave = event => {
    this.dragPreventDefault(event)
    if (!this.active) return
    this.dropbox.classList.remove('active')
    this.active = false
  }

  dragPreventDefault = event => {
    event.preventDefault()
    event.stopPropagation()
  }

  drop = event => {
    this.dragPreventDefault(event)
    if (!this.active) return
    this.dropbox.classList.remove('active')
    this.active = false

    const dataTransfer = event.dataTransfer
    const files = dataTransfer.files

    this.handleFileUpload(files)
  }

  handleFileUpload = files => {
    const filesArray = Array.from(files).filter(file =>
      this.fileTypes.includes(file.type)
    )

    const requests = filesArray.map(file => {
      return new Promise(resolve => {
        const reader = new FileReader()

        reader.onload = (file => event => {
          const xml = event.target.result
          resolve(this.doFileAction(file.name, xml))
        })(file)

        reader.readAsText(file)
      })
    })

    Promise.all(requests).then(this.handleFileActionComplete)
  }
}
