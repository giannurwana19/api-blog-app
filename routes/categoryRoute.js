const router = require('express').Router();

const Category = require('../models/Category');

// CREATE CATEGORY
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);

    res.status(201).json({
      message: 'Category has been created!',
      data: newCategory,
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// GET CATEGORY
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json({ data: categories });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
