const mongoose = require("mongoose");

/**
 * Conexión a la base de datos.
 */
mongoose
  //.connect("mongodb://localhost:27017/testadn")
  .connect(
    "mongodb+srv://adn:<pass>@adn.yukvn.mongodb.net/testadndb?retryWrites=true&w=majority"
  )
  .then((status) => {
    console.log('Conectado a la DB');
  })
  .catch((e) => console.log(e));
