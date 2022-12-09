const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Comment = require("../models/Comment.model")
const Song = require("../models/Song.model")
const bcryptjs = require('bcryptjs');


// =============== ✅ SIGNUP ===============

router.post('/signup', (req, res, next)=>{
  const saltRounds = 12;
  bcryptjs
  .genSalt(saltRounds)
  .then(salt => bcryptjs.hash(req.body.password, salt))
  .then(hashedPassword => {
    User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hashedPassword,
      email: req.body.email,
    })
    .then((newUser)=>{
      res.json({message: "Successfully signed up new account"});
    })
    .catch((err)=>{
      res.json(err)
    })
  })
});


// ============= ✅ LOGIN =============

router.post('/login', (req, res, next) => {
  if (req.body.email === '' || req.body.password === '') {
    res.json({error: "fields cannot be left blank"})
    return;
  }
 
  User.findOne({ email: req.body.email })
    .then(resultFromDB => {
      if (!resultFromDB) {
        res.json({error: "Your email or password is not correct"});
        return;
      } else if (bcryptjs.compareSync(req.body.password, resultFromDB.password)) {
        req.session.currentlyLoggedIn = resultFromDB;
        res.json({message: "Successfully logged in"});
        return;
      } else {
        res.json({error: "Your email or password is not correct"});
      }
    })
    .catch(error => console.log(error));
});


function serializeTheUserObject(userObj){
  let result = {};
  // ❗️ if(userObj.username) result.username = userObj.username;
  if(userObj.email) result.email = userObj.email;
  return result;
}

// ---> 👇 .populate() ? <---
router.get('/serializeuser', (req, res, next)=>{
  console.log(req.session);
  console.log(req.session.currentlyLoggedIn);

  if(!req.session.currentlyLoggedIn) res.json(null);

  User.findById(req.session.currentlyLoggedIn._id)
  .populate('songs')
  .populate('comments')
  .then((theUser)=>{
    res.json(serializeTheUserObject(theUser))
  })
  .catch((err)=>{
    console.log(err)
  })
})


// ============= ✅ LOGOUT =============

router.post('/logout', (req, res, next) =>{
  req.session.destroy(err => {
    if (err) console.log(err);
    res.json({message: "successfully logged out"});
  });
})


// ============ ✅ USER PROFILE PAGE ============

router.get('/user-profile', (req, res, next) => {
  User.findById(req.session.currentlyLoggedIn._id)
  .populate('songs')
  .populate('comments')
  .then(theUser => {
      console.log('The User Profile--->', theUser);
      res.json(theUser);
  })
  .catch(err => {
      console.log({err});
  })
})


// router.get('/user-profile/:userId', (req, res, next) => {
//   User.findById(req.params.userId)
//   .populate('songs')
//   .populate('comments')
//   .then(theUser => {
//       console.log('The User Profile--->', theUser);
//       res.json(theUser);
//   })
//   .catch(err => {
//       console.log({err});
//   })
// })


// ============ ❗️ UPDATE USER PROFILE ❗️ =============

// Is this GET route neccessary?

router.put('/update/:userId', (req, res, next) => {
  User.findById(req.params.id)
  .populate('songs')
  .populate('comments')
  .then((theUser) => {
      console.log('User profile to update---> ', theUser);
      res.json(theUser);
  })
  .catch((err) => {
    console.log({err});
  })
})

router.put('/update/:id', (req, res, next) => {
  
  // const userToUpdate = {
  //     email: req.body.email,
  //     creatorTitle: req.body.creatorTitle,
  //     creatorProfile: req.body.creatorProfile,
  //     profilePic: req.body.profilePic
  // }

  User.findByIdAndUpdate(req.params.id, {
      email: req.body.email,
      creatorTitle: req.body.creatorTitle,
      creatorProfile: req.body.creatorProfile,
      profilePic: req.body.profilePic
  })
  .then(theUpdatedUser => {
      console.log('The Updated User--->', response);
      res.json(response);
  }).catch(err => {
      console.log(err);
  })
})


// ============ ❗️ DELETE USER PROFILE/ACCT ❗️ =============

router.delete('/', (req, res) => {
    User.findByIdAndDelete(req.body.userId)
    .then((deletedUser) => {
        res.json({success: true, res: `The account for ${req.body.firstName} ${req.body.lastName} has been deleted!`});
        console.log('DELETED USER -->', deletedUser);
    }).catch(err => {
        res.json({success: false, res: err});
    })
});


module.exports = router;