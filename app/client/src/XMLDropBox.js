export default class XMLDropBox {
  constructor(target, handleFile) {
    this.dropbox = target
    this.handleFile = handleFile
    this.active = false
    if (!this.dropbox) throw new Error('target element must exist')

    this.drop = this.drop.bind(this)
    this.dragEnter = this.dragEnter.bind(this)
    this.dragLeave = this.dragLeave.bind(this)

    this.dropbox.addEventListener('dragenter', this.dragEnter, false)
    this.dropbox.addEventListener('dragover', this.dragEnter, false)
    this.dropbox.addEventListener('dragleave', this.dragLeave, false)
    this.dropbox.addEventListener('drop', this.drop, false)
  }

  dragEnter(event) {
    this.dragPreventDefault(event)
    if (this.active) return
    this.dropbox.classList.add('active')
    this.active = true
  }

  dragLeave(event) {
    this.dragPreventDefault(event)
    if (!this.active) return
    this.dropbox.classList.remove('active')
    this.active = false
  }

  dragPreventDefault(event) {
    event.preventDefault()
    event.stopPropagation()
  }

  drop(event) {
    this.dragPreventDefault(event)
    if (!this.active) return
    this.dropbox.classList.remove('active')
    this.active = false

    const dataTransfer = event.dataTransfer
    const files = dataTransfer.files

    this.handleFileUpload(files)
  }

  handleFileUpload(files) {
    const filesArray = Array.from(files).filter(
      file => file.type === 'text/xml'
    )

    const requests = filesArray.map(file => {
      return new Promise(resolve => {
        const reader = new FileReader()

        reader.onload = (file => event => {
          const xml = event.target.result
          resolve(this.handleFile(file.name, xml))
        })(file)

        reader.readAsText(file)
      })
    })

    Promise.all(requests).then(res => {
      console.log(res)
    })
  }
}
