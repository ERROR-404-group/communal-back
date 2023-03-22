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

let error = {
  message: 'It looks like I picked the wrong week to quit amphetamines.'
}

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

// code vomit from SPOTIFY API, uses client id and client secret to generate token
// token required when sending searches to SPOTIFY API

var client_id = process.env.SPOTIFY_API_CLIENT_ID;
var client_secret = process.env.SPOTIFY_API_CLIENT_SECRET;

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

function getSpotifyToken() {
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var token = body.access_token;
      console.log(token);
      return token;
    }
  });
};

// ^^^ end code vomit from SPOTIFY API ^^^

// function to search tracks using Spotify API
// requires search string (passed from client)
// search string format: text, separated by spaces is acceptable
// requires token (generated server side)
async function getSpotifyResults(search_string) {
  // Spotify request URL format
  // https://api.spotify.com/v1/search?q=<search_string>&type=track&limit=10"
  // Spotify get request headers
  // {"Accept: application/json","Content-Type: application/json","Authorization: Bearer <token>"}
  try {
    let token = getSpotifyToken();
    
    let search = await axios.get(`https://api.spotify.com/v1/search?q=${search_string}&type=track&limit=10`,
      {headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer BQDtgmAw7hFI21eNDxn26mI9CAJsnIf464Ht7pvzG0apy5diUbckdfJ-9Ykqwn3HJDtqay_PYw0dxegUm6EJRdFKlTe4rcrRshed7VlJqj9Hqm3CrBNM`
    }});
    let tracks = search.data.tracks.items.map(
      trackResult => new Track(trackResult)
      );
    console.log(tracks)
  } catch (error) {
    console.log(error);
  }
}

let animals = 'pink floyd animals';

getSpotifyResults(animals);

class Track {
  constructor(TrackObject) {
    this.album = TrackObject.album.name,
    this.artist = TrackObject.artists[0].name,
    this.track = TrackObject.name
   }
}