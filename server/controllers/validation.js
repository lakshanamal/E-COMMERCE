const Joi = require("@hapi/joi");

const registerAuth = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

// const loginAuth=(data)=>{
//   const shema=Joi.object({
//     email:Joi.string().min(5).required().email(),
//     password:Joi.string().min(6).required()
//   })
// }

// module,exports.loginAuth=loginAuth;
module.exports.registerAuth = registerAuth;
