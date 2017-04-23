'use strict'

let Joi = require('joi'),
  _ = require('underscore'),
  path = require('path'),
  envCfg = require('../env'),
  apiController = require('./controllers/api');

module.exports = function(server) {

  return _applyRoutes(server);

};

let commonLocals = {
  environment: envCfg.environment
};


function _applyRoutes(server) {

  /****************************
   * BEGIN Routes
   */

  server.route({
    method: 'GET',
    path: '/static/{param*}',
    handler: {
      directory: {
        path: path.normalize(__dirname + '/../public')
      }
    }
  });

  /**
   * Login action route
   */
  server.route({
    method: "POST",
    path: "/login",
    handler: apiController.login,
    config: {
      validate: {
        payload: {
          email: Joi.string().email().required(),
          password: Joi.string().required()
        }
      }
    }
  });

  /**
   * Logout route
   */
  server.route({
    method: "POST",
    path: "/logout",
    handler: apiController.logout,
    config: {}
  });


  /**
   * The general app route
   */
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: function (request, reply) {

      reply.view('main', _.extend(commonLocals, {
        user: {},
        packageVersion: require('../package.json').version
      }));

    }
  });


  /**
   *  [BEGIN] API routes
   */

   server.route({
     method: "POST",
     path: "/responder",
     handler: apiController.createResponder,
     config: {
       validate: {
         payload: {
           name: Joi.string().name().required(),
           phone: Joi.string().required(),
           bilingual: Joi.string().required(),
           location: Joi.string().required()
         }
       }

     }
   });


   /**
    *  [END] API routes
    */

  /**
   * END Routes
   ****************************/

  return server;

}
