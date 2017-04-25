var util = require('util'),
  _ = require('underscore');

function ConflictError(message) {
  Error.call(this);
  this.message = message;
}

function ForbiddenError(message) {
  Error.call(this);
  this.message = message;
}

function UnauthorizedError(message) {
  Error.call(this);
  this.message = message;
}

function InternalError(message) {
  Error.call(this);
  this.message = message;
}

function InvalidRequestError(message) {
  Error.call(this);
  this.message = message;
}

function NotFoundError(message) {
  Error.call(this);
  this.message = message;
}

var errors = {
  ConflictError: ConflictError,
  NotFoundError: NotFoundError,
  ForbiddenError: ForbiddenError,
  UnauthorizedError: UnauthorizedError,
  InternalError: InternalError,
  InvalidRequestError: InvalidRequestError
};

_.each(errors, function (type) {
  util.inherits(type, Error);
});

module.exports = errors;
