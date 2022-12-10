const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment.model");
const User = require("../models/User.model");
const Song = require("../models/Song.model")


// ============ CREATE A COMMENT OF A SONG ============

// router.post("/create", (req, res, next) => {
//     const theSongComment = {
//         theComments: req.body.theComments,
//     };

//     Comment.create(theSongComment)
//     .then((newComment) => {
//         res.json(newComment);
//         console.log('NEW COMMENT -->', newComment);
//     })
//     .catch((err) => {
//         res.json(err);
//         console.log(err);
//     });
// });


// ============= Delete 2 =============

router.post("/:songId/add-comment", (req, res, next) => {
    const theSongComment = {
        theComments: req.body.theComments,
    };

    Comment.create(theSongComment)
    .then((newComment) => {
        res.json(newComment);
        console.log('NEW COMMENT -->', newComment);
    })
    .then(() => {
        Song.findByIdAndUpdate(req.params.songId, {
            $push: {comments: songId}
        })
    })
    .catch((err) => {
        res.json(err);
        console.log(err);
    });
});

// ============= Delete 3 =============

// router.post('/add-comment', (req, res ,next) => {
//     Song.findById(req.params.songId)
//     .then((theSong) => {

//         const theSongComment = {
//             theComments: req.body.theComments,
//             songs: theSong,
//         }
        
//         console.log({body: req.body, theSongComment});
        
//         Comment.create(theSongComment)
//         .then((newComment) => {
//             console.log('NEW COMMENT IN COMMENT MODEL --->', newComment);
//             Song.findByIdAndUpdate(req.body.songId, {
//                 $push: {comments: newComment}
//             })
//             .then((theSongComment) => {
//                 res.json(theSongComment);
//                 console.log('THE COMMENT REF IN SONG MODEL-->', theSongComment);
//             })
//             .catch((err) => {
//                 res.json(err)
//             });
//         })
//         .catch((err) => {console.log(err)})
//     })
// });


// ============ READ LIST OF COMMENTS ============

router.get("/comments", (req, res, next) => {
    Comment.find()
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