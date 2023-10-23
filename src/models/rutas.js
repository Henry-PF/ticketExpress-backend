const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rutas', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    origen: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'terminales',
        key: 'id'
      }
    },
    destino: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'terminales',
        key: 'id'
      }
    },
    fecha_salida:{
      type: DataTypes.DATE,
      allowNull: false
    },
    hora_llegada: {
      type: DataTypes.TIME,
      allowNull: false
    },
    hora_salida: {
      type: DataTypes.TIME,
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
    tableName: 'rutas',
    schema: 'public',
    timestamps: false,
    ssl: '[object Object]',
    indexes: [
      {
        name: "rutas_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
