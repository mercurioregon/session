const router = require('express').Router();

const homeRoutes = require('./homeRoutes.js');
const profile = require(`./profile.js`)
const home = require(`./home.js`)

// const apiRoutes = require('./api');

router.use('/profile', profile);
router.use('/home', homeRoutes);
router.use('/start', home)
// router.use('/api', apiRoutes);

module.exports = router;