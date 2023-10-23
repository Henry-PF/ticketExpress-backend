const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ciudades', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_provincia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'provincias',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'ciudades',
    schema: 'public',
    timestamps: false,
    
    indexes: [
      {
        name: "ciudades_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
