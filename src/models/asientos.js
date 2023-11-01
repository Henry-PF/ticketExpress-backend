const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('asientos', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    asiento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reservado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    tiempo_expiracion: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW
    },
    id_buses: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'buses_rutas',
        key: 'id',
      },
    },

  }, {
    sequelize,
    tableName: 'asientos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "asientos_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

