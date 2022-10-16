const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  const categories = await Category.findAll({
    include: [Product],
  })
  try {
    res.status(200).json(categories)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  const category = await Category.findOne({
    where: {
      id: req.params.id
    },
    include: [Product],
  })
  try {
    res.status(200).json(category)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  const category = await Category.create(req.body)
  try {
    res.status(200).json(category)
  } catch (err) { res.status(400).json(err) };
});

router.put('/:id', async (req, res) => {
  const category = await Category.update({
    where: {
      id: req.params.id
    },
  })
  try {
    res.status(200).json(category)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  const category = await Category.destroy({
    where: {
      id: req.params.id
    },
  })
  try {
    res.status(200).json(category)
  } catch (err) {
    res.status(500).json(err)
  }});

module.exports = router;
