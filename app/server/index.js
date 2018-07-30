const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const parseString = require('xml2js').parseString
const mongodb = require('./db')

app.use(express.static('dist/'))

const xmlBodyParser = bodyParser.text({ type: 'application/xml' })
app.post('/xml-to-json', xmlBodyParser, (req, res) => {
  parseString(req.body, { mergeAttrs: true }, (error, ddReturnJson) => {
    if (error) {
      return res.status(500).send(error.toString())
    }

    mongodb((error, db) => {
      if (error) throw new Error(`mongodb: ${error}`)

      db.collection('dd-returns')
        .insertOne(ddReturnJson)
        .then(records => {
          console.log(records.insertedId)
        })
        .catch(error => {
          throw error
        })
    })

    // artificial delay of 0 to 1.5s
    setTimeout(() => {
      res.status(200).json(ddReturnJson)
    }, Math.random() * 1500)
  })
})

app.listen(3000, () => {
  console.log('App running at http://localhost:3000')
})
