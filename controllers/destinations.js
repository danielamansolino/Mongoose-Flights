const Flight = require('../models/flight')

function create(req, res) {
    Flight.findById(req.params.id)
        .then((flight)=> {
            flight.destinations.push(req.body);
            return flight.save()
            .then((flight) => {
                res.redirect(`/flights/${flight._id}`);
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