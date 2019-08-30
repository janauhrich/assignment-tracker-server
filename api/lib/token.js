const { SECRET_KEY } = process.env;
const { sign, verify } = require("jsonwebtoken");

// using the verify feature from the jsonwebtoken library and the the secret_key environment variable verify the token. Returns token.
const decodeToken = token => verify(token, SECRET_KEY);

const generateToken = (id, admin) => {
  // take the id of the user as a parameter and set that to the payload
  const payload = { id, admin };
  // set the options to expire in 1 day
  const options = { expiresIn: "1 day" };
  // using the sign feature from the jsonwebtoken library create a token with the userId, expiration date and secret_key environment variable. Returns token.
  return sign(payload, SECRET_KEY, options);
};

module.exports = { decodeToken, generateToken };
