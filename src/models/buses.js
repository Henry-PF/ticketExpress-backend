const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('buses', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false
    },
    placa: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "buses_placa_key"
    },
    capacidad: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    tableName: 'buses',
    schema: 'public',
    timestamps: false,

    indexes: [
      {
        name: "buses_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "buses_placa_key",
        unique: true,
        fields: [
          { name: "placa" },
        ]
      },
    ]
  });
};
