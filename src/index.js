


// Ejecución del Servidor

require ('dotenv').config()  // Configuración para leer la variable de entorno

const Server = require ('./models/server')  // Traigo la clase Server.

const server = new Server() // Que sea una nueva instancia de la variable que traje. 

server.listen()