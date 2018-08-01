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

## Implementation

The full application is JavaScript, with Node + Express on the backend and React on frontend. I have kept dependencies to a minimum, while utilising tried and tested libraries where required: 

- Moment.js + React Moment: time can be messy in JS. 
- xml2js: first time I've used this library. It has an active GitHub and many users. 

The build is completed with Parcel. I generally choose this for my own projects because it's easy to configure and it comes with SASS + Babel. 