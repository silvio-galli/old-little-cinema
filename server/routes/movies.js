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
  let { tmdb_id, imdb_id, title, original_title, director, overview, poster_path, cast, genres, production_countries, release_date, runtime, tagline, original_language } = req.body;
  Movie.findOne({tmdb_id}, (err, movie) => {
    if (movie) {
      res.json({
        success: false,
        message: "This movie already exist in the local database"
      });
      return
    } else {
      Movie.create({ tmdb_id, imdb_id, title, original_title, director, overview, poster_path, cast, genres, production_countries, release_date, runtime, tagline, original_language })
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

// update movie details
router.post('/:movieId/update', (req,res,next) => {
  console.log( "REQ.BODY --->", req.body )
  let movieId = req.params.movieId;
  let data = {
    external_links: req.body.external_links,
    trailer: req.body.trailer
  };
  Movie.findByIdAndUpdate(movieId, data, {new: true})
  .then( updatedMovie => {
    console.log( "UPDATED MOVIE --->", updatedMovie );
    res.json({
      success: true,
      updatedMovie
    });
  })
  .catch( err => next(err));
});


module.exports = router;
