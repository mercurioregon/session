
const router = require('express').Router();

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

    router.get(`/current-user-playlist`,async(req, res) => {
        console.log(ACCESSTOKEN)
        const list= await fetch("https://api.spotify.com/v1/me/playlists", {
          headers: {"Authorization": "Bearer "+ ACCESSTOKEN}
        });
          console.log(await list.json())
        });
    
        module.exports = router;
        