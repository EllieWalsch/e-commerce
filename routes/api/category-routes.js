const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
  // Find all categories including their associated products
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  } 
  // Find one category by its `id` value including its accociated products
});
 

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);

    res.status(200).json(categoryData);

  } catch (err) {
    res.status(500).json(err);
  }
  // Create a new category
});

router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(categoryData);

  } catch (err) {
    res.status(500).json(err);
  }
  // Update a category by its id value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
