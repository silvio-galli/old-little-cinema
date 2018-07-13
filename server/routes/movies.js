var express = require('express');
const Movie = require('../models/movie')

var router = express.Router();

// Route to get all movies
router.get('/', (req, res, next) => {
  Movie.find()
  .then(movies => {
    res.json(movies);
  })
  .catch(err => next(err))
});

// get one movie
router.get('/:movieId', (req, res, next) => {
  Movie.findById(req.params.movieId)
  .then(movie => {
    res.json(movie);
  })
  .catch(err => next(err))
});

// create one movie into the local database
router.post('/', (req, res, next) => {
  let { movieDbId, title, originalTitle, director, plot, poster, cast, genres, productionCountries, releaseDate,
    length } = req.body;
  Movie.findOne({movieDbId}, (err, movie) => {
    if (movie) {
      res.json({
        success: false,
        message: "This movie already exist in the local database"
      });
      return
    } else {
      Movie.create({ movieDbId, title, originalTitle, director, plot, poster, cast, genres, productionCountries, releaseDate, length })
      .then( newMovie => {
        res.json({
          success: true,
          newMovie
        });
      })
      .catch( err => next(err));
    }
  })
  
});


module.exports = router;
