const Cats = require("../models/catsEsquema");

const { validationResult } = require("express-validator"); // Permite verificar si los Middlewares funcionaron o devolvieron algún error.

// Es útil para el proyecto en donde tengo que colocar Middlewares personalizados.

const validarCampos = (req, res, next) => {
  // Es el Middleware general.
  // Va a fijarse si toda la serie de validadores (password,mail, etc.) funciona correctamente.

  const errors = validationResult(req); // La constante tendrá a  v.R. tomando el request (petición del cliente).

  // Si hay algún, lo mostrará "errors"

  if (!errors.isEmpty()) {
    // Si "errors" tiene algo adentro, devuelvo una respuesta.

    return res.status(400).json({
      errores: errors.array(),

      // "errores" va a tener el listado de errores que devuelve "validationResult" transformado en un array.
    });
  }

  next(); // Si no hay errores ejecutamos "next()"

  // Es para que si todo está bien, pase al siguiente intermediario y al final se ejecute el controlador.
};

// El siguiente es un controlador PERSONALIZADO:

const emailExiste = async (email) => {
  // Del objeto REQUEST recibe solo el correo.

  const gato = await Cats.findOne({email: email }); // Busco el único gato que existe con ese correo.

  if (gato) {
    // Si existe, arroja "error".

    throw new Error("El correo ya está registrado");
    // El error se acumula en "validarCampos".
    // Lo toma "validationResult" y lo mostrará.
  }

 // next();
};

// Otro controlador personalizado:

const existeGatoPorId = async (id) => {
  // Recibo el ID.

  const gato = await Cats.findById(id); // Verifica si el gato existe por su ID.  


  if (!gato) {
    // si el gato no está...

    throw new Error("El gato no existe");
  }
};

module.exports = {
  // Exporto los métodos para poder usarlos en las rutas.

  validarCampos,
  emailExiste,
  existeGatoPorId,
};
