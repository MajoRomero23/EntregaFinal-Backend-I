require('dotenv').config();
console.log("Valor de MONGO_URI:", process.env.MONGO_URI);
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true
      }
    });
    console.log("Conectado exitosamente a MongoDB Atlas");
  } catch (error) {
    console.error("Error al conectar con MongoDB Atlas:", error);
    process.exit(1);
  }
};

module.exports = connectDB;