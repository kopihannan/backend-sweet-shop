const jwt = require("jsonwebtoken");

const jsonAuthToken = (user) => {
  const jwtSecretKey = process.env.JWT_SCRCET_KEY;
  const token = jwt.sign(
    { _id: user._id, name: user.name, email: user.email },
    jwtSecretKey
  );

  return token;
};

module.exports = jsonAuthToken;
