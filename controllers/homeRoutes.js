const router = require('express').Router();
const newProf = require(`../server.js`).newProf;

router.get (`/`,(req, res) =>{
    res.render(`homepage`, {
        newProf,
    });
    console.log (newProf)
});

module.exports = router;