const router = require('express').Router();

router.get (`/`,(req, res) =>{
    newProf = req.query.displayName;
    res.render('homepage', {
        newProf,
    });
});

module.exports = router;