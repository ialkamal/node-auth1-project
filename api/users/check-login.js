module.exports = function (req, res, next) {
  const session = req.session.user;
  if (session) next();
  else res.status(403).send("You are not authorized.");
};
