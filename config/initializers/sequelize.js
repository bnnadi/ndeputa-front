module.exports = function(done) {

    done = (typeof done === 'function') ? done : function() {};


    console.log('Initializer: Sequelize started');
    var models = require(__dirname + '/../../app/models');

    models.sequelize.sync().then(function() {
        console.log('Initializer: Sequelize completed');
    });

};