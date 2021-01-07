const boom = require('@hapi/boom');
const joi = require('@hapi/joi');

function validate(data, schema) { // eslint-disable-line
  const { error } = joi.validate(data, schema);
  return error;
}

function validationHandler(schema, check = "body") { // eslint-disable-line
  return function (req, res, next) {
    const error = validate(req[check], schema);
    error ? next(boom.badRequest(error)) : next();
  }
}