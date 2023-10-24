const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('buses_rutas', {
    id_bus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'buses',
        key: 'id'
      }
    },
    id_ruta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'rutas',
        key: 'id'
      }
    },
    capacidad_disponible: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'buses_rutas',
    schema: 'public',
    timestamps: false,
    
    indexes: [
      {
        name: "buses_rutas_pkey",
        unique: true,
        fields: [
          { name: "id_bus" },
          { name: "id_ruta" },
        ]
      },
    ]
  });
};
