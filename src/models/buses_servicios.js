const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('buses_servicios', {
    id_bus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'buses',
        key: 'id'
      }
    },
    id_servicio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'servicios',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'buses_servicios',
    schema: 'public',
    timestamps: false,
    
    indexes: [
      {
        name: "buses_servicios_pkey",
        unique: true,
        fields: [
          { name: "id_bus" },
          { name: "id_servicio" },
        ]
      },
    ]
  });
};
