const router = require('express').Router();
const bcrypt = require('bcrypt');

const User = require('../models/User');
const Post = require('../models/Post');

// UPDATE
router.put('/:id', async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      if (req.body.password) {
        const salt = await bcrypt.genSalt();
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      res.status(200).json({
        message: 'User has been updated!',
        data: updatedUser,
      });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  } else {
    res.status(401).json({ message: 'You can update only your account!' });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        res.status(200).json({
          message: 'User has been deleted!',
          data: deletedUser,
        });
      } catch (err) {
        res.status(500).json({ message: 'User not found!' });
      }
    } catch (err) {}
  } else {
    res.status(401).json({ message: 'You can delete only your account!' });
  }
});

module.exports = router;

// DOCS

// pada findByIdAndUpdate
// { new: true }
// untuk memberikan data yang sudah diupdate (default false)
