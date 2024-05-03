const axios = require("axios");
const Cats = require("../models/catsEsquema"); // modelo
const Cat = require("../models/catsEsquema"); // gato


// Controlador POST

const postCatsController = async (req, res) => {
  try {
    const { name, breed, weight, temperament, description, image, email } =
      req.body;

    const newCat = new Cat({
      name,
      breed,
      weight,
      temperament,
      description,
      image,
      email,
    });

    await newCat.save();

    res.json({
      msg: "Gato agregado correctamente",
      data: newCat,
    });
  } catch (error) {
    res.status(404).send(error);
  }
};

// Controlador GET

const getDBCatsController = async (_, res) => {
  // Traigo info. de la DB

  try {
    const dbCats = await Cats.find(); // Busca todos los gatos de la DB y los guarda en la variable
    res.status(200).send(dbCats);
  } catch (error) {
    res.status(404).send(error);
  }
};
// Traigo Info. de la API

const getAPICatsController = async (_, res) => {
  try {
    const getCats = await axios.get(
      "https://api.thecatapi.com/v1/images/search?limit=10"
    ); // "https://api.thecatapi.com/v1/images/search?api_key=live_AobOkMoyr0o9iiRGeePXcgCmMYDqZqTCzPXmJaGmK2V8uiG6CW1FUUdFGrwJmSUt&limit=10"
    const getAllCats = getCats.data; // Filtro la info de los gatos del resto que recibo

    res.status(200).send(getAllCats); // Responde al Front enviándole los gatos.
  } catch (error) {
    res.status(500).send(error);
  }
};

// Controlador PUT

const putCatsController = async (req, res) => {
  try {
    const { id } = req.params; // Lo busco por ID

    const { name, breed, weight, temperament, description } = req.body; // Elementos que voy a actualizar

    const gatoActualizado = await Cats.findByIdAndUpdate(id, req.body); // Actualizo los valores que quiero

    res.json({
      msg: "El gato fue actualizado",
      gatoActualizado,
    });
  } catch (error) {
    res.status(404).send(error);
  }
};

// controlador DELETE

const deleteCatsController = async (req, res) => {
  try {
    const { id } = req.params;

    await Cats.findByIdAndUpdate(id, { estado: false });

    res.json({
      msg: "El gato fue dado de baja con éxito",
    });
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  postCatsController,
  getDBCatsController,
  getAPICatsController,
  putCatsController,
  deleteCatsController,
};
