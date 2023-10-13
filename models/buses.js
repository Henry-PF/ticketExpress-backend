const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('buses', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    modelo: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    marca: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    placa: {
      type: DataTypes.STRING(10),
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
    ssl: '[object Object]',
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
