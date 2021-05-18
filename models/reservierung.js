const mongoose = require('mongoose')

const reservierungSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true

    },
    tel: {
        type: String,
        required: true

    },
    slot: {
        type: Number,
        required: false 

    },
    datum: {
        type: Date,
        required: true,
        default: Date.now

    }
})

module.exports = mongoose.model('Reservierung', reservierungSchema)
