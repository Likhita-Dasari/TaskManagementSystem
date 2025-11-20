const admin = (req, res, next) => {
  //checking if the role is matched or not
  if (req.user && req.user.role === "admin") {
    return next();
  }

  return res.status(403).send({
    message: "Admin access required",
  });
};

module.exports = admin;
