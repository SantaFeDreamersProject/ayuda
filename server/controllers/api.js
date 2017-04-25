var _ = require('underscore');

var envCfg = require('../../env'),
  constants = require('../constants'),
  utils = require('./utils'),
  Boom = require('boom');

const data = require('../data')

var ApiController = {

  login(request, reply) {

    reply('OK');

  },

  logout: function (request, reply) {

    reply({}).unstate(constants.tokenCookieName);

  },

  getCallout: function(request, reply) {

    let promise = data.Callout.get(request.params.id)

    utils.standardResponse(promise, request, reply)

  },

  createCallout: function(request, reply) {

    let promise = data.Callout.create(request.payload)

    utils.standardResponse(promise, request, reply)

  },

  createResponse: function(request, reply) {

    let promise = data.Callout.get(request.payload.CalloutId)
      .then(callout => {
        if (callout) {
          return data.Response.create(request.payload)
        }
      })

    utils.standardResponse(promise, request, reply)

  },

  createResponder: function(request, reply) {

    let promise = data.Responder.create(request.payload)
      .then(responder => subscribeToSNS(responder.phone))

    utils.standardResponse(promise, request, reply)
  },

  removeResponder: function(request, reply) {

    let promise = data.Responder.remove(request.params.id)

    utils.standardResponse(promise, request, reply)

  },

  getResponders: function(request, reply) {

    let promise = data.Responder.getAll()

    utils.standardResponse(promise, request, reply)

  }
};


module.exports = ApiController;


/**
 * Sign up responder to SNS topic
 * @param  {[type]} phoneNumber [description]
 * @return [type]               [description]
 */
function subscribeToSNS(phoneNumber) {

  const sns = new AWS.SNS();

  const params = {
    Endpoint: phoneNumber,
    Protocol: 'sms',
    TopicArn: envCfg.rrnSnsTopic
  };

  return new Promise((ful, rej) => {
    sns.subscribe(params, function(err, data) {
      if (err) return rej(err)
      ful(data)
    });

  })

}
