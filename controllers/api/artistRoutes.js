
const router = require('express').Router();

router.get(`/related-artists`,async(req, res) => {
    console.log(ACCESSTOKEN)
    const list= await fetch("https://api.spotify.com/v1/artists/{id}/related-artists", {
      headers: {"Authorization": "Bearer "+ ACCESSTOKEN}
    });
      console.log(await list.json())
    });

    router.get(`/top-tracks`,async(req, res) => {
        console.log(ACCESSTOKEN)
        const list= await fetch("https://api.spotify.com/v1/artists/{id}/top-tracks", {
          headers: {"Authorization": "Bearer "+ ACCESSTOKEN}
        });
          console.log(await list.json())
        });

        module.exports = router;
        