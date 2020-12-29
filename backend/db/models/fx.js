'use strict';
module.exports = (sequelize, DataTypes) => {
  const Fx = sequelize.define('Fx', {
    title: DataTypes.STRING,
    audio: DataTypes.STRING,
    artwork: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Fx.associate = function(models) {
    // associations can be defined here
  };
  return Fx;
};