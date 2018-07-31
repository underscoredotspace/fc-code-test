const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const bodyParser = require('body-parser')
const parseString = require('xml2js').parseString
const mongodb = require('./db')
const oid = require('mongodb').ObjectID

io.on('connection', socket => {
  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`)
  })
  console.log(`Socket ${socket.id} connected`)
})

app.use(express.static('dist/'))

const xmlBodyParser = bodyParser.text({ type: 'application/xml' })
app.post('/:filename', xmlBodyParser, (req, res) => {
  parseString(req.body, { mergeAttrs: true }, (error, ddReturnJson) => {
    if (error) {
      return res.status(500).send(error.toString())
    }

    const fileName = req.params.filename

    mongodb((error, db) => {
      if (error) throw new Error(error)

      const record = Object.assign(
        {
          date: new Date().valueOf(),
          fileName
        },
        ddReturnJson
      )

      db.collection('dd-returns')
        .insertOne(record)
        .then(records => {
          io.emit('new-upload', {
            fileName,
            date: record.date,
            id: records.insertedId
          })
        })
        .catch(error => {
          io.emit('failed-upload', {
            fileName: req.params.filename,
            error
          })
        })
    })

    res.sendStatus(200)
  })
})

app.get('/file/:id', (req, res) => {
  mongodb((error, db) => {
    db.collection('dd-returns')
      .findOne({ _id: oid(req.params.id) })
      .then(result => {
        res.json(result)
      })
  })
})

server.listen(3000, () => {
  console.log('App running at http://localhost:3000')
})
