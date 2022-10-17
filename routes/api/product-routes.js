const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  const products = await Product.findAll({
    include: [Category, { model: Tag, through: ProductTag, },],
  })
  try {
    res.status(200).json(products)
  } catch (err) {
    res.status(500).json(err)
  }
});

// get one product
router.get('/:id', async (req, res) => {
  const product = await Product.findOne({
    where: {
      id: req.params.id,
    }, 
    include: [{ 
      model: Tag, through: ProductTag, 
    },],
  })
  try {
    res.status(200).json(product)
  } catch (err) {
    res.status(500).json(err)
  }
});

// create new product
router.post('/', async (req, res) => {
  const product = await Product.create(req.body)
  const productTagIdArr = req.body.tagIds.map((tag_id) => {
    return {
      product_id: product.id,
      tag_id,
    }
  })

  const productTagIds = await ProductTag.bulkCreate(productTagIdArr)

  try {
    if (req.body.tagIds && req.body.tagIds.length) {
      return res.status(200).json(productTagIds)
    } else {
      return res.status(200).json(product);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

// update product
router.put('/:id', async (req, res) => {
  // update product data
  const product = await Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  // find all associated tags from ProductTag
  const productTags = await ProductTag.findAll({ where: { product_id: req.params.id } });
  const productTagIds = productTags.map(({ tag_id }) => tag_id);
  // create filtered list of new tag_ids
  const newProductTags = req.body.tagIds
    .filter((tag_id) => !productTagIds.includes(tag_id))
    .map((tag_id) => {
      return {
        product_id: req.params.id,
        tag_id,
      };
    });

  // figure out which ones to remove
  const productTagsToRemove = productTags
    .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
    .map(({ id }) => id)

  const updatedProductTags = await Promise.all([
    ProductTag.destroy({ where: { id: productTagsToRemove } }),
    ProductTag.bulkCreate(newProductTags),
  ])

  try {
    if (req.body.tagIds && req.body.tagIds.length) {
      return res.json(updatedProductTags)
    } else {
      return res.json(product);
    }
  } catch (err) {
    res.status(400).json(err);
  }
})

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  const products = await Product.destroy({
    where: {
      id: req.params.id,
    },
  })
  try {
    res.json(products);
  } catch (err) {
    res.status(400).json(err);
  };
});

module.exports = router;
