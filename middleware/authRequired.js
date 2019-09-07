module.exports = (req, res, next) => {
  console.log(req.cookies.user_id, "COokie");
  if (!req.cookies.user_id) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized. Please login and try again"
    });
  }
  next();
};
