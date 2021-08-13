const router = require('express').Router();
const bcrypt = require('bcrypt');

const User = require('../models/User');

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    !user && res.status(400).json('Wrong credentials in username!');

    const validate = await bcrypt.compare(req.body.password, user.password);

    !validate && res.status(400).json('Wrong credentials password!');
    console.log('sampe 2');

    const { password, ...UserData } = user._doc;

    res.status(200).json(UserData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
