var express = require('express');
const Movie = require('../models/movie')

var router = express.Router();

// Route to get all countries
router.get('/', (req, res, next) => {
  Movie.find()
  .then(movies => {
    res.json(movies);
  })
  .catch(err => next(err))
});

router.post('/', (req, res, next) => {
  let { movieDbId, title, originalTitle, director, plot, poster, cast, genres, productionCountries, releaseDate,
    length } = req.body;
  Movie.create({ movieDbId, title, originalTitle, director, plot, poster, cast, genres, productionCountries, releaseDate,
    length })
  .then( newMovie => {
    res.json({
      success: true,
      newMovie
    });
  })
  .catch( err => next(err));
});


module.exports = router;
