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
    console.log('entered')
  }

  dragLeave(event) {
    this.dragPreventDefault(event)
    if (!this.active) return
    this.dropbox.classList.remove('active')
    this.active = false
    console.log('left with no drop')
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
    console.log('left with drop')

    const dataTransfer = event.dataTransfer
    const files = dataTransfer.files

    this.handleFileUpload(files)
  }

  handleFileUpload(files) {
    for (const file of files) {
      if (file.type !== 'text/xml') continue

      const reader = new FileReader()

      reader.onload = (file => event => {
        const xml = event.target.result
        this.handleFile(file.name, xml)
      })(file)

      reader.readAsText(file)
    }
  }
}
