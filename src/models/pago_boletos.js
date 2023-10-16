const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pago_boletos', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_boleto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'boletos',
        key: 'id'
      },
      unique: "pago_boletos_id_boleto_key"
    },
    tipo: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    ref: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'pago_boletos',
    schema: 'public',
    timestamps: false,
    ssl: '[object Object]',
    indexes: [
      {
        name: "pago_boletos_id_boleto_key",
        unique: true,
        fields: [
          { name: "id_boleto" },
        ]
      },
      {
        name: "pago_boletos_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
