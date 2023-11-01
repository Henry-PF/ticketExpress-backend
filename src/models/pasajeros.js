const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('pasajeros', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_datos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'datos',
        key: 'id'
      }
    },
    asiento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_statud: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'statud',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'pasajeros',
    schema: 'public',
    timestamps: false,

    indexes: [
      {
        name: "pasajeros_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
