const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('reserva', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true, 
        },
        origen: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        destino: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        partida: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        regreso: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        cantidadPasajeros: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        viajeIda: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    }, {
        sequelize,
        tableName: 'reserva',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: "reserva_pkey",
            unique: true,
            fields: [
              { name: "id" },
            ]
          },
        ]
    })
}