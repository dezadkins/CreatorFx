("use strict");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Fx extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Fx.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Fx.init(
    {
      title: { type: DataTypes.STRING(40), allowNull: false },
      audio: { type: DataTypes.STRING, allowNull: false },
      artwork: { type: DataTypes.STRING },
      userId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Fx",
    }
  );
  return Fx;
};
