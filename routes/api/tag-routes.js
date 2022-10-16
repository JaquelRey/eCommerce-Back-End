const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  const tags = await Tag.findAll({
    include: [{ model: Product, through: ProductTag, },],
  })
  try {
    res.status(200).json(tags)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  const tag = await Tag.findOne(req.params.id, {
    include: [{ model: Product, through: ProductTag, },],
  })
  try {
    if (!tag) {
      return res.status(404).json({ message: 'No tags found with this id!' });
    } else {
      res.status(200).json(tag)
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  const tag = await Tag.create(req.body)
  try {
    res.status(200).json(tag)
  } catch (err) {
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  const tag = await Tag.update(req.body, {
    where: { id: req.params.id, },
  })
  try {
    res.status(200).json(tag);
    if (!tag) {
      return res.status(404).json({ message: 'No tags found with this id!' });
    } else {
      res.status(200).json(tag)
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  const tag = await Tag.destroy({
    where: { id: req.params.id, },
  })
  try {
    res.status(200).json(tag)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
