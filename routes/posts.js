const router = require('express').Router();

const Post = require('../models/Post');

// CREATE POST
router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create(req.body);

    res.status(201).json({
      message: 'Post has been created!',
      data: newPost,
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// UPDATE POST
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );

        res.status(200).json({
          message: 'User has been updated!',
          data: updatedPost,
        });
      } catch (error) {}
    } else {
      res.status(401).json({ message: 'You can update only your post' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// DELETE POST
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.username === req.body.username) {
      try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);

        res.status(200).json({
          message: 'User has been deleted!',
          data: deletedPost,
        });
      } catch (error) {}
    } else {
      res.status(401).json({ message: 'You can delete only your post' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// GET POST BY ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json({
      data: post,
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// GET ALL POST
router.get('/', async (req, res) => {
  const username = req.query.user;
  const category = req.query.category;

  try {
    let posts;

    if (username) {
      posts = await Post.find({ username });
    } else if (category) {
      posts = await Post.find({
        categories: {
          $in: [category],
        },
      });
    } else {
      posts = await Post.find();
    }

    res.status(200).json({
      data: posts,
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
