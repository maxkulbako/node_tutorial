const authorize = (req, res, next) => {
  const { user } = req.query;
  if (user === "max") {
    req.user = { name: "max", id: 3 };
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

module.exports = authorize;
