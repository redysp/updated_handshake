const express = require('express');
const router = express.Router();
const fetch = require('node-fetch'); 

// Chirp Model
const Chirp = require('../../models/Chirp');

router.get('/', (req, res) => {
    Chirp.find()
        .sort({ id: -1 })
        .then(chirps => res.json(chirps));
});

// Posts chirps to database

router.post('/addChirp', (req, res) => {
    Chirp.countDocuments({}, function(err, count){
        var newChirp = new Chirp({id: count, text: req.body.text, upvote: 0});
        var payload = {chirp_id: count}; 
        newChirp.save(function (err) {
            if (err) return (err); 
        });

        // Makes request to external API 

        fetch("https://bellbird.joinhandshake-internal.com/push", {
            method: 'post',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' }
        }).then(data => console.log(data))
        .catch(err => console.log("$$", err));
    }); 
});

// Add upvote to database

router.post('/upVote', async (req, res) => {
    var id = req.body.id
    var updatedChirp = await Chirp.findOne({id: id}); 
    console.log(updatedChirp.upvote); 
    updatedChirp.upvote = updatedChirp.upvote + 1
    await updatedChirp.save()
}); 

module.exports = router;

