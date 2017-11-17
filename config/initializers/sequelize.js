module.exports = function(done) {

    done = (typeof done === 'function') ? done : function() {};

    var models = require(__dirname + '/../../app/models');

    models.sequelize.sync().then(function() {
        console.log('Initializer: Sequelize started');
    });

    console.log('Initializer: Sequelize completed');


};