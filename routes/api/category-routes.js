const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', async (req, res) => {
  console.log('GET CATEGORY')

  try {
    const categories = await Category.findAll({
      include: [Product],
    })
    res.status(200).json(categories)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  console.log('GET CATEGORY BY ID')

  try {
    const category = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: [Product],
    })
    res.status(200).json(category)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  console.log('CREATE CATEGORY')

  try {
    const category = await Category.create(req.body)
    res.status(200).json(category)
  } catch (err) { res.status(400).json(err) };
});

router.put('/:id', async (req, res) => {
  console.log('UPDATE CATEGORY')


  try {
    const category = await Category.update(req.body,{
      where: {
        id: req.params.id
      },
    })
    res.status(200).json(category)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  console.log('DELETE CATEGORY')

  try {
    const category = await Category.destroy({
      where: {
        id: req.params.id
      },
    })
    res.status(200).json(category)
  } catch (err) {
    res.status(500).json(err)
  }});

module.exports = router;
