const express = require('express');
const router = express.Router();
const destinationsCtrl =require('../controllers/destinations')

//POST /flights/:id/destinations
router.post('/flights/:id/destinations', destinationsCtrl.create);
//Add a feature to delete a flight’s ticket
//DELETE a individual ticket, using the id
///flights/:id/destinations


module.exports = router;