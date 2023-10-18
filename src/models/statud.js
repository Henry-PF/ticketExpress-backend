const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('statud', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    tipo: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'statud',
    schema: 'public',
    timestamps: false,
    ssl: '[object Object]',
    indexes: [
      {
        name: "statud_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};