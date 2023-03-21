'use strict';

// declare required dependencies for express server
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const Playlist = require('./models/playlist.js');
const verifyUser = require('./auth');

// start mongoose and verify it's alive and connected
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error'));
// db.once('open', function () {
//   console.log('Mongoose is connected');
// });

// connect mongoose to MongoDB
// mongoose.connect(process.env.DATABASE_URL);

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