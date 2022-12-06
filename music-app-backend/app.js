require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require("cookie-parser");



// ====== CONNECTION to DB ======
mongoose
  .connect('mongodb://localhost/expressApp')
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));


// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// ========== MIDDLEWARE =============
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('public'));
// ^ this is the line that tells our app to look inside the public folder for all static assets like images or css files 



app.use(
  session({
    secret: '123secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 600000
    }, // ADDED code below !!!
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost/music-app-backend'
    })
  })
);

app.use(cookieParser());


// =================== ROUTES ====================

const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);



require("./error-handling")(app);

module.exports = app;
