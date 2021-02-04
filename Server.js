const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// API
const actionChirps = require('./routes/api/actionChirps');

const app = express();

// Middleware
// Bodyparser Middleware
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json());
app.use(cors());

// connect to mlab database
mongoose.connect('mongodb://localhost/chirps', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('connected to database'))
.catch(err => console.log(err));

// Use Routes
app.use('/api/actionChirps', actionChirps);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log('now listening for requests on port: 4000');
})
