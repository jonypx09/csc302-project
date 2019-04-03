'use strict';
module.exports = (sequelize, DataTypes) => {
    var Ticket = sequelize.define('Ticket', {
        status: DataTypes.INTEGER
    }, {});
    Ticket.associate = function() {};
    return Ticket;
};