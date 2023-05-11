const Ticket = require('../models/ticket')
const Flight = require('../models/flight')

// // /tickets/new
// router.get('/new', ticketsCtrl.new)
function newTicket(req, res) {
    Flight.findById(req.params.id)
    .then(flightDoc => {
        res.render('tickets/new', {title: 'Add Ticket', flight: flightDoc}) 
    }).catch(err => {
        console.log('error in newTicket', err)

        res.send('error in new ticket check terminal')
    })
       
}
// // /tickets
// router.post('/', ticketsCtrl.create)
function create(req, res) {
    req.body.flight = req.params.id
    console.log('req.body in ticket create \n', req.body)
    // then we send the req.body to a model method to create
    Ticket.create(req.body)
        .then(ticket => {
            console.log('the new performer', ticket)

            res.redirect(`/flights/${req.params.id}`)
        })
        // handle any errors if they occur
        .catch(err => {
            console.log('error in newTicket', err)

            res.send('error in new ticket check terminal')
        })
}


// function addTicket(req, res) {
//     const ticket = new Ticket(req.body);
//     ticket.flight = req.params.id;
//     ticket.save(function (err) {
//       res.redirect(`/flights/${req.params.id}`);
//     });
//   }



// // // /tickets/flights/<fligthId>/addTicket
// // router.post('/flights/:id/addTicket', ticketsCtrl.addTicket)
// function addTicket(req, res) {
//     // we get the flight by its id
//     // then we add a ticket using their id(which will come from our request body)
//     // push the ticket id into the ticket array
//     // save the flight doc
//     // redirect to the fligth show page
//     Flight.findById(req.params.id)
//         .then(fligthDoc => {
//             fligthDoc.ticket.push(req.body.id)

//             return fligthDoc.save()
//         })
//         .then(fligthDoc => {
//             res.redirect(`/fligths/${fligthDoc.id}`)
//         })
//         .catch(err => {
//             console.log('error in newTicket', err)

//             res.send('error in addTicket check terminal')
//         })
// }

module.exports = {
    new: newTicket,
    create,
    // addTicket
}