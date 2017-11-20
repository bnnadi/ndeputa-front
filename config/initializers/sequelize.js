module.exports = function(done) {

    done = (typeof done === 'function') ? done : function() {};


    console.log('Initializer: Sequelize started');

    var models = require(BACKEND + '/models');

    models.sequelize.sync().then(function() {
        done();
    });

    console.log('Initializer: Sequelize completed');

};