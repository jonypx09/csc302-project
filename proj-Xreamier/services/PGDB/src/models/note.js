'use strict';
module.exports = (sequelize, DataTypes) => {
    var Note = sequelize.define('Note', {
        poster_id: DataTypes.INTEGER,
        ticket_id: DataTypes.INTEGER,
        message: DataTypes.STRING,
        status: DataTypes.INTEGER,
        type: DataTypes.INTEGER
    }, {});
    Note.associate = function() {};
    return Note;
};