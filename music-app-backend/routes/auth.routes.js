const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Song = require("../models/Song.model")
const bcryptjs = require('bcryptjs');


// =============== SIGNUP ===============

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


// ============= LOGIN =============

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

// ❗️👇 Fix .populate() for my user model 👇❗️
router.get('/serializeuser', (req, res, next)=>{
  console.log(req.session);
  console.log(req.session.currentlyLoggedIn);

  if(!req.session.currentlyLoggedIn) res.json(null);

  User.findById(req.session.currentlyLoggedIn._id).populate('songs')
  .then((theUser)=>{
    res.json(serializeTheUserObject(theUser))
  })
  .catch((err)=>{
    console.log(err)
  })
})


// ============= LOGOUT =============

router.post('/logout', (req, res, next) =>{
  req.session.destroy(err => {
    if (err) console.log(err);
    res.json({message: "successfully logged out"});
  });
})


// ============ ❗️ USER PROFILE PAGE ❗️ ============

router.get('/user-profile', (req, res, next) => {
  User.findById(req.session.currentlyLoggedIn)
  .populate('songs')
  .then(movieFromDb => {
      console.log('The clicked on movie: ', movieFromDb);
      res.json('movies/movie-details', movieFromDb);
  })
  .catch(error => {
      console.log({error});
  })
})


// ============ ❗️ UPDATE USER PROFILE ❗️ =============

router.get('/movies/:id/edit', (req, res, next) => {
    
  Movie.findById(req.params.id)
  .then((movieFromDb) => {
      console.log('Update movie: ', movieFromDb);
      Celebrity.find(req.params.celebsFromDb)
      .then((celebsFromDb)=>{
          console.log('Update celeb: ', celebsFromDb);
          res.render('movies/edit-movie', movieFromDb)
      })
  })
})

router.post('/movies/:id', (req, res, next)=>{
  const movieToUpdate = {
      title: req.body.title,
      genre: req.body.genre,
      plot: req.body.plot,
      cast: req.body.cast
  }

  Movie.findByIdAndUpdate(req.params.id, movieToUpdate)
  .then(theUpdatedMovie => {
      console.log('The Edit: ', theUpdatedMovie);
      res.redirect(`/movies/${theUpdatedMovie.id}`);
  }).catch(error => {
      console.log({error});
  })
})


module.exports = router;