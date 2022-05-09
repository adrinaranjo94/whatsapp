const jwt = require("jsonwebtoken");

const validateJWT = (req, res, next) => {
  try {
    const token = req.header("x-token");

    if (!token) {
      return res.status(401).json({
        ok: false,
        message: "Token not valid",
      });
    }

    const { uid, name } = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.uid = uid;
    req.name = name;

    next();
  } catch (err) {
    return res.status(401).json({
      ok: false,
      message: "Token not valid",
    });
  }
};

module.exports = { validateJWT };
