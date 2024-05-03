
const { Router } = require("express"); // Desestructuración: traigo de Express solo ese método "Router"

const router = Router(); // Con esto Express permitirá la creación de las rutas



// Llamo al servidor de Express

const express = require("express");

const cors = require("cors");

const dbConnection = require("../database/database");



// Creo el servidor con una clase

class Server {
  // Creo los atributos que quiero que tenga la clase

  constructor() {
    // This. va a apuntar a toda nueva instancia apuntada con cada nueva variable del Server.
    // La propiedad (app) será heredada a los hijos de  la clase "Server".

    this.app = express();

    this.port = process.env.PORT; // Aquí va la variable de entorno. Otro programador puede cambiarla.

    // Ruta dedicada a los endpoints

    this.catsPath = "/rutasGatos"; // localhost:5050/rutasGatos (Endpoint)

    // En ese Endpoint, las solicitudes Put, Patch, Post, Delete que se hagan van a ser controladas por el servidor.

   
    // Ejecuto los MIDDLEWARES: son intermediarios entra la llamada del cliente y la respuesta del servidor.
    // Son PROTECCIONES: (contraseñas, usuarios malintencionados, info, que llega errónea)

    this.middlewares(); // Se ejecutan automáticamente cuando se instancia la clase.

    // Las rutas:

    this.routes(); // Quiero que lea las rutas de X archivo (routes)

    // Se inicia la base de datos

    this.conectarDB();
  }

  // Conecto a la Base de Datos

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());

    // Creo los MIDDLEWARES

    this.app.use(express.json()); // la variable App tiene el poder de "Express". Que haga uso de express.json.
    // Toma la info que le llega del cliente y la transforma en un objeto json para ser leída y manipulada.

    //Le decimos que como archivo principal para mostrar en el servidor, utilice el HTmL que hicimos recién.

    this.app.use(express.static("public")); // localhost:5050 (si la pruebo, va a devolver el HTML)

    // Instalo CORS: Controla la transferencia de origen cruzado.
    //               Puedo limitar desde donde pueden hacerle peticiones a mi servidor.
    // Terminal: npm install cors

    // this.app.use((cors))  // Le decimos a la variable "app" que use Cors. (La paso arriba)
  }

  routes() {
    this.app.use(this.catsPath, require("../Routes/rutasGatos")); // Que la ruta catsPath tome los controladores que las requiera de routes-
  }

  listen() {
    //
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en puerto ${this.port}`);
    });
  }
}

module.exports = Server; // Exporto la clase  para que pueda ser utilizada en otro lado.
