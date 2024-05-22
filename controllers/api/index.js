const router = require('express').Router();

const recs = require('./recRoute');

router.use('/recs', recs);

module.exports = router;