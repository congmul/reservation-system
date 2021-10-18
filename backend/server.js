const express = require("express");
const cors = require("cors");

const app = express();
const port = 9001;

app.use(express.json());
app.use(express.urlencoded({extened:  true}))
app.use(cors());

// app.use('/movies', require('./routes/movie'));

// app.get('/', (req, res) => {
//     res.send("Hollo world!");
// })

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});