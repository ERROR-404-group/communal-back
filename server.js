'use strict';

// declare required dependencies for express server
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');
const qs = require('qs');
// const Playlist = require('./models/playlist.js');
const verifyUser = require('./auth');

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

// accept client requests to interact with database
app.get('/playlists', getPlaylists);
app.post('/playlists', createPlaylist);
app.delete('/playlists', deletePlaylist);

// PUT requests are not well defined in the project documentation
// app.put('playlists', putPlaylist);

// accept client requests to search Spotify API for songs
// request format: http://<SERVER_URL>/search?q=$<SEARCH_STRING>
app.get('/search', async (req, res, next) => {
  try {
    let search_string = req.query.q;
    let search_results = await getSpotifyResults(search_string);
    res.send(search_results);
  }
  catch (error) {
    next (error);
  }
});

// test that server receives requests
app.get('/test', (req, res) => {
  res.send('test request received');
});

// start listening
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

const client_id = process.env.SPOTIFY_API_CLIENT_ID;
const client_secret = process.env.SPOTIFY_API_CLIENT_SECRET;
const auth_token = Buffer.from(`${client_id}:${client_secret}`, 'utf-8').toString('base64');

// console.log(auth_token);

const getAuth = async () => {
  try {
    const token_url = 'https://accounts.spotify.com/api/token';
    const data = qs.stringify({grant_type: 'client_credentials'});

    const response = await axios.post(token_url, data, {
      headers: {
        'Authorization': `Basic ${auth_token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    // return access token
    // console.log(response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.log(error);
  }
};

// function to search tracks using Spotify API
// requires search string (passed from client request)
// search string format: text, separated by spaces is acceptable
// requires token (generated server side)
async function getSpotifyResults(search_string) {

  const access_token = await getAuth();

  // Spotify request URL format
  // https://api.spotify.com/v1/search?q=<SEARCH_STRING>&type=track&limit=10"
  // Spotify get request headers
  try {
    // let token = getSpotifyToken();
    
    let search = await axios.get(`https://api.spotify.com/v1/search?q=${search_string}&type=track&limit=10`,
      {headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
    }});
    let songResults = search.data.tracks.items.map(
      songResult => new Song(songResult)
      );
    return songResults;
  } catch (error) {
    console.log(error);
  }
}

// let req = 'pink floyd animals';

// getSpotifyResults(req);

class Song {
  constructor(SongObject) {
    this.title = SongObject.name,
    this.artist = SongObject.artists.name || SongObject.artists[0].name,
    this.album = SongObject.album.name
   }
}

// this function gets a user's playlists
// it needs to get the user's email as a req parameter
// when it returns the playlists using Playlist.find, then we can use filter() to only return that user's playlists
async function getPlaylists (req, res, next) {
  verifyUser(req, async (err, user) => {
    if (err) {
      console.error(err);
      res.send('Invalid token cause of line 137');
    } else {
      try {
        let playlistResults = await Playlist.find({});
        let userPlaylists = playlistResults.filter(list => list.createdBy === userEmail);
        res.status(200).send(userPlaylists);
        console.log('User\'s playlists sent');
      } catch (err) {
        next(err);
      }
    }
  });
}

// this function sends a newly created playlist to the database
async function createPlaylist (req, res, next) {
  verifyUser(req, async (err, user) => {
    if (err) {
      console.error(err);
      res.send('Invalid token');
    } else {
      try {
        // let newPlaylist = await Playlist.create({});
        console.log(req.body);
        res.status(200).send("newPlaylist caught");
        console.log('Playlist added to database');
      } catch (err) {
        next(err);
      }
    }
  });
}

// this function deletes a previously created playlist
async function deletePlaylist (req, res, next) {
  verifyUser(req, async (err, user) => {
    if (err) {
      console.error(err);
      res.send('Invalid token');
    } else {
      try {
        let id = req.params.id;
        await Playlist.findByIdAndDelete(id);
        res.status(200).send(id);
      } catch (err) {
        next(err);
      }
    }
  });
}

// this function sends a update to the database when the playlist is updated