const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id },"sidd", {
    expiresIn: "30d",
  });
};

module.exports = generateToken;