const Flight = require('../models/flight')

function create(req, res) {
    Flight.findById(req.params.id)
        .then((flight)=> {
            flight.destinations.push(req.body);
            return flight.save()
            .then((flight) => {
                res.redirect(`/flights/${flight._id}`);
                // Don't need the second .catch because the first one will catch any errors that happen in this promise chain
            }).catch((err) => {
                console.log(err);
                res.status(500).send('Error: ' + err);
            });
        }).catch((err) => {
            console.log(err);
            res.status(500).send('Error: ' + err);
          });
}

// DELETE function


module.exports = {
    create
}