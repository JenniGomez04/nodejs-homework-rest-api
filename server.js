const app = require("./app");
const mongoose = require("mongoose");
require('dotenv').config();
// Obtener las variables de entorno
const { DB_URI, PORT } = process.env;

// Conectar a la base de datos MongoDB usando Mongoose
mongoose
  .connect(DB_URI)
  .then(() => app.listen(PORT), console.log("Database connection successful"))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

//haFOayrf3PihbqLQ
// mongodb+srv://jennifer:haFOayrf3PihbqLQ@cluster0.mx5sxfs.mongodb.net/   Conexion a compass
// mongodb+srv://jennifer:haFOayrf3PihbqLQ@cluster0.mx5sxfs.mongodb.net/db-contacts?retryWrites=true&w=majority  // conexion a github
