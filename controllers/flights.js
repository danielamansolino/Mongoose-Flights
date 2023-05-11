///////////////////////////////
// Import Dependencies
///////////////////////////////
// import the movie model
const Flight = require('../models/flight')
const Ticket = require('../models/ticket')

//////////////////////////////////////////////////////////////
// Define our controller functions
//////////////////////////////////////////////////////////////
function newFlight(req, res) {
    console.log('the new route has been hit')
    res.render('flights/new', {title:'New Flight'})
    }

function create(req, res) {
    console.log('this is the req. body in create\n', req.body)

    // the mongoose model method create adds a document to the db
    // mongoose model methods return a promise(actually it's called a thenable, but that's not worth getting into because they act almost exactly like promises)
    Flight.create(req.body)
        .then(flightDoc => {
            console.log('=== Below is the movie from the db ===')
            console.log(flightDoc)
            console.log('======================================')

        // return res.send(`Flight Created: ${flightDoc.title}`)
        // return res.redirect(`/flights/${flightDoc.id}`)
        return res.redirect('/flights')
    })
        .catch(err => {
            console.log('=================err')
            console.log(err)
            console.log('====================')

        return res.send('err creating, check the terminal')
    })

}

function index(req, res) {
    // tell the model, find all the flights in the db
    // send those flights back as a response
    // sending an empty object says "find EVERYTHING"
   Flight.find({})
        .then(flightDocs => {
            console.log('found all the flights\n', flightDocs)

            res.render('flights/index', {title:'Flights', flights: flightDocs })
        })
        .catch(err => {
            console.log('=================err')
            console.log(err)
            console.log('====================')

            return res.send('err creating, check the terminal')
        })
}

// function show(req, res) {
//     // we're going to use the model method findById
//     // findById takes a mongoDb id and finds the appropriate document
//     console.log('these are the request parameters\n', req.params)
//     Flight.findById(req.params.id)
//         .then(flight => {
//             console.log('this is the flight in show\n', flight)

//             // res.send(`found ${movie.title}`)
//             res.render('flights/show',{title:'Flight Details', flight: flight})
//         })
//         .catch(err => {
//             console.log('=================err')
//             console.log(err)
//             console.log('====================')

//             return res.send('err creating, check the terminal')
//         })
// }


// async function show(req, res) {
//     try {
//       const flightDoc = await Flight.findById(req.params.id);
//       console.log(flightDoc, 'show page');
  
//       const tickets = await Ticket.find({ flight: flightDoc._id });
//       console.log(tickets, 'tickets');
  
//       res.render('flights/show', {
//         title: 'Flight Details',
//         flight: flightDoc,
//         ticket: tickets
//       });
//     } catch (err) {
//       console.log(err, 'error getting to show page');
//       res.redirect('/flights');
//     }
//   }
  
function show(req, res) {
    Flight.findById(req.params.id)
      .then((flightDoc) => {
        console.log(flightDoc, 'show page');
        return Ticket.find({ flight: flightDoc._id })
          .then((tickets) => {
            console.log(tickets, 'tickets');
            res.render('flights/show', {
              title: 'Flight Details',
              flight: flightDoc,
              ticket: tickets
            });
          });
      })
      .catch((err) => {
        console.log(err, 'error getting to show page');
        res.redirect('/flights');
      });
  }
  
  
  
  
  




///////////////////////////////
// Export our modules
///////////////////////////////
module.exports = {
    // you can export like this
    new: newFlight,
    // or you can export like this
    create,
    index,
    show

}