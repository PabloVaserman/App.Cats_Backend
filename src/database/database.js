// Conexión a la base de datos

const mongoose = require("mongoose");
const dbConnection = async () => {
  try {
    await mongoose.connect(
     `${process.env.ACCESS}`
     // "mongodb+srv://pablovaser:gIvosxknchV3jx8o@proyecto-final.hawzdiy.mongodb.net/"  // LO reemplazo por una variable de entorno
    );
    console.log("Base de datos on line");
  } catch (error) {
    throw new Error("Error en el proceso de iniciar la base de datos");
  }
};

module.exports = dbConnection;