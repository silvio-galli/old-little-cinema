var express = require('express')
const Event = require('../models/event')

var router = express.Router()

// Route to get all events
router.get('/', (req, res, next) => {
  Event.find()
  .populate('_movies')
  .populate('_movie')
  .then(events => {
    res.json(events)
  })
  .catch(err => next(err))
})

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
  Event.create( { kind, title, subtitle, tagline, promo, dates, showtimes, _movies, _movie } )
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
  let { kind, title, subtitle, tagline, promo, dates, showtimes, _movies, _movie } = req.body;
  Event.findByIdAndUpdate( req.params.eventId, { kind, title, subtitle, tagline, promo, dates, showtimes, _movies, _movie }, {new: true} )
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
