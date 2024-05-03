// Creación del esquema, modelo de la DB

const { Schema, model } = require("mongoose");

const CatsSchema = new Schema({
  
  name: { type: String, required: [true, "El nombre es obligatorio"] },
  breed: { type: String },
  weight: { type: Number },
 temperament: { type: String },
  description: { type: String },
  image: {type: String, required: [true, "Debe ingresar una imagen del gato"]},
  estado: { type: Boolean, default: true },
  email: { type: String, required: [true, "El email de contacto es obligatorio"]}
});



const Cats = model("Cats", CatsSchema);

module.exports = Cats;  // "Cats" se lleva los atributos del modelo.-