const router = require('express').Router();

router.get (`/`,(req, res) =>{
  const getParam = window.location.search;
  const urlParse = new URLSearchParams(getParam);
  const name = urlParse.get('displayName');
  const product = urlParse.get('product');
  const email = urlParse.get('email');
  const country = urlParse.get('country'); 
    res.render(`profile`, {
        name, product, email, country,
    });
  });

module.exports = router;