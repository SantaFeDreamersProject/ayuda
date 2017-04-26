const AWS = require("aws-sdk"),
  _ = require('underscore'),
  constants = require('../constants'),
  utils = require('./utils'),
  Boom = require('boom'),
  envCfg = require('../../env');

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

    let responder;

    let promise = data.Responder.create(request.payload)
      .then(result => responder = result)
      .then(() => subscribeToSNS(responder.Phone))
      .then(() => sendMessageToPhoneNumber(responder.Phone, "You've been added to the RRN responder list."))

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
 * SNS helper
 * @param  {[type]} method [description]
 * @param  {[type]} params [description]
 * @return [type]          [description]
 */
function _sns(method, params) {

  const sns = new AWS.SNS();

  return new Promise((ful, rej) => {
    sns[method](params, function(err, data) {
      if (err) return rej(err)
      ful(data)
    });

  })

}

/**
 * Sign up responder to SNS topic
 * @param  {[type]} phoneNumber [description]
 * @return [type]               [description]
 */
function subscribeToSNS(phoneNumber) {

  return _sns("subscribe", {
    Endpoint: `+1${phoneNumber}`,
    Protocol: 'sms',
    TopicArn: envCfg.rrnSnsTopic
  })

}

function sendMessageToPhoneNumber(phoneNumber, message) {

  return _sns("publish", {
    Message: message,
    PhoneNumber: `+1${phoneNumber}`
  })

}

function sendMessageToSNS(message) {

  return _sns("publish", {
    Message: message,
    TargetArn: envCfg.rrnSnsTopic
  })

}
