const Product = require('../models/product')
const User = require('../models/user')
const slugify = require('slugify')
const { query } = require('express')

// db operations here
exports.create = async (req, res) => {
  try {
    console.log(req.body)
    req.body.slug = slugify(req.body.title)
    const newProduct = await new Product(req.body).save()
    res.json(newProduct)
  } catch (err) {
    console.log(err)
    // res.status(400).send('Create product failed');
    res.status(400).json({
      err: err.message,
    })
  }
}

exports.listAll = async (req, res) => {
  let products = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate('category')
    .populate('subs')
    .sort([['createdAt', 'desc']])
    .exec()
  res.json(products)
}

exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec()
    res.json(deleted)
  } catch (err) {
    console.log(err)
    res.status(400).send('Product delete failed')
  }
}

exports.read = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate('category')
    .populate('subs')
    .exec()
  res.json(product)
}

exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title)
    }
    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec()
    res.json(updated)
  } catch (err) {
    console.log('PRODUCT UPDATE ERROR ====>', err)
    res.status(400).json({
      err: err.message,
    })
  }
}

// WITHOUT PAGINATION
// exports.list = async (req, res) => {
//   try {
//     const { sort, order, limit } = req.body
//     const products = await Product.find({})
//     .populate('category')
//     .populate('subs')
//     .sort([[sort, order]])
//     .limit(limit)
//     .exec()

//     res.json(products)
//   } catch (err) {
//     console.log(err);
//   }
// };

// WITH PAGINATION
exports.list = async (req, res) => {
  console.log(req.body)
  try {
    const { sort, order, page } = req.body
    const currentPage = page || 1
    const perPage = 3

    const products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate('category')
      .populate('subs')
      .sort([[sort, order]])
      .limit(perPage)
      .exec()

    res.json(products)
  } catch (err) {
    console.log(err)
  }
}

exports.productsCount = async (req, res) => {
  let total = await Product.find({}).estimatedDocumentCount().exec()
  return res.json(total)
}

exports.productStar = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec()
  const user = await User.findOne({ email: req.user.email }).exec()
  const { star } = req.body

  // Who is updating?
  // check if currently logged in user has already added rating to this product?
  let existingRatingObj = product.ratings.find(
    (rating) => rating.postedBy.toString() === user._id.toString()
  )

  // if user hasn't left rating yet, push it
  if (existingRatingObj === undefined) {
    const ratingArr = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star: star, postedBy: user._id } },
      },
      { new: true }
    ).exec()
    console.log('rating added: ', ratingArr)
    res.json(ratingArr)
  } else {
    // if user has already left rating, update it
    const ratingArr = await Product.updateOne(
      {
        ratings: { $elemMatch: existingRatingObj },
      },
      { $set: { 'ratings.$.star': star } },
      { new: true }
    ).exec()
    console.log('rating updated: ', ratingArr)
    res.json(ratingArr)
  }
}

exports.listRelated = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec()

  const related = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  })
    .limit(3)
    .populate('category')
    .populate('subs')
    .populate('postedBy')
    .exec()
  res.json(related)
}

// search filter
const handleQuery = async (res, query) => {
  const products = await Product.find({ $text: { $search: query } })
    .populate('category', '_id name')
    .populate('_id name')
    .populate('postedBy', '_id name')
    .exec()
  res.json(products)
}

const handlePrice = async (res, price) => {
  try {
    const products = await Product.find({
      price: {
        $gte: price[0],
        $lte: price[1],
      },
    })
      .populate('category', '_id name')
      .populate('subs', '_id name')
      .populate('postedBy', '_id name')
      .exec()

    console.log('189 -----> ', products)
    res.json(products)
    console.log('191 -----> ', products)
  } catch (error) {
    console.log(error)
  }
}

const handleCategory = async (req, res, category) => {
  try {
    const products = await Product.find({ category })
      .populate('category', '_id name')
      .populate('subs', '_id name')
      .populate('postedBy', '_id name')
      .exec()
    res.json(products)
  } catch (error) {
    console.log(error)
  }
}

exports.searchFilters = async (req, res) => {
  const { query, price, category } = req.body

  if (query) {
    await handleQuery(res, query)
  }

  if (price !== undefined) {
    await handlePrice(res, price)
  }

  if (category) {
    console.log(category)
    await handleCategory(req, res, category)
  }
}
