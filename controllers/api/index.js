const router = require('express').Router();

const prof = require(`../profile`)

// const apiRoutes = require('./api');

router.use('/profile', prof);

// router.use('/api', apiRoutes);

module.exports = router;