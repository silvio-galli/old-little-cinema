require('dotenv').config()
var express = require('express');
const Movie = require('../models/movie')
const axios = require('axios');

const service = axios.create({
  baseURL: 'https://api.themoviedb.org/3/'
});

var router = express.Router();

// GET /movies local DB
router.get('/', (req, res, next) => {
  Movie.find()
  .then(movies => {
    res.json(movies);
  })
  .catch(err => next(err))
})

// SEARCH local DB by title
router.get('/search', (req, res, next) => {
  let query = new RegExp(req.query.title, "gi")
  Movie.find({title: query})
  .then(movies => {
    res.json(movies)
  })
  .catch(err => next(err))
})

// GET movies from tMDB
router.get('/tmdb/search', (req, res, next) => {
  console.log("SEARCHING TMDB ---------------------")
  console.log("req.query -->", req.query)
  let page = !req.query.page ? 1 : req.query.page;
  console.log("Page -->", page)
  service.get(`search/movie?api_key=${process.env.MOVIEDB_API_KEY}&query=${req.query.title}&page=${page}`)
  .then(response => {
    console.log("response from tmdb -->", response)
    res.json(response.data);
  })
  .catch(err => next(err))
});

// GET movie details from theMovieDB.org
router.get('/details/:movieId', (req, res, next) => {
  console.log("SEARCHING MOVIE DETAILS ---------------------")
  service.get(`movie/${req.params.movieId}?api_key=${process.env.MOVIEDB_API_KEY}&append_to_response=credits`)
  .then(response => {
    console.log("response from tmdb -->", response)
    res.json(response.data);
  })
  .catch(err => next(err))
});

// GET one local movie
router.get('/:movieId', (req, res, next) => {
  Movie.findById(req.params.movieId, (err, movie) => {
    if (err) {                                       // TODO: see LocalMovie.js
      Movie.findOne({ tmdb_id: req.params.movieId }) // try to find the movie first by Id
      .then(movie => {                               // and then with the tmdb_id
        res.json(movie);                             // because filteredMovies in Admin.js
      })                                             // cannot access the _id of newly added movies 
      .catch(err => next(err))
    } else {
      res.json(movie);
    }
  })
});

// POST one movie into the local database
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

// PUT movie details
router.post('/:movieId', (req,res,next) => {
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
