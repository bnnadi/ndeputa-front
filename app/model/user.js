var Sequelize = require('sequelize');

var UserSchema = {
    user_id: Sequelize.INTEGER,
    username: Sequelize.STRING,
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    password: Sequelize.STRING,
    email: Sequelize.STRING,
    user_type: Sequelize.STRING,
    lastlogin: Sequelize.DATE,
    created_date: Sequelize.DATE,
    modified_date: Sequelize.DATE
};

module.exports = function(connection) {

    // if (!connection) {
    //     connection = mongoose;
    // }

    connection.define('v1User', UserSchema);

};