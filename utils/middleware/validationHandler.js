const boom = require('@hapi/boom');

function validate(data, schema) { // eslint-disable-line
  const { error } = schema.validate(data);
  return error;
}

function validationHandler(schema, check = "body") { // eslint-disable-line
  return function (req, res, next) {
    const error = validate(req[check], schema);
    error ? next(boom.badRequest(error)) : next();
  }
}

module.exports = {
  validationHandler
}