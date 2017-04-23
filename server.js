const envCfg = require('./env');

const startServer = () => {

  var server = require('./server/factory').create();

  server.start(function (err) {

    if (err) {
      return console.error(err);
    };

    console.log('App server listening on:', envCfg.rrnAppPort);

  });

}

startServer();
