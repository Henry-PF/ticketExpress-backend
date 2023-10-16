const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('buses_empresa', {
    id_bus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'buses',
        key: 'id'
      }
    },
    id_empresa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'empresas',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'buses_empresa',
    schema: 'public',
    timestamps: false,
    ssl: '[object Object]',
    indexes: [
      {
        name: "buses_empresa_pkey",
        unique: true,
        fields: [
          { name: "id_bus" },
          { name: "id_empresa" },
        ]
      },
    ]
  });
};
