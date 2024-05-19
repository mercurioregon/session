const router = require('express').Router();
var ACCESSTOKEN = ""

ACCESSTOKEN = access_token

router.get (`/`,(req, res) =>{
    newProf = req.query.displayName;
    console.log ("HomeRoutes", req.session);
    res.render(`homepage`, {
        newProf,
    });
});

router.get(`/request-featured`,async(req, res) => {
console.log(ACCESSTOKEN)
const list= await fetch("https://api.spotify.com/v1/browse/featured-playlists", {
  headers: {"Authorization": "Bearer "+ ACCESSTOKEN}
});
  console.log(await list.json())
});

router.post(`/create-playlist`, async(req,res) => {
console.log(ACCESSTOKEN)
const list= await fetch(`https://api.spotify.com/v1/users/{user_id}/playlists`,{
    headers: {"Authorization": "Bearer "+ ACCESSTOKEN}, body: JSON.stringify({
        "name": "New Playlist",
        "description": "New playlist description",
        "public": false })
});
console.log(await list.json())
});

router.get(`/currect-user-playlist`,async(req, res) => {
    console.log(ACCESSTOKEN)
    const list= await fetch("https://api.spotify.com/v1/me/playlists", {
      headers: {"Authorization": "Bearer "+ ACCESSTOKEN}
    });
      console.log(await list.json())
    });

    router.get(`/related-artists`,async(req, res) => {
        console.log(ACCESSTOKEN)
        const list= await fetch("https://api.spotify.com/v1/artists/{id}/related-artists", {
          headers: {"Authorization": "Bearer "+ ACCESSTOKEN}
        });
          console.log(await list.json())
        });







module.exports = router;


