// TODO - make token a variable based on who is logged in
// const bearer = require(`../../models/Spotify`)

// const Spotify = require("../../models/Spotify");
// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
async function topFive() {
  const getParam = window.location.search;
  const urlParse = new URLSearchParams(getParam);
  const token = urlParse.get('access_token');
  async function fetchWebApi(endpoint, method, body) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method,
      body:JSON.stringify(body)
    });
    return await res.json();
  }
  
  async function getTopTracks(){
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    return (await fetchWebApi(
      'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
    )).items;
  }
  
  const topTracks = await getTopTracks();

  for (let i = 0; i < 5; i++){

  const trackInfo = document.getElementById(`track-${i}`);
    trackInfo.dataset.spotifyId = topTracks[i].uri;
  
  const trackName = document.getElementById(`name-${i}`);
  const track = document.createTextNode(topTracks[i].name);
    trackName.appendChild(track);
  };

  console.log(
    topTracks?.map(
      ({name, artists}) =>
        `${name} by ${artists.map(artist => artist.name).join(', ')}`
    )
  );
}
topFive();

module.exports = {topFive};