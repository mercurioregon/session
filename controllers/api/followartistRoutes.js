const router = require('express').Router();

router.get(`/followed-artists`,async(req, res) => {
    console.log(ACCESSTOKEN)
    const list= await fetch("https://api.spotify.com/v1/me/following", {
     headers: {"Authorization": "Bearer "+ ACCESSTOKEN}
      });
     console.log(await list.json())
      });

                    // type or string

        router.put(`/follow-artists-or-users`, async(req,res) => {
         console.log(ACCESSTOKEN)
         const list= await fetch(`https://api.spotify.com/v1/me/following"`,{
          headers: {"Authorization": "Bearer "+ ACCESSTOKEN}, body: JSON.stringify({
                    "ids": [
                    "string"
                        ]})
              });
              console.log(await list.json())
              });

        router.delete(`/unfollow-playlist`, async(req,res) => {
            console.log(ACCESSTOKEN)
             const list= await fetch(`https://api.spotify.com/v1/me/following`,{
              headers: {"Authorization": "Bearer "+ ACCESSTOKEN}, body: JSON.stringify({
                      "ids": [
                       "string"
                       ] })
                });
                console.log(await list.json())
                });

            router.get(`/user-follows-artists-or-users`,async(req, res) => {
             console.log(ACCESSTOKEN)
             const list= await fetch("https://api.spotify.com/v1/me/following/contains", {
             headers: {"Authorization": "Bearer "+ ACCESSTOKEN}
                   });
                console.log(await list.json())
                    });              

                 router.get(`/user-follows-playlist`,async(req, res) => {
                 console.log(ACCESSTOKEN)
                 const list= await fetch("https://api.spotify.com/v1/playlists/{playlist_id}/followers/contains", {
                    headers: {"Authorization": "Bearer "+ ACCESSTOKEN}
                        });
                       console.log(await list.json())
                        });  

        module.exports = router;
                        