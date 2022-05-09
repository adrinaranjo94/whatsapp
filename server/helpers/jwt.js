const jwt = require("jsonwebtoken");

const generateJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
      name,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Error while generate JWT");
        } else {
          resolve(token);
        }
      }
    );
  });
};

const validateJWT = (token = "") => {
  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY);

    return [true, uid];
  } catch (error) {
    return [false, null];
  }
};

module.exports = { generateJWT, validateJWT };
