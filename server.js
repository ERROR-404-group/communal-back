'use strict';

// declare required dependencies for express server
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');
// const Playlist = require('./models/playlist.js');
const verifyUser = require('./auth');
const request = require('request');

// start mongoose and verify it's alive and connected
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

// connect mongoose to MongoDB
mongoose.connect(process.env.DATABASE_URL);

// start express server with CORS and express.json
const app = express();
app.use(cors());
app.use(express.json());

// use PORT from env or else log 3002 to indicate a problem
const PORT = process.env.PORT || 3002;

// app.put('/playlists', getPlaylist);
// app.post('/playlists', postPlaylist);
// app.delete('/playlists', deletePlaylist);
// app.put('playlists', putPlaylist);

// test that server receives requests
app.get('/test', (req, res) => {
  res.send('test request received');
});

// start listening
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

const clientId = process.env.SPOTIFY_API_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_API_CLIENT_SECRET;

var client_id = clientId;
var client_secret = clientSecret;

var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

async function getSpotifyToken() {

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    // var token = body.access_token;
    var token = body;
    console.log(token);
  }
});

}

getSpotifyToken();