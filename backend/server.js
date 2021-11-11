const express = require("express");
const cors = require("cors");
const { Hotel, Reservation, User } = require("./models");
require('dotenv').config();
const dbConnection = require('./config/connection.js');


const app = express();
const port = process.env.PORT || 9001;

app.use(express.json());
app.use(express.urlencoded({extened:  true}))
app.use(cors());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
  }

app.use('/', require('./routes'));


dbConnection.once('open', () =>{
    app.listen(port, ()=> {
        console.log(`listening on port ${port}`)
        console.log('DB listening on ', dbConnection._connectionString)

    });

});