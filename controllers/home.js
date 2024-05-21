const router = require('express').Router();
// var ACCESSTOKEN = ""

// ACCESSTOKEN = access_token


router.get (`/`,(req, res) =>{
  res.render(`homepage`, {
  });
});

          
             

module.exports = router;


