///////////////////////////////
// Import Dependencies
///////////////////////////////
require('dotenv').config()
const mongoose = require('../config/database')
const Flight = require('./flight')

mongoose.connect(process.env.DATABASE_URL)
///////////////////////////////
// Seed Script Code
///////////////////////////////
// save the connection in a variable
const db = mongoose.connection
// console.log('db in seed file', db)

db.on('open', () => {
    // start with an array of movies
    const startFlights = [
        {
            airline: 'American Airlines',
            airport: 'EWR',
            flightNo: 1233,
            departs: Date.now() + 365 * 24 * 60 * 60 * 1000
        },
        {
            airline: 'Delta',
            airport: 'LAX',
            flightNo: 1234,
            departs: Date.now() + 365 * 24 * 60 * 60 * 1000
        },
    ]
// when we seed data, we want to delete everything in the database in that collection
// this avoids duplicates

Flight.deleteMany({})
.then(deletedFlights => {
    console.log('this is what deleteMany returns', deletedFlights)
    Flight.create(startFlights)
        .then(data => {
            console.log('this is what was created', data)
            db.close()
        })
        .catch(err => {
            console.log(err)
            db.close()
        })
})
.catch(err => {
    console.log(err)
    db.close()
})
})