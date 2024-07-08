const jwt = require("jwt-simple");
const moment = require("moment");

const secret = process.env.SECRET_KEY;

const createToken = (user) => {
  const payload = {
    name: user.username,
    password: user.password,
    role: user.role,
    iat: moment().unix(),
    exp: moment().add(1, "days").unix(),
  };
  return jwt.encode(payload, secret);
};

const decodeToken = (token) => {
  try{
    const decoded = jwt.decode(token,secret);
    return decoded
  }catch(error){
    throw new Error('Invalid Token')
  }
}

module.exports = {
  secret,
  createToken,
  decodeToken
};
