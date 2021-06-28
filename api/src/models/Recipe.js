const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    dishSummary: {
      type: DataTypes.STRING,
      allowNull: false
    },
    score:{
        type: DataTypes.INTEGER
    },
    healthyFoodLevel:{
        type: DataTypes.INTEGER
    },
    stepByStep:{
        type: DataTypes.TEXT
    }
  });
};
