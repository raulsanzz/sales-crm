const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const config = require('../database/config');
const db = require('../database/db');
const router = express.Router();
const sequelize = db.Sequelize;
const User = db.user;
const Op = sequelize.Op;

//@POST api/user @user registration
router.post('/signup', async (req, res) => { 
    
    const userExist = await User.count({
      where: { registration_number: req.body.newUser.registration_number }
    });
    if (userExist === 1) {
      return res.status(402).json({ msg: 'Employee number already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.newUser.password, salt);

    try {
      let user = await User.create({
        ...req.body.newUser,
        password :password
      });

      const payload = {
        user: {
          id: user.registration_number
        }
      };
      jwt.sign(payload, config.secret, (err, token) => {
        if (err) throw err;
        res.json({ user, token });
      });
    } catch (error) {
      console.log(error.message);
      return res.status(402).json({ msg: 'Server Error' });
    }
  }
);
//Sign in
router.post('/login', async(req, res) => {
  try {
    let { registration_number, password } = req.body.newUser;
    const user = await User.findAll({
      where: { registration_number: registration_number }
    });
    if (user.length === 0) {
      return res.status(400).json({ msg: 'No user found (Invalid employee number)' });
    }

    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Incorrect Password' });
    }
      const payload = {
        user: {
          id: user[0].registration_number
        }
      };

      jwt.sign(payload, config.secret, (err, token) => {
        if (err) throw err;
        return res.json({ token, user });
      });
    } catch (error) {
      return res.status(500).json({ msg: 'Server error, Please try again' });
    }
  }
);

//get all users
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.findAll({
      order: [['createdAt', 'DESC']]
    });
    if (users) {
      res.json({ users });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: 'Server Error' });
  }
});

//Fetch all voices
router.get('/voice', auth, async(req, res) => {
  try {
    const users = await User.findAll({
      where: { role : {
        [Op.in]: ['Sales Manager','Sales Voice']
      }},
      attributes:['name']
    });
    return res.json({users})
  }
  catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: 'Server Error' });
  }
})

router.get('/getme', auth, async (req, res) => {
  try {
    const id = req.user.user.id;
    const user = await User.findAll({
      where: { registration_number: id }
    });
    return res.json({ user });
  } catch (error) {
    res.status(500).json({ msg: 'Server error, Please try again' });
  }
});

//update user Credentials
router.put( '/edit/:id', auth, async (req, res) => {

    try {
      let result = await User.update(
        { ...req.body.updatedData },
        { where: { registration_number: req.params.id } }
      );

     return res.json({ result });
    } catch (error) {
      console.log(error.message);
      return res.status(402).json({ msg: 'Server Error' });
    }
  });

//update user password
router.put( '/edit/password/:id', auth, async (req, res) => {

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.updatedData.password, salt);
  try {
    let result = await User.update(
      { password: password },
      { where: { registration_number: req.params.id } }
    );

    return res.json({ result });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: 'Server Error' });
  }
});

//Delete User
router.delete('/:id', auth, async (req, res) => {
  let id = req.params.id;

  try {
    const result = await User.destroy({
      where: {
        registration_number: id
      }
    });
    if (result) {
      return res.status(200).json({ msg: 'Deleted' });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: 'Server Error' });
  }
});

module.exports = router;
