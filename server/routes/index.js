const express = require('express');
const router = express.Router();

//Routes
router.use('/user', require('./user'));
router.use('/job', require('./job'));
router.use('/auth', require('./auth'));
router.use('/appliedjob', require('./appliedJobs'));
router.use('/profile', require('./profile'));
router.use('/lead', require('./leads'));
router.use('/agenda', require('./agendas'));
router.use('/test', require('./tests'));
router.use('/note', require('./notes'));

module.exports = router;