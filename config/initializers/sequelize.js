module.exports = function(done) {

    done = (typeof done === 'function') ? done : function() {};

    var models = require(__dirname + '/../../app/models');

    models.sequelize.sync().then(function() {

        server.listen(port, function() {
            debug('Express server listening on port ' + server.address().port);
        });
        server.on('error', onError);
        server.on('listening', onListening);
    });

    console.log('Initializer: Sequelize started');



    require('./app/models');


    console.log('Initializer: Sequelize completed');

};