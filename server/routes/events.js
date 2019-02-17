var express = require('express')
const Event = require('../models/event')

var router = express.Router()

// GET /events
router.get('/', (req, res, next) => {
  Event.find()
  .populate('_movies')
  .populate('_movie')
  .then(events => {
    res.json(events.reverse())
  })
  .catch(err => next(err))
})

// GET /events/last/:n default 15 elements 
router.get('/last/:n', (req, res, next) => {
  Event.find({})
  .sort({'created_at': -1})
  .limit(req.param.n)
  .populate('_movies')
  .populate('_movie')
  .then(events => {
    res.json(events.reverse())
  })
  .catch(err => next(err))
})

// GET /events/:id
router.get('/:eventId', (req,res,next) => {
  Event.findById(req.params.eventId)
  .populate('_movies')
  .populate('_movie')
  .then( event => {
    res.json(event)
  })
  .catch(err => next(err))
})

// POST /events
router.post('/', (req, res, next) => {
  let { kind, title, subtitle, tagline, promo, dates, showtimes, _movies, _movie } = req.body;

  let event = new Event({ kind, title, subtitle, tagline, promo, dates, showtimes, _movies, _movie })

  event.save()
  // populate _movie and _movies to have movie data available on front
  .then(saved => Event.populate(saved, {path:"_movie"}) )
  .then(populated => Event.populate(populated, {path:"_movies"}) ) 
  .then( newEvent => {
    let response = {
      success: true,
      newEvent
    }
    res.json(response)
  })
  .catch( err => next(err))
})

// PUT /events/:id
router.post('/:eventId', (req, res, next) => {
  console.log("Triggered update event -->", req.body)
  let { public, kind, title, subtitle, tagline, promo, dates, showtimes, _movies, _movie } = req.body;
  Event.findByIdAndUpdate( req.params.eventId, { public, kind, title, subtitle, tagline, promo, dates, showtimes, _movies, _movie }, {new: true} )
  .populate('_movie')
  .populate('_movies')
  .then( updated => {
    let response = {
      success: true,
      updated
    }
    res.json(response)
  })
  .catch( err => next(err))
})

// DELETE /events/:id
router.delete('/:eventId', (req, res, next) => {
  Event.findByIdAndRemove(req.params.eventId)
  .then(() => {
    res.json({
      success: true
    })
  })
  .catch(err => {
    res.json({
      success: false,
      error: err
    })
  })
})


module.exports = router;
