const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://majoromero23:majopozos23A.15@cluster1.jorvx.mongodb.net/<nombre_base_de_datos>';
const Product = require('./src/models/Product');

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Conectado a MongoDB');
    const data = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'));
    await Product.insertMany(data);
    console.log('Datos importados correctamente');
    process.exit();
  })
  .catch(err => {
    console.error('Error al conectar o importar:', err);
    process.exit(1);
  });
