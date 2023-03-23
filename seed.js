'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);
// console.log(process.env.DATABASE_URL);
const Playlist = require("./models/playlist.js")

async function seed() {

  await Playlist.create({
    name: 'Animals',
    createdBy: 'nathan.d.brown@gmail.com',
    songs: [
      {
        name: 'Pigs On The Wing 1',
        artist: 'Pink Floyd',
        album: 'Animals'
      },
      {
        name: 'Dogs',
        artist: 'Pink Floyd',
        album: 'Animals'
      },
      {
        name: 'Pigs (Three Different Ones)',
        artist: 'Pink Floyd',
        album: 'Animals'
      },
      {
        name: 'Sheep',
        artist: 'Pink Floyd',
        album: 'Animals'
      },
      {
        name: 'Pigs On The Wing 2',
        artist: 'Pink Floyd',
        album: 'Animals'
      }
    ]      
  });
  console.log('animals added');

  await Playlist.create({
    name: 'Wish You Were Here',
    createdBy: 'nathan.d.brown@gmail.com',
    songs: [
      {
        name: 'Shine On You Crazy Diamond (1-5)',
        artist: 'Pink Floyd',
        album: 'Wish You Were Here'
      },
      {
        name: 'Welcome To The Machine',
        artist: 'Pink Floyd',
        album: 'Wish You Were Here'
      },
      {
        name: 'Have A Cigar',
        artist: 'Pink Floyd',
        album: 'Wish You Were Here'
      },
      {
        name: 'Wish You Were Here',
        artist: 'Pink Floyd',
        album: 'Wish You Were Here'
      },
      {
        name: 'Shine On You Crazy Diamond (6-9)',
        artist: 'Pink Floyd',
        album: 'Wish You Were Here'
      }
    ]      
  });
  console.log('wishes added');


  mongoose.disconnect();
}

seed();