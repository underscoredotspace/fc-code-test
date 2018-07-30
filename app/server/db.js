const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
const dbAddr = process.env.MONGODB_ADDR
const dbName = process.env.MONGODB_DBNAME

if (!dbAddr) throw new Error('Environment variable MONGODB_ADDR required')

const state = {
  db: null
}

module.exports = function mongodb(cb) {
  if (state.db) return cb(null, state.db)

  MongoClient.connect(
    dbAddr,
    { useNewUrlParser: true },
    (error, client) => {
      const db = client.db(dbName)
      state.db = db
      return cb(error, state.db)
    }
  )
}
