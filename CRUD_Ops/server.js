// Load environment variables
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

// Core dependencies
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");

// Database
const mongoDB = require("./src/data/database");

// Authentication
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

// Routes
const routes = require("./src/routes/");

// Initialize Express
const app = express();
const port = process.env.PORT || 3001;

/* ============================
   Middleware
============================ */

// Parse JSON requests
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session management
app.use(
  session({
    secret: "secret", // consider using env variable for security
    resave: false,
    saveUninitialized: true,
  })
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// CORS headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Accept, Content-Type, Z-Key, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

// CORS configuration
app.use(cors({ methods: ["GET", "POST", "PUT", "DELETE"], origin: "*" }));


// Routes
app.use("/", routes);

/* ============================
   Passport GitHub Strategy
============================ */

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.get('/', (req, res) => {
  if (req.session && req.session.user) {
    res.send(`User is logged in as ${req.session.user.displayName}`);
  } else {
    res.send('Logged out');
  }
});


app.get('/auth/github/callback', passport.authenticate('github', { 
    failureRedirect: '/api-docs'}), (req, res) => {
        // Successful authentication
        res.redirect('/');
});

/* ============================
   Error Handling
============================ */

process.on("uncaughtException", (err, origin) => {
  console.error(
    `Caught exception: ${err}\n` + `Exception origin: ${origin}`
  );
});

/* ============================
   Database Init & Server Start
============================ */

mongoDB.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and Node running on port ${port}`);
    });
  }
});
