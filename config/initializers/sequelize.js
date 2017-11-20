module.exports = function(done) {

    done = (typeof done === 'function') ? done : function() {};


    console.log('Initializer: Sequelize started');

    var models = require(BACKEND + '/models');

    models.sequelize
        .authenticate()
        .then(function() {
            console.log('Connection has been established successfully.');
            console.log('Initializer: Sequelize completed');
            done();
        })
        .catch(function(err) {
            console.error('Unable to connect to the database:', err);
        });


};