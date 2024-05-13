const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');

// TODO - Create and link additional routes

router.use('/',homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;