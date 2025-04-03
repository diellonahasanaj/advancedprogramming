const User = require('../models/userModel');
const { generateToken } = require('../middleware/authMiddleware');

exports.register = async (req, res) => {
  try {
    // Validimi bazik
    if (!req.body.email || !req.body.password || !req.body.name) {
      return res.status(400).json({ error: 'Email, password and name are required' });
    }

    // Kontrollo nëse emaili ekziston
    if (User.findByEmail(req.body.email)) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const user = await User.create(req.body);
    const userResponse = {
      id: user.id,
      email: user.email,
      name: user.name,
      address: user.address,
      registrationDate: user.registrationDate
    };

    res.status(201).json(userResponse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUser = (req, res) => {
  const user = User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    address: user.address,
    registrationDate: user.registrationDate,
    lastLogin: user.lastLogin
  });
};

exports.getCurrentUser = (req, res) => {
  const user = User.findById(req.userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    address: user.address,
    registrationDate: user.registrationDate,
    lastLogin: user.lastLogin
  });
};

exports.updateUser = (req, res) => {
  const updates = req.body;
  // Mos lejo ndryshimin e email ose password direkt këtu
  delete updates.email;
  delete updates.password;

  const updatedUser = User.update(req.params.id, updates);
  if (!updatedUser) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json({
    id: updatedUser.id,
    email: updatedUser.email,
    name: updatedUser.name,
    address: updatedUser.address,
    registrationDate: updatedUser.registrationDate,
    lastLogin: updatedUser.lastLogin
  });
};