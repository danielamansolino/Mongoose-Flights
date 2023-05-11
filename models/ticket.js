// first we bring in the mongoose module
const mongoose = require('mongoose')

// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema


// create the ticketSchema
const ticketSchema = new Schema({
    seat: { 
        type: String,
        match: /[A-F][1-9]\d?/
    },
    price: { 
        type: Number,
        min: 0,
    },
    flight: {
        type: Schema.Types.ObjectId,
        ref: 'Flight'
    }
        
    
},{
    timestamps: true
})

module.exports = mongoose.model('Ticket', ticketSchema);