const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

//Routes
router.use('/user', require('./user'));
router.use('/job', auth, require('./job'));
router.use('/lead', auth, require('./leads'));
router.use('/test', auth, require('./tests'));
router.use('/note', auth, require('./notes'));
router.use('/agenda', auth, require('./agendas'));
router.use('/profile', auth, require('./profile'));
router.use('/appliedjob', auth, require('./appliedJobs'));

module.exports = router;