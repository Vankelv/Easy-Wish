 const express = require('express');
 const app = express();
 const cors = require('cors');
 const db = require('./db');
 const wishesRoute = require('./routes/wishes.js')


 app.use(cors());
 app.use(express.json());
 app.use('/wish', wishesRoute);


 app.get('/', (req, res) => {
    res.send("Welcome to Wish Hub backend");
 })

 app.listen(8080, () => {
    console.log("server start on port: 8080")
 })