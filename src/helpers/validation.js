import Joi from 'joi';

const schema = {
  fname: Joi.string().alphanum().min(3).max(30)
    .required(),
  lname: Joi.string().alphanum().min(3).max(30)
    .required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),

  email: Joi.string().email({ minDomainAtoms: 2 }),

  userid: Joi.number().integer()
    .required,
  reciepientname: Joi.string().alphanum().min(3).max(30)
    .required(),
  weight: Joi.number().integer()
    .required(),
  destinationtown: Joi.string().alphanum().min(3).max(30)
    .required(),
  destinationcountry: Joi.string().alphanum().min(3).max(30)
    .required(),
  postcode: Joi.string().alphanum().min(3).max(30),
  phone: Joi.number().integer().min(10),
};

export default {
  schema,
};
