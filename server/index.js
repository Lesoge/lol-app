const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require("passport");

const player = require("./routes/api/player");
const riotapi = require("./routes/api/riotapi");
const playerRouter = require("./routes/player-router");
const forumRouter = require("./routes/forum-router")

const db = require('./db')

const app = express();
const apiPort = 8000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// Middleware zum Einfügen eines Zeitstempels in das Request-Objekt
app.use( function (req, res, next) {
	req.requestTime = Date.now();
	next();
} );

// Middleware zum Logging
app.use( function (req,res,next) {
	console.log(" ");
	console.log(req.url);
	console.log('Request method ' + req.method + ' received at ' + req.requestTime);
	next();
} );

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/player", player);

app.use("/test", playerRouter)

app.use("/riotapi", riotapi);

app.use("/forum", forumRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));