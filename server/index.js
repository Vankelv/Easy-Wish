 const express = require('express');
 const app = express();
 const cors = require('cors');
 const db = require('./db');
 const wishesRoute = require('./routes/wishes.js')
 const uploadRoute = require('./controllers/routeUpload.js');

 const corsOptions = {
   origin: '*',
   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
   preflightContinue: false,
   optionsSuccessStatus: 204,
   credentials: true
 };
 
 app.use(cors(corsOptions));

 app.use(express.json());
 app.use('/wish', wishesRoute);
 app.use("/api/users" , uploadRoute);


 app.get('/', (req, res) => {
    res.send("Welcome to Wish Hub backend");
 })

 app.listen(8080, () => {
    console.log("server start on port: 8080")
 })