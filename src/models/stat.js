const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Stat = Schema({
    dna: {
        type: String,
        require: true,
        unique: true
    },
    match: {
        type: Boolean,
        require: true
    },
    nxn: {
        type: Number,
        require: true
    },
    number:{
        type: Number,
        require: true,
        default: 1
    }
})

module.exports = mongoose.model("stat", Stat)