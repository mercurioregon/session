const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const request = require("request");
const crypto = require("crypto");
const cors = require("cors");
const querystring = require("querystring");
const cookieParser = require("cookie-parser");

// const routes = require('./controllers');
const router = require('./controllers');
const sequelize = require('./config/connection');
// const helpers = require('./utils/helpers');

var client_id = "2fb4b32039a3437a86f2555b65cd707e"; // clientId
var client_secret = "ded8bbe740b44c52890590889397007f"; // clientSecret
var redirect_uri = "http://localhost:3001/"; // redirect uri


const app = express();
let PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  user: null,
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
  db: sequelize,
  }),
};

app.use(session(sess));

const generateRandomString = (length) => {
  return crypto.randomBytes(60).toString("hex").slice(0, length);
};

var stateKey = "spotify_auth_state";

  const hbs = exphbs.create({});

  app.engine('handlebars', hbs.engine);
  app.set('view engine', 'handlebars');
  
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, 'public')));

  app.use(router);

  

app.get("/login", function (req, res) {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // application requests authorization
  var scope = "user-read-private user-read-email ugc-image-upload user-read-playback-state user-modify-playback-state user-read-currently-playing streaming playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-follow-modify user-follow-read user-read-playback-position user-top-read user-read-recently-played user-library-modify user-library-read ";
  
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
});

app.get("/", function (req, res) {
  // application requests refresh and access tokens
  // after checking the state parameter
console.log("redirect")
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;
  console.log(`stored state`, storedState);
  console.log(`state`, state);
  if (state === null || state !== storedState) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          new Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
          refresh_token = body.refresh_token;
     
        var options = {
          url: "https://api.spotify.com/v1/me",
          headers: { Authorization: "Bearer " + access_token },
          json: true,
        };

        // use the access token to access the Spotify Web API
        request.get(options, function (error, response, body) {

          res.redirect(
            "/home?" +
              querystring.stringify({
                access_token: access_token,
                refresh_token: refresh_token,
                displayName: body.display_name,
                id: body.id,
                // profPic: body.images[0],
                user_uri: body.uri,
                followers: body.followers,
                country: body.country,                
              })
          );
        });

        // we can also pass the token to the browser to make requests from there

      } else {
        // res.redirect(
        //   "/#" +
        //     querystring.stringify({
        //       error: "invalid_token",
        //     })
        // );
      }
    });
  }
});

// allows the user the refresh their token instead of having to reAuthenticate
app.get("/refresh_token", function (req, res) {
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        new Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token,
        refresh_token = body.refresh_token;
      res.send({
        access_token: access_token,
        refresh_token: refresh_token,
      });
    }
  });
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
