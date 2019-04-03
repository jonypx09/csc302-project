'use strict';
module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        permissions: DataTypes.INTEGER
    }, {});
    User.associate = function() {};
    return User;
};