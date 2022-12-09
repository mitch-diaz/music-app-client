const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment.model");
const User = require("../models/User.model");
const Song = require("../models/Song.model")


// ============ CREATE A COMMENT OF A SONG ============

router.post('/create', (req, res ,next) => {
    Song.findById(req.session._id)
    .then((theUser) => {

        const theSongComment = {
            reply: req.body.reply, //comment model
            comments: req.body.comments, //song model
            user: theUser //user model
        }
        
        console.log({body: req.body, songToCreate});
        
        Comment.create(commentToCreate)
        .then((newlyMadeComment) => {
            console.log('NEW SONG-REPLY --->', newlyMadeComment)
            User.findByIdAndUpdate(req.session.currentlyLoggedIn._id, {
                $push: {comments: newlyMadeComment}
            })
            .then((theUserComment) => {
                res.json(theUserComment)
            })
            .catch((err) => {
                res.json(err)
            });
        })
        .catch((err) => {console.log(err)})
    })
});


// ============ READ LIST OF COMMENTS ============

router.get("/comments", (req, res, next) => {
    Comment.find()
    .populate('user')
    .populate('song')
	.then((response) => {
        res.json(response);
	})
	.catch((err) => {
        console.log(err)
        res.json(err);
	});
});


// ============ EDIT COMMENT ============



// ============ DELETE COMMENT ============
// ❗️👉 This route should...
// 1) delete comment from comment model
// 2) delete the comment ref from the song model it was made for
// 3) delete the comment ref from the user model

router.delete("/delete", (req, res, next)=>{
    Comment.findByIdAndDelete(req.body._id)
    .then(() => {
        res.json({success: true, response: `${req.body._id} comment has been deleted`});
    })
    .catch((err)=>{
        res.json(err);
    })
});





module.exports = router;