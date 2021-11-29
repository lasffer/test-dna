var express = require("express");
const stat = require("../src/models/stat");
var router = express.Router();
const statMongo = require("../src/models/stat");

/**
 * Expresiones regulares para el tratado de los Array
 */
const regExpCheck = new RegExp(/[^ATCG]/, "i");
const regExpMatch = new RegExp(/[A]{4,}|[T]{4,}|[C]{4,}|[G]{4,}/, "i");

/**
 *
 * Chequea si hay un matuación
 *
 */
router.post("/", checkDada, function (req, res, next) {
  if (hasMutation(req.body.dna)) {
    res.status(200).send({ status_text: "DNA_SUCCESS" });
    saveDNA(req.body.dna, true);
  } else {
    res.status(403).send({ status_text: "DNA_NOT_MATCH" });
    saveDNA(req.body.dna, false);
  }
});

/**
 *
 * Permite saber si existe una mutación o no.
 *
 * @param {string[]} dna Array con la lista de DNA
 * @returns true si es una mutación, false, caso contrario
 */
function hasMutation(dna) {
  let numMatch = 0;
  numMatch += checkMatch(dna);
  if (numMatch < 2) {
    numMatch += checkMatch(generateVerticalArray(dna));
    if (numMatch < 2) {
      numMatch += checkMatch(generateDiagonalArrayRight(dna));
      if (numMatch < 2) {
        numMatch += checkMatch(generateDiagonalArrayLeft(dna));
        if (numMatch < 2) {
          return 0;
        }
      }
    }
  }
  return 1;
}

/**
 *
 * Middleware que corrobora que los datos enviados en el body sean los correctos.
 *
 */
function checkDada(req, res, next) {
  if (
    req.body.dna
      ? isNxN(req.body.dna) && containValuesAllowed(req.body.dna)
      : false
  ) {
    next();
  } else {
    res.status(403).send({ status_text: "DNA_NOT_FOUND" });
  }
}

/**
 * Comprueba si la matriz es cuadrada y con cadenas de 4 o más.
 *
 * @param {string[]} array Lista a corroborar
 * @returns true si es NxN, false en caso contrario
 */
function isNxN(array) {
  let num = array.length;
  return (
    num >= 4 &&
    array.every((element) => {
      return element.length == num;
    })
  );
}

/**
 *
 * Permite saber si las letras de cada cadena pertenecen al universo de letras permitidas.
 *
 * @param {string[]} array Array de string a corroborar
 * @returns true si son letras permitidas, false, en caso contrario
 */
function containValuesAllowed(array) {
  return array.every((element) => {
    return !regExpCheck.test(element);
  });
}

/**
 * Permite saber la cantidad de martch que hay en una cadena de string.
 *
 * @param {string[]} array Array a chequear
 * @returns La cantidad de match que encontró
 */
function checkMatch(array) {
  let match = 0;
  array.forEach((element) => {
    regExpMatch.test(element) ? match++ : null;
  });
  return match;
}

/**
 * Permite generar un array de las verticales
 *
 * @param {string[]} array Array base
 * @returns Devuelve un array con las diagonales
 */
function generateVerticalArray(array) {
  let newArray = [];
  for (let index = 0; index < array.length; index++) {
    let preArray = [];
    for (let index2 = 0; index2 < array[index].length; index2++) {
      preArray.push(array[index2][index]);
    }
    newArray.push(preArray.join(""));
  }
  return newArray;
}

/**
 * Permite generar un array de las diagonales del borde superior izquierdo hacia el borde
 * inferior derecho.
 *
 * @param {string[]} array Array base
 * @returns Devuelve un array con las diagonales
 */
function generateDiagonalArrayRight(array) {
  let yStart = array.length - 4;
  let newArray = [];
  for (let index = 0; index < yStart; index++) {
    let preArray = [];
    let regresion = 0;
    for (let index2 = 0; yStart + index2 - index < array.length; index2++) {
      preArray.push(array[yStart + index2 - index][regresion]);
      regresion++;
    }
    newArray.push(preArray.join(""));
  }
  for (let index = 0; index <= yStart; index++) {
    let preArray = [];
    let regresion = 0;
    for (let index2 = 0; index2 + index < array.length; index2++) {
      preArray.push(array[regresion][index2 + index]);
      regresion++;
    }
    newArray.push(preArray.join(""));
  }
  return newArray;
}

/**
 * Permite generar un array de las diagonales del borde superior derecha hacia el borde
 * inferior izquierda
 *
 * @param {string[]} array Array base
 * @returns Devuelve un array con las diagonales
 */
function generateDiagonalArrayLeft(array) {
  let xStart = 3;
  let newArray = [];
  for (let index = 0; index < array.length - xStart; index++) {
    let preArray = [];
    let regresion = 0;
    for (let index2 = 0; xStart + index - index2 >= 0; index2++) {
      preArray.push(array[regresion][xStart + index - index2]);
      regresion++;
    }
    newArray.push(preArray.join(""));
  }
  for (let index = 0; index < array.length - xStart - 1; index++) {
    let preArray = [];
    let regresion = array.length - 1;
    for (let index2 = 0; xStart - index + index2 - 1 < array.length; index2++) {
      preArray.push(array[xStart - index + index2 - 1][regresion]);
      regresion--;
    }
    newArray.push(preArray.join(""));
  }
  return newArray;
}

/**
 * Permite guardar en la base de datos un DNA.
 *
 * @param {string[]} dna Cadena de DNA a guardar
 * @param {boolean} match Indica si es una mutación o no
 */
function saveDNA(dna, match) {
  statMongo.findOneAndUpdate(
    {
      dna: dna.join(""),
    },
    {
      $set: {
        nxn: dna.length,
        match,
      },
      $inc: {
        number: 1,
        __v: 1
      },
    },
    {
      upsert: true,
    },
    (err) => {
      if (err) console.log("Error");
    }
  );
}

module.exports = router;
