const Sub = require('../models/sub');
const slugify = require('slugify');

// db operations here
exports.create = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const sub = await new Sub({
      name: name,
      parent: parent,
      slug: slugify(name),
    }).save();
    res.json(sub);
  } catch (err) {
    res.status(400).send('Create sub failed');
  }
};

exports.list = async (req, res) => {
  const allSub = await Sub.find({}).sort({ createAt: -1 }).exec();
  res.json(allSub);
};

exports.read = async (req, res) => {
  let sub = await Sub.findOne({ slug: req.params.slug }).exec();
  res.json(sub);
};

exports.update = async (req, res) => {
  const { name, parent } = req.body;
  try {
    const updated = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name: name, parent: parent, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send('Update sub failed');
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Sub.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send('Delete sub failed');
  }
};
