const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

//Routes
router.use('/user', require('./user'));
router.use('/job', auth, require('./job'));
router.use('/appliedjob', auth, require('./appliedJobs'));
router.use('/profile', auth, require('./profile'));
router.use('/lead', auth, require('./leads'));
router.use('/agenda', auth, require('./agendas'));
router.use('/test', auth, require('./tests'));
router.use('/note', auth, require('./notes'));

module.exports = router;