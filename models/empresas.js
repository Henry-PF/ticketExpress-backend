const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('empresas', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_datos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'datos',
        key: 'id'
      }
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
    tableName: 'empresas',
    schema: 'public',
    timestamps: false,
    ssl: '[object Object]',
    indexes: [
      {
        name: "empresas_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
