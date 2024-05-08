const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const dbURI = process.env.MONGODB_URI;
const dbName = process.env.DB_Name;

mongoose.connect(dbURI, {
  dbName: dbName,
})
.then(() => console.log(`Connected to database: ${dbName}`))
.catch(error => console.error('Error connecting to the database:', error));

module.exports = mongoose;
