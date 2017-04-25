'use strict'

var envok = require('envok');
var Joi = require('joi');

const config = envok({
  NODE_ENV: Joi.string().required().allow('development', 'staging', 'production'),
  RRN_APP_PORT: Joi.number().required().min(3000).max(9000),
  RRN_COOKIE_DOMAIN: Joi.string().empty(""),
  RRN_SNS_TOPIC: Joi.string().required()
})

console.log(config);

module.exports = config;
