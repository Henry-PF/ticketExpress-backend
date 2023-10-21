const Sequelize = require('sequelize')
module.exports =function (sequelize, DataTypes) {
  return sequelize.define('reserva', 
  {    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
    },
  },
  {
    timestamps: false
  });
  // Reserva.belongsTo(Usuario, { foreignKey: "usuarioId" });

  return Reserva;
};




 
 

