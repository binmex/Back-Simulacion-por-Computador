//importar dependencias
const jwt = require("jwt-simple");
const moment = require("moment");

//clave secreta
const secret = "CLAVE_SECRETA_SIMULACION_12345678";

//crear funcion para generar token
const createToken = (user) => {
  const payload = {
    name: user.username,
    password: user.password,
    role: user.role,
    iat: moment().unix(),
    exp: moment().add(1, "days").unix(),
  };
  //devolver token codificado
  return jwt.encode(payload, secret);
};

module.exports = {
  secret,
  createToken,
};
