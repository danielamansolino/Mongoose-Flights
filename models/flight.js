// first we bring in the mongoose module
const mongoose = require('mongoose')

// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema


//function for the date 
// const oneYearFromNow = function() { return new Date(Date.now() + 365*24*60*60000);};

// function oneYearFromNow() {
//     const today = new Date()
//     const oneYearFromNow = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())
//     return oneYearFromNow
// }

// create the destinationSchema
const destinationSchema = new Schema({
    airport: { 
        type: String,
        enum: ['EWR','ATL', 'AUS', 'DFW', 'DEN', 'LAX', 'SAN', 'UIO'],
        default: 'EWR',
        required: true

    },
    arrival: {
        type: Date, 
        default: function() {
            // I know that you have see this before in our lessons but don't get into the bad habit of using single letter variables. Be meaningful in your variable names
            let d = new Date()
            return d.setFullYear(d.getFullYear() +1)
        },
        // default:() => Date.now() + 365*24*60*60000,
        require: true,
        validate: (value) => {
        if (value < new Date()) {
        throw new Error('Date must be one year from now')
        }
        }
    }
},{
    timestamps: true
})


// now we'll create our mongoose schema
// this schema will serve as the blueprint for our model
// we define properties(aka paths) and assign data types to those properties
const flightSchema = new Schema({
    airline: { 
        type: String,
        enum: ['American Airlines','Delta', 'Southwest', 'Spirit', 'United', 'Jet Blue'],
        required: true

    },
    airport: { 
        type: String,
        enum: ['EWR','ATL', 'AUS', 'DFW', 'DEN', 'LAX', 'SAN', 'UIO'],
        default: 'EWR',
        required: true

    },
    flightNo: { 
        type: Number,
        min: 10,
        max: 9999,
        require: true
     }, 
    departs: { 
        type: Date, 
        // default: oneYearFromNow,
        default: function() {
            // Same comment as above
            let d = new Date()
            return d.setFullYear(d.getFullYear() +1)
        },
        // default:() => Date.now() + 365*24*60*60000,
        require: true,
        validate: (value) => {
            if (value < new Date()) {
             throw new Error('Date must be one year from now')
           }
        }
    },
    destinations: [destinationSchema]
}, {
    timestamps: true
});


// we want to compile our schema into a model
// we also want to export our model
// and we can do that in one line
// we call the model method from the mongoose object
// the model method takes two arguments
// the first is the NAME we want to use to refer to the model, capitalized
// the second is the schema to use to create the model
module.exports = mongoose.model('Flight', flightSchema);