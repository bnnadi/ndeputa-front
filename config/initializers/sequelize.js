var Sequelize = require('sequelize');

module.exports = function(done) {

    done = (typeof done === 'function') ? done : function() {};

    const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'mysql' | 'sqlite' | 'postgres' | 'mssql',

        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },

        // SQLite only
        storage: 'path/to/database.sqlite'
    });

    console.log('Initializer: Sequelize started');



    require('@bnnadi/bisikennadi-utils').v1BisikeNnadi();


    console.log('Initializer: Sequelize completed');

};