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
   *  [BEGIN] API routes
   */


   server.route({
     method: "POST",
     path: "/api/callout",
     handler: apiController.createCallout,
     config: {
       validate: {
         payload: {
           Name: Joi.string().required(),
           Phone: Joi.string().required(),
           Location: Joi.string().required(),
           Details: Joi.string().required()
         }
       }
     }
   });

   server.route({
     method: "GET",
     path: "/api/callouts/{id}",
     handler: apiController.getCallout,
     config: {
       validate: {
         params: {
           id: Joi.string().required()
         }
       }
     }
   });

   server.route({
     method: "POST",
     path: "/api/response",
     handler: apiController.createResponse,
     config: {
       validate: {
         payload: {
           CalloutId: Joi.string().required(),
           Name: Joi.string().required(),
           Phone: Joi.string().required(),
           CanRespond: Joi.string().required(),
           Eta: Joi.string().required()
         }
       }
     }
   });

   server.route({
     method: "POST",
     path: "/api/responder",
     handler: apiController.createResponder,
     config: {
       validate: {
         payload: {
           Name: Joi.string().required(),
           Phone: Joi.string().required(),
           Bilingual: Joi.string().required(),
           Location: Joi.string().required()
         }
       }
     }
   });

   server.route({
     method: "GET",
     path: "/api/responders",
     handler: apiController.getResponders
   });


   /**
    *  [END] API routes
    */



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
   * END Routes
   ****************************/

  return server;

}
