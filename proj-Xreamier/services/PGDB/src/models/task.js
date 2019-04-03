'use strict';
module.exports = (sequelize, DataTypes) => {
  var Task = sequelize.define('Task', {
    user_id: DataTypes.INTEGER,
    task_title: DataTypes.STRING,
    task_msg: DataTypes.STRING,
    completed: DataTypes.BOOLEAN
  }, {});
  Task.associate = function() {
    // associations can be defined here
  };
  return Task;
};