## Instructions for installing and running development environment:

- clone this repository
- `cd` to local repository folder
- `npm i` to install dependencies
- create `.env` file with:
  ```
  MONGODB_ADDR="db_connection_uri"
  MONGDB_NAME="your_db_name"
  ```
  see [MongoDB Connection URI](https://docs.mongodb.com/manual/reference/connection-string/) documentation
- `npm start`
- open your browser of choice at [http://localhost:3000](http://localhost:3000)
