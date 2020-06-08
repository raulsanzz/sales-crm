const express = require('express');
const db = require('../database/db');
const router = express.Router();
const Profile = db.profile;


//get all profiles
router.get( '/', async (req, res) => {
    try {
      const profiles = await Profile.findAll({
        attributes: ['id', 'name']
      });
     return res.json({ profiles }  );
    } catch (error) {
      console.log(error.message);
      return res.status(402).json({ msg: 'Server Error' });
    }
});

module.exports = router;
