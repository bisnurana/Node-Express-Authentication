const Joi = require('joi');

module.exports = {
  validateFields(req, res, next) {
    const schema = {
      email: Joi.string().email().required(),
      password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{8,32}$')).required(),
    };
    const { error, value } = Joi.validate(req.body, schema);
    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({ error: 'Please provide valid email address' });
          break;
        case 'password':
          res.status(400).send({ error: 'Please provide your correct email and password' });
          break;
        default:
          res.status(400).send({ error: 'Invalid credentials' });
      }
    } else {
      next();
    }
  },
};
