const express = require('express');
const router = express.Router();
const flightCtrl = require('../controllers/flights');
const { MongoNetworkTimeoutError } = require('mongodb');

/* GET flight create form. */
// this route is /movies/new
router.get('/new', flightCtrl.new);
// GET all movies
// this route is /movies
router.get('/', flightCtrl.index)

// POST flights cretion 
// this route is /movies
router.post('/', flightCtrl.create);

//Get an individual movie using the id
router.get('/:id', flightCtrl.show)


module.exports = router;
