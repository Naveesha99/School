var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SSchema = Schema({
    _id:Number,
    studentid:Number,
    StudentName:Number,
    IndexDate:{type: Date, maxLength: 20}
});

const student = mongoose.model('student', SSchema);
module.exports = student;