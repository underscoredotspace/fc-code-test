const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
const dbAddr = process.env.MONGODB_ADDR
const dbName = process.env.MONGODB_NAME

if (!dbAddr || !dbName)
  throw new Error('Environment variables MONGODB_ADDR + MONGODB_NAME required')

const state = {
  db: null
}

connect((error, db) => {
  if (error) {
    throw new Error(error)
  }

  console.info(`mongo connected to '${db.databaseName}'`)
})

function connect(cb = () => {}) {
  MongoClient.connect(
    dbAddr,
    { useNewUrlParser: true },
    (error, client) => {
      if (error) return cb(error)

      const db = client.db(dbName)
      state.db = db

      return cb(null, state.db)
    }
  )
}

module.exports = function mongodb(cb) {
  if (state.db) return cb(null, state.db)

  connect(cb)
}
