const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  console.log('GET TAGS')

  try {
    const tags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, },],
    })
    res.status(200).json(tags)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  console.log('GET TAG BY ID')
  try {
    const tag = await Tag.findOne({where: {id: req.params.id},
      include: [{ model: Product, through: ProductTag }],
    })
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
  console.log('CREATE TAG')

  try {
    const tag = await Tag.create(req.body)
    res.status(200).json(tag)
  } catch (err) {
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  console.log('UPDATE TAG')


  try {
    const tag = await Tag.update(req.body, {
      where: { id: req.params.id },
    })
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
  console.log('DELETE TAG')


  try {
    const tag = await Tag.destroy({
      where: { id: req.params.id, },
    })
    res.status(200).json(tag)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
