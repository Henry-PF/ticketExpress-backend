const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rutas_empresa', {
    id_ruta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'rutas',
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
    tableName: 'rutas_empresa',
    schema: 'public',
    timestamps: false,
    ssl: '[object Object]',
    indexes: [
      {
        name: "rutas_empresa_pkey",
        unique: true,
        fields: [
          { name: "id_ruta" },
          { name: "id_empresa" },
        ]
      },
    ]
  });
};
