var _ = require('underscore');

var envCfg = require('../../env'),
  constants = require('../constants'),
  util = require('util'),
  Boom = require('boom');

var ApiController = {

  login(request, reply) {

    reply('OK');

  },

  logout: function (request, reply) {

    reply({}).unstate(constants.tokenCookieName);

  },

  createResponder: function(request, reply) {

  },

  removeResponder: function(request, reply) {

  },

  getResponders: function(request, reply) {

  }
};


module.exports = ApiController;
