
const router = require('express').Router();

router.put(`/follow-playlist`, async(req,res) => {
    console.log(ACCESSTOKEN)
    const list= await fetch(`https://api.spotify.com/v1/playlists/{playlist_id}/followers`,{
        headers: {"Authorization": "Bearer "+ ACCESSTOKEN}, body: JSON.stringify({
                 "public": false })
    });
    console.log(await list.json())
    });

 router.delete(`/unfollow-playlist`, async(req,res) => {
    console.log(ACCESSTOKEN)
    const list= await fetch(`https://api.spotify.com/v1/playlists/{playlist_id}/followers`,{
    headers: {"Authorization": "Bearer "+ ACCESSTOKEN}, body: JSON.stringify({
               "public": false })
     });
     console.log(await list.json())
      });

      module.exports = router;
      