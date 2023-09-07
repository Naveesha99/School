const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    _id: {
        type: Number,
    },
    studentid: {
        type: Number,
    },
    name: {
        type: String,
    },
    age: {
        type: Number,
    },
    marks: {
        type: Number,
    }
});

const Record = mongoose.model('studentrecord', Schema);
module.exports = Record;
