const jwt = require("jsonwebtoken");
const { config } = require("../config");
const jwtSecret = config.JWT_SECRET;

const generateToken = (payload) => {
  const token = jwt.sign(payload, jwtSecret, { expiresIn: "30d" });
  return token;
};
const generateMagicLink = (payload) => {
  // Set the expiration time to 15 minutes from now
  const expiresIn = Math.floor(Date.now() / 1000) + 1 * 60;
  // Add the expiration time to the payload
  const payloadWithExp = { ...payload, exp: expiresIn };
  // Generate a new token with the updated payload
  return jwt.sign(payloadWithExp, jwtSecret);
};

const verifyToken = (token) => {
  const payload = jwt.verify(token, jwtSecret);
  return payload;
};
const generateResetPasswordToken = (payload) => {
  const token = jwt.sign(payload, jwtSecret, { expiresIn: "3m" });
  return token;
};

module.exports = {
  generateToken,
  verifyToken,
  generateMagicLink,
  generateResetPasswordToken,
};
