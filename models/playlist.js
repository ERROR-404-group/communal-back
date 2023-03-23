'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const playlistSchema = new Schema({
  name: {type: String, required: true},
  createdBy: {type: String, required: true},
  songs: [
    {
      id: {type: String, required: false},
      name: {type: String, required: false},
      artist: {type: String, required: false},
      album: {type: String, required: false}
    }
  ]
});

const PlaylistModel = mongoose.model('Playlist', playlistSchema);

module.exports = PlaylistModel;