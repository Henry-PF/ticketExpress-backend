const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "review",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        /* references: {
          model: "usuarios",
          key: "id",
        }, */
      },
      puntos: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contenido: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "review",
      schema: "public",
      timestamps: false,
    }
  );
};
