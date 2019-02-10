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

// create new event
router.post('/', (req, res, next) => {
  let { kind, title, subtitle, tagline, promo, dates, showtimes, _movies, _movie } = req.body;
  Event.create( { kind, title, subtitle, tagline, promo, dates, showtimes, _movies, _movie } )
  .then( newEvent => {
    console.log("SERVER: New event created ->", newEvent)
    let response = {
      success: true,
      newEvent
    }
    console.log("SERVER response ->", response)
    res.json(response)
  })
  .catch( err => next(err))
})

// delete one event
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
