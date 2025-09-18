module.exports = {
  requireLogin: (req, res, next) => {
    if (!req.session.userId) {
      return res.redirect('/auth/login'); // hoặc res.status(401).json({error: 'Unauthorized'})
    }
    next();
  }
};
