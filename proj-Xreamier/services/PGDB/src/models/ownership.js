'use strict';
module.exports = (sequelize, DataTypes) => {
    var Ownership = sequelize.define('Ownership', {
        owner_id: DataTypes.INTEGER,
        ticket_id: DataTypes.INTEGER
    }, {});
    Ownership.associate = function() {};
    return Ownership;
};