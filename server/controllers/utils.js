'use strict'

var Promise = require('bluebird'),
  errors = require('./errors'),
  boom = require('boom'),
  _ = require('underscore');

module.exports = {

  /**
   * Accept a promise, and based on the outcome send a reply
   *
   * @param promise
   * @param reply
   * @param request
   */
  standardResponse: function (promise, request, reply) {

    Promise.resolve(promise)
      .then(function (doc) {

        if (!doc) return reply(boom.notFound());

        reply(doc)

      })
      .catch(errors.ConflictError, function (err) {
        return reply(boom.wrap(err, 409));
      })
      .catch(errors.InvalidRequestError, function (err) {
        return reply(boom.wrap(err, 400));
      })
      .catch(errors.NotFoundError, function (err) {
        return reply(boom.wrap(err, 404));
      })
      .catch(errors.ForbiddenError, function (err) {
        return reply(boom.wrap(err, 403));
      })
      .catch(errors.UnauthorizedError, function (err) {
        return reply(boom.wrap(err, 401));
      })
      .catch(function (err) {

        console.warn("Unknown error type caught in standard response handler", err.message);
        console.warn(err.stack);
        let code = 500;
        reply(boom.wrap(err, code));
      });
  },

  /**
   * Find a doc, or boom!
   *
   * @param promise
   * @param ErrorType
   * @returns {Promise}
   */
  findOrThrow: function (promise, ErrorType) {

    ErrorType = ErrorType || errors.NotFoundError;

    return Promise.resolve(promise)
      .then(function (doc) {
        if (!doc) throw new ErrorType();
        return doc;
      });

  },

  coerceArray(val) {
    if (!val) return val
    return Array.isArray(val) ? val : [val]
  }

};
