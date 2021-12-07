const User = require('../models/user');

// db operations here
exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;

  const user = await User.findOneAndUpdate(
    { email: email },
    { name: email.split('@')[0], picture: picture },
    { new: true }
  );

  if (user) {
    console.log('USER UPDATED', user);
    res.json(user);
  } else {
    const newUser = await new User({
      email: email,
      name: email.split('@')[0],
      picture: picture,
    }).save();
    console.log('USER CREATED', newUser);
    res.json(newUser);
  }
};

exports.currentUser = async (req, res) => {
  await User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};