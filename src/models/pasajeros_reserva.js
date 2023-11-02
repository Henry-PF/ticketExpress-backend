const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pasajeros_reserva', {
    id_reserva: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'reserva',
        key: 'id'
      }
    },
    id_pasajero: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'pasajeros',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'pasajeros_reserva',
    schema: 'public',
    timestamps: false,
    
    indexes: [
      {
        name: "pasajeros_reserva_pkey",
        unique: true,
        fields: [
          { name: "id_reserva" },
          { name: "id_pasajero" },
        ]
      },
    ]
  });
};
