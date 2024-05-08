const router = require('express').Router();
const apiRoutes = require('./api');

// TODO - Create and link additional routes

router.use('/api', apiRoutes);
module.exports = router;