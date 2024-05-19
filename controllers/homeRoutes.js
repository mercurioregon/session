const router = require('express').Router();
var ACCESSTOKEN = ""



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

router.get(`/current-user-playlist`,async(req, res) => {
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

        router.get(`/top-tracks`,async(req, res) => {
            console.log(ACCESSTOKEN)
            const list= await fetch("https://api.spotify.com/v1/artists/{id}/top-tracks", {
              headers: {"Authorization": "Bearer "+ ACCESSTOKEN}
            });
              console.log(await list.json())
            });

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


