var express = require('express');
var router = express.Router();
const statMongo = require('../src/models/stat')


/**
 * 
 * Muestra las estadísticas guardadas
 * 
 */
router.get('/', function(req, res, next) {

  statMongo.find().then(data =>{
    if (data && data.length) {
      let mutation = data.filter(dna => dna.match).reduce((a,b)=> a + b.number, 0)
      let no_mutation = data.filter(dna => !dna.match).reduce((a,b)=> a + b.number, 0)
      res.send({
        "count_mutations": mutation,
        "count_no_mutation": no_mutation,
        "ratio": no_mutation > 0 ? (mutation / no_mutation).toFixed(2) : 1
      })
    } else {
      res.send({
        "count_mutations": 0,
        "count_no_mutation": 0,
        "ratio": 0
      })
    }
  })

});

module.exports = router;
