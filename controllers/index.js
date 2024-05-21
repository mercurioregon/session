const router = require('express').Router();

const homeRoutes = require('./homeRoutes.js');

// const apiRoutes = require('./api');
router.get("/static", (req, res) => { 
    res.render("static"); 
}); 

router.use('/home', homeRoutes);
// router.use('/api', apiRoutes);

module.exports = router;