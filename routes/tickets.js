const express = require('express')
const router = express.Router()
const ticketsCtrl = require('../controllers/tickets')

// /tickets/new
router.get('/flights/:id/tickets/new', ticketsCtrl.new)
// /performers
router.post('/flights/:id/tickets', ticketsCtrl.create)
// // /performers/movies/<movieId>/addToCast
// router.post('/:id/addTicket', ticketsCtrl.addTicket)

module.exports = router