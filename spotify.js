'use strict';

const client_id = process.env.SPOTIFY_API_CLIENT_ID;
const client_secret = process.env.SPOTIFY_API_CLIENT_SECRET;

let authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    const token = body.access_token;
  }
});

module.exports = getSpotifyToken;