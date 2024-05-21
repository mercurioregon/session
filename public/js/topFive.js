// TODO - make token a variable based on who is logged in
// const bearer = require(`../../models/Spotify`)

// const Spotify = require("../../models/Spotify");
// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const topTracksIds = [];
const topTrackNames = [];
const topTrackURI = [];
const genres = [];
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
  
  topTracksIds.push(topTracks[i].id);
  topTrackNames.push(topTracks[i].name);
  topTrackURI.push(topTracks[i].uri);
  const trackName = document.getElementById(`name-${i}`);
  trackName.innerHTML = "";
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

console.log(topTracksIds);

async function getRecs() {
// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
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

async function getRecommendations(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-recommendations
  return (await fetchWebApi(
    `v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(',')}`, 'GET'
  )).tracks;
}

const recTracks = await getRecommendations();
for (let i = 0; i < 5; i++){

const trackInfo = document.getElementById(`track-${i}`);
  trackInfo.dataset.spotifyId = recTracks[i].uri;
  
const trackName = document.getElementById(`name-${i}`);
trackName.innerHTML = "";
const track = document.createTextNode(recTracks[i].name);
  trackName.appendChild(track);

console.log(
  recTracks.map(
    ({name, artists}) =>
      `${name} by ${artists.map(artist => artist.name).join(', ')}`
  )
);
};
};

topFive();

function backTo5() {
  for (let i = 0; i < 5; i++){

    const trackInfo = document.getElementById(`track-${i}`);
    trackInfo.dataset.spotifyId = topTrackURI[i];
    
    const trackName = document.getElementById(`name-${i}`);
    trackName.innerHTML = "";
    const track = document.createTextNode(topTrackNames[i]);
      trackName.appendChild(track);
    };
};


async function getGenres() {
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
  };

  async function getGens(){
    return (await fetchWebApi(
      `v1/recommendations/available-genre-seeds`, 'GET'
    ));
  };
  const gens = await getGens();
  for (let i = 0; i < 125 ; i++) {
    genres.push(gens.genres[i]);
    const list = document.getElementById(`genre-list`);
    // const newGen = document.createTextNode(genres[i]);
    const genre = document.createElement("option");
    genre.setAttribute("id", `genre-${i}`)
    genre.innerHTML = `${genres[i]}`
    list.append(genre);

  }
  console.log(genres);
};
getGenres();

async function newGen(){
  const gen = document.getElementById("genre-list");
  const pick = gen.options[gen.selectedIndex].text;
  console.log(pick);
  
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
  };
  async function getSongs(){
    return (await fetchWebApi(
      `v1/recommendations?seed_genres=${pick}&min_popularity=50`, 'GET'
    )).tracks;
  };
  
  const songs = await getSongs();
  for (let i = 0; i < 5; i++){
  
    const trackInfo = document.getElementById(`track-${i}`);
      trackInfo.dataset.spotifyId = songs[i].uri;
      
    const trackName = document.getElementById(`name-${i}`);
    trackName.innerHTML = "";
    const track = document.createTextNode(songs[i].name);
      trackName.appendChild(track);
  
  };
  }

const backTo5Btn = document.getElementById('button1');
const getRecsBtn = document.getElementById('button2');
const genreRecBtn = document.getElementById('genre-list')

backTo5Btn.addEventListener('click', backTo5);
getRecsBtn.addEventListener('click', getRecs);
genreRecBtn.addEventListener('change', newGen);

export {topFive, getRecs, backTo5};