const express = require("express");
const cors = require("cors");

const dbConnection = require('./config/connection.js');

const app = express();
const port = 9001;

app.use(express.json());
app.use(express.urlencoded({extened:  true}))
app.use(cors());

app.use('/', require('./routes'));


dbConnection.once('open', () =>{
    app.listen(port, ()=> {
        console.log(`listening on port ${port}`)
        console.log('DB listening on ', dbConnection._connectionString)
    });
});