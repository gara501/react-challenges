// Global config
var port = process.env.PORT || 3000;

// Global credentials
// TODO: Move out of source code

var DB_USER = 'couchdb';
var DB_PASS = '1234';
var AUTH = '';

var GITHUB_CLIENT_ID = "fe1b1405e7784d567774";
var GITHUB_CLIENT_SECRET = "0e65014e15bff9c8568e9a84332a9e605088f08b";

var SESSION_SECRET = 'hail hydra!';

// CouchDB helper functions

function authenticate(callback) {
  db.auth(DB_USER, DB_PASS, function (error, body, headers) {
    if (headers && headers['set-cookie']) {
      AUTH = headers['set-cookie'];

      db = require('nano')(
        { url : 'http://localhost:5984/challenges', cookie: AUTH });
    }

    if (callback) {
      callback();
    }
  });
}

function checkAuth(headers) {
  if (headers && headers['set-cookie']) {
    AUTH = headers['set-cookie'];

    db = require('nano')(
      { url : 'http://localhost:5984/challenges', cookie: AUTH });
  }
}

function handleDBResponse(error, body, headers, res) {
  if (error) {
    res.status(error.statusCode);

    return res.send(error.message);
  }

  checkAuth(headers);

  res.status(200);
  res.send(body);
}

// Passport helper functions

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(401);
  res.send();
}

// CouchDB setup

var db = require('nano')('http://localhost:5984/challenges');

authenticate();

// Github user account setup
var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete GitHub profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GitHubStrategy(
  {
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:8080/auth/github/callback' // THIS MUST MATCH THE GITHUB SETTINGS
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      // To keep the example simple, the user's GitHub profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the GitHub account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

// Graphql
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLString = require('graphql').GraphQLString;
var graphqlHTTP = require('express-graphql');
var fetch = require('node-fetch');
var baseUrl = 'http://localhost:' + port;

function fetchByPath(relativeURL) {
  return fetch(`${baseUrl}${relativeURL}`).then(res => res.json());
}

function fetchChallenges(id) {
  if (id) {
    return fetchByPath('/api/challenges/' + id).then(json => {
      return json.rows;
    });
  } else {
    return fetchByPath('/api/challenges').then(json => {
      return json.rows;
    });
  }
}

function fetchSolutionsByChallengeId(id) {
  return fetchByPath(`/api/solutions/${id}`).then(json => json.rows);
}

var ChallengeType = new GraphQLObjectType({
  name: 'Challenge',
  fields: () => ({
    id: { type: GraphQLString },
    title: {
      type: GraphQLString,
      resolve: challenge => challenge.doc.title
    },
    description: {
      type: GraphQLString,
      resolve: challenge => challenge.doc.description
    },
    icon: {
      type: GraphQLString,
      resolve: challenge => challenge.doc.icon
    },
    start: {
      type: GraphQLString,
      resolve: challenge => challenge.doc.start
    },
    end: {
      type: GraphQLString,
      resolve: challenge => challenge.doc.end
    },
    explanation: {
      type: GraphQLString,
      resolve: challenge => challenge.doc.explanation
    },
    solutions: {
      type: new GraphQLList(SolutionType),
      resolve: challenge => fetchSolutionsByChallengeId(challenge.id)
    }
  })
});

var SolutionType = new GraphQLObjectType({
  name: 'Solution',
  fields: () => ({
    url: {
      type: GraphQLString,
      resolve: solution => solution.doc.url
    },
    name: {
      type: GraphQLString,
      resolve: solution => solution.doc.name
    },
    avatar: {
      type: GraphQLString,
      resolve: solution => solution.doc.avatar
    },
    user: {
      type: GraphQLString,
      resolve: solution => solution.doc.user
    },
    date: {
      type: GraphQLString,
      resolve: solution => solution.doc.date
    }
  })
});

var QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    challenges: {
      args: {
        id: { type: GraphQLString }
      },
      type: new GraphQLList(ChallengeType),
      resolve: (root, args) => fetchChallenges(args.id)
    },
    solutions: {
      args: {
        id: { type: GraphQLString }
      },
      type: new GraphQLList(SolutionType),
      resolve: (root, args) => fetchSolutionsByChallengeId(args.id)
    }
  })
});

var schema = new GraphQLSchema({
  query: QueryType
});

// Node Express Server setup

var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

// Graphql setup

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

// Parse post requests setup
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


// Static files setup
app.use(express.static('public'));

// Github session setup
app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

// API Route Handlers

app.get('/api/challenges', function (req, res) {
  db.view('challenges', 'challenges-view', { include_docs: true },
    function(error, body, headers) {
      if (error && error.statusCode === 401) {
        authenticate(function() {
          db.view('challenges', 'challenges-view', { include_docs: true },
            function(error, body, headers) {
              handleDBResponse(error, body, headers, res);
            });
        });
      } else {
        handleDBResponse(error, body, headers, res);
      }
  });
});

app.get('/api/challenges/:challengeId', function (req, res) {
  db.view('challenges', 'challenges-view',
    {
      key: req.params.challengeId,
      include_docs: true
    },
    function(error, body, headers) {
      if (error && error.statusCode === 401) {
        authenticate(function() {
          db.view('challenges', 'challenges-view',
          {
            include_docs: true,
            key: req.params.challengeId
          },
          function(error, body, headers) {
            handleDBResponse(error, body, headers, res);
          });
        });
      } else {
        handleDBResponse(error, body, headers, res);
      }
  });
});

app.get('/api/solutions/:challengeId', function (req, res) {
  db.view('solutions', 'challenge-solution-view',
    {
      key: req.params.challengeId,
      include_docs: true
    },
    function(error, body, headers) {
      if (error && error.statusCode === 401) {
        authenticate(function() {
          db.view('solutions', 'challenge-solution-view',
          {
            include_docs: true,
            key: req.params.challengeId
          },
          function(error, body, headers) {
            handleDBResponse(error, body, headers, res);
          });
        });
      } else {
        handleDBResponse(error, body, headers, res);
      }
  });
});

app.post('/api/solution', ensureAuthenticated, function (req, res) {
  req.body.date = new Date();

  db.insert(req.body, function(error, body, headers) {
    if (error && error.statusCode === 401) {
      authenticate(function() {
        db.insert(req.body, function(error, body, headers) {
          handleDBResponse(error, body, headers, res);
        });
      });
    } else {
      handleDBResponse(error, body, headers, res);
    }
  })
});

app.get('/api/user', function (req, res) {
  res.status(200);
  res.send({ user: req.user });
});

// Github auth route
app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }),
  function(req, res){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  }
);

// GET /auth/github/callback
// Use passport.authenticate() as route middleware to authenticate the
// request.  If authentication fails, the user will be redirected back to the
// login page.  Otherwise, the primary route function will be called,
// which, in this example, will redirect the user to the home page.
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  }
);

app.get('/logout', function(req, res){
  req.logout();
  req.session.destroy(function () {
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});

// Server init

app.listen(port, function () {
  console.log('Challenges app listening on port ' + port + '!')
});
