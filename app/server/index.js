const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const parseString = require('xml2js').parseString

app.use(express.static('dist/'))

const xmlBodyParser = bodyParser.text({ type: 'application/xml' })
app.post('/xml-to-json', xmlBodyParser, (req, res) => {
  parseString(req.body, { mergeAttrs: true }, (error, json) => {
    if (error) {
      return res.status(500).send(error.toString())
    }

    // artificial delay
    setTimeout(() => {
      res.status(200).json(json)
    }, Math.random() * 1500)
  })
})

app.listen(3000, () => {
  console.log('App running at http://localhost:3000')
})
