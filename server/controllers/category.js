const Category = require('../models/category')
const Product = require('../models/product')
const Sub = require('../models/sub')
const slugify = require('slugify')

// db operations here
exports.create = async (req, res) => {
  try {
    const { name } = req.body
    const category = await new Category({
      name: name,
      slug: slugify(name),
    }).save()
    res.json(category)
  } catch (err) {
    res.status(400).send('Create category failed')
  }
}

exports.list = async (req, res) => {
  const allCate = await Category.find({}).sort({ createAt: -1 }).exec()
  res.json(allCate)
}

exports.read = async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug }).exec()
  const products = await Product.find({ category: category })
    .populate('category')
    .exec()
  res.json({
    category: category,
    products: products,
  })
}

exports.update = async (req, res) => {
  const { name } = req.body
  try {
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name: name, slug: slugify(name) },
      { new: true }
    )
    res.json(updated)
  } catch (err) {
    res.status(400).send('Update category failed')
  }
}

exports.remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({ slug: req.params.slug })
    res.json(deleted)
  } catch (err) {
    res.status(400).send('Delete category failed')
  }
}

exports.getSubs = async (req, res) => {
  const subs = await Sub.find({ parent: req.params._id }).exec()
  res.json(subs)
}
