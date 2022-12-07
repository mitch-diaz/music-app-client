const express = require("express");
const router = express.Router();
const Song = require("../models/Song.model");
const User = require("../models/User.model");
const Comment = require("../models/Comment.model");



// ============ CREATE A SONG ============
// create route good ✅
// 👉 needs Cloudinary for file upload

router.post('/add-song', (req, res ,next) => {
    console.log(req.body);
    User.findById(req.session.currentlyLoggedIn._id)
    .then((theUser) => {

        const songToCreate = {
            songTitle: req.body.songTitle,
            user: theUser
        }
        
        console.log({body: req.body, songToCreate});
        
        Song.create(songToCreate)
        .then((newlyCreatedSong) => {
            console.log('NEW SONG --->', newlyCreatedSong)
            User.findByIdAndUpdate(req.session.currentlyLoggedIn._id, {
                $push: {songs: newlyCreatedSong}
            })
            .then((theUserSongList) => {
                res.json(theUserSongList)
            })
            .catch((err) => {
                res.json(err)
            });
        })
        .catch((err) => {console.log(err)})
    })
    
});


// ============ READ A LIST OF SONGS ✅ ============

router.get("/songs-list", (req, res, next) => {
    Song.find()
	.then((theSongs) => {
        res.json(theSongs);
	})
	.catch((err) => {
        res.json(err);
	});
});


// ============ DISPLAY ONE SONG ============
// 👉 .populate() user?, comments?

router.get("/:songId", (req, res, next) => {
	Song.findById(req.params.songId)
		.then((songFromDb) => {
			res.json(songFromDb);
		})
		.catch((err) => {
			res.json(err);
		});
});


// ============ UPDATE A SONG (song title) ============

router.put('/', (req, res) => {
    Song.findByIdAndUpdate(req.body.song_id, req.body, {new: true})
    .then(res => {
        res.json({success: true, res});
    }).catch(err => {
        res.json({success: false, res: err});
    })
});


// ============ DELETE A SONG ============
// 👉 delte associated comments as well






module.exports = router;
