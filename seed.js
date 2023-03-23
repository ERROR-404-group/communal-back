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
        title: 'Pigs On The Wing 1',
        artist: 'Pink Floyd',
        album: 'Animals'
      },
      {
        title: 'Dogs',
        artist: 'Pink Floyd',
        album: 'Animals'
      },
      {
        title: 'Pigs (Three Different Ones)',
        artist: 'Pink Floyd',
        album: 'Animals'
      },
      {
        title: 'Sheep',
        artist: 'Pink Floyd',
        album: 'Animals'
      },
      {
        title: 'Pigs On The Wing 2',
        artist: 'Pink Floyd',
        album: 'Animals'
      }
    ]
  });
  console.log('animals added');

  await Playlist.create({
    name: 'Wish You Were Here',
    createdBy: 'darcknight1980@gmail.com',
    songs: [
      {
        title: 'Shine On You Crazy Diamond (1-5)',
        artist: 'Pink Floyd',
        album: 'Wish You Were Here'
      },
      {
        title: 'Welcome To The Machine',
        artist: 'Pink Floyd',
        album: 'Wish You Were Here'
      },
      {
        title: 'Have A Cigar',
        artist: 'Pink Floyd',
        album: 'Wish You Were Here'
      },
      {
        title: 'Wish You Were Here',
        artist: 'Pink Floyd',
        album: 'Wish You Were Here'
      },
      {
        title: 'Shine On You Crazy Diamond (6-9)',
        artist: 'Pink Floyd',
        album: 'Wish You Were Here'
      }
    ]
  });
  console.log('wishes added');

  await Playlist.create({
    name: 'A Momentary Lapse of Reason',
    createdBy: 'deoncvn68@gmail.com',
    songs: [
      {
        title: 'Signs Of Life (Instrumental)',
        artist: 'Pink Floyd',
        album: 'A Momentary Lapse of Reason'
      },
      {
        title: 'Learning To Fly',
        artist: 'Pink Floyd',
        album: 'A Momentary Lapse of Reason'
      },
      {
        title: 'The Dogs Of War',
        artist: 'Pink Floyd',
        album: 'A Momentary Lapse of Reason'
      },
      {
        title: 'One Slip',
        artist: 'Pink Floyd',
        album: 'A Momentary Lapse of Reason'
      },
      {
        title: 'On The Turning Away',
        artist: 'Pink Floyd',
        album: 'A Momentary Lapse of Reason'
      },
      {
        title: 'Yet Another Movie',
        artist: 'Pink Floyd',
        album: 'A Momentary Lapse of Reason'
      },
      {
        title: 'Round And Around (Instrumental)',
        artist: 'Pink Floyd',
        album: 'A Momentary Lapse of Reason'
      },
      {
        title: 'A New Machine (Part 1)',
        artist: 'Pink Floyd',
        album: 'A Momentary Lapse of Reason'
      },
      {
        title: 'Terminal Frost (Instrumental)',
        artist: 'Pink Floyd',
        album: 'A Momentary Lapse of Reason'
      },
      {
        title: 'A New Machine (Part 2)',
        artist: 'Pink Floyd',
        album: 'A Momentary Lapse of Reason'
      },
      {
        title: 'Sorrow',
        artist: 'Pink Floyd',
        album: 'A Momentary Lapse of Reason'
      }
    ]
  });
  console.log('momentary added');

  await Playlist.create({
    name: 'Meddle',
    createdBy: 'jt1keith@gmail.com',
    songs: [
      {
        title: 'One Of These Days',
        artist: 'Pink Floyd',
        album: 'Meddle'
      },
      {
        title: 'A Pillow Of Winds',
        artist: 'Pink Floyd',
        album: 'Meddle'
      },
      {
        title: 'Fearless',
        artist: 'Pink Floyd',
        album: 'Meddle'
      },
      {
        title: 'San Tropez',
        artist: 'Pink Floyd',
        album: 'Meddle'
      },
      {
        title: 'Seamus',
        artist: 'Pink Floyd',
        album: 'Meddle'
      },
      {
        title: 'Echoes',
        artist: 'Pink Floyd',
        album: 'Meddle'
      }
    ]
  });
  console.log('meddle added');

  mongoose.disconnect();
}

seed();