const { Router } = require("express"); // Desestructuración: traigo de Express solo ese método "Router"

const router = Router(); // Con esto Express permitirá la creación de las rutas
// const gatos = require("../listado/portada")

// const router=express.Router()

const { check, param } = require("express-validator"); // Checkea la información que viene y la compara con la que uno le diga.

// ACA

const {
  deleteCatsController,
  postCatsController,
  putCatsController,
  getDBCatsController,
  getIDCatsController,
  getAPICatsController,
} = require("../controllers/catsControllers"); // Lógica de importación de los controladores. Desestructuración.

const {
  validarCampos,
  emailExiste,
  existeGatoPorId,
} = require("../middlewares/validators"); // Traigo los validadores con desestructuración.

// LAS RUTAS

// Middlewares: router.post("/", [MIDDLEWARE], usuariosPost ---> validador-controlador)

// router.get("/", getDBCatsController); // Listado de los gatos en adopción en la DB

router.get("/listado", getDBCatsController); // Listado de los gatos en adopción en la DB (Ruta secundaria: Listado)

router.get("/galeria", getAPICatsController); // Listado de la API

router.post(
  "/postear",
  [
    // MIDDLEWARES

    check("name", "El nombre es obligatorio").not().isEmpty(), // Checkea la propiedad nombre. Si el nombre está vacío, le mando un mensaje de error.

    // Cada validador se separa por una coma.

    check(
      "description",
      "La descripción debe tener más de 6 caracteres"
    ).isLength({
      min: 6,
    }), // Detecta la cantidad con este método.

    // Verifica que tenga un mínimo de seis.

    check("email", "El correo no es válido").isEmail(), // Se fija si tiene el formato de correo electrónico.

    check("email").custom(emailExiste),
    validarCampos,
  ],
  postCatsController
);

// Con "custom" le indico que es un Middleware propio.
// Antes de cerrarlo, tengo que validar que ninguno de los checkeos haya dado error. Para eso utilizo "validarCampos".
//

// xxxxxxxxxxxxxxxxxxxxxxxxxx!!!!!!!!
// Hacer una ruta para obtener gatos por ID (lo uso en el listado, EN LA PRIMER SOLICITUD)
router.get(
  "/gatos/:id",
  getIDCatsController

  // CREAR getCatsController usando método "findbyID"
);

router.put(
  "/editar/:id",
  [
    param("id", "No es un ID válido").isMongoId(),
    param("id").custom(existeGatoPorId),

    // check("_id", "No es un ID válido").isMongoId(),
    // check("_id").custom(existeGatoPorId),

    validarCampos,
  ],
  putCatsController
);

// router.put(
// "/:id",
//  [
//  param(("id"), "No es un ID válido").isMongoId(),
//  param(("id")).custom(existeGatoPorId),

//  validarCampos,
// ],
// putCatsController
// );

router.delete(
  "/:id",
  [
    param("id", "No es un ID válido").isMongoId(),
    param("id").custom(existeGatoPorId),

    // check("id", "No es un ID válido").isMongoId(), // Verifica si el "id" es válido. Luego revisa que sea uno válido de Mongo DB

    // check("id").custom(existeGatoPorId), // Chequea si el "id" existe.

    validarCampos,
  ],
  deleteCatsController
);

// Exporto las rutas

module.exports = router;
