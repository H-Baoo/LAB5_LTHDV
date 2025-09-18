const User = require('../models/User');

exports.showRegister = (req, res) => res.render('register');
exports.showLogin = (req, res) => res.render('login');
exports.showForgot = (req, res) => res.render('forgot');

exports.register = async (req, res) => {
  try {
    const { username, password, email, phone } = req.body;
    const user = new User({ username, password, email, phone });
    await user.save();
    req.session.userId = user._id;
    res.redirect('/');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.render('login', { error: 'Invalid credentials' });
    }
    req.session.userId = user._id;
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Login error');
  }
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send('Logout failed');
    res.clearCookie('connect.sid');
    res.redirect('/auth/login');
  });
};
