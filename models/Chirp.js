const mongoose = require('mongoose');

// Create Schema 
var chirps = new mongoose.Schema({
    id: Number,
    text: String, 
    upvote: Number,
});

var Chirp = mongoose.model('Chirp', chirps);

module.exports = Chirp = mongoose.model('Chirp', chirps);
