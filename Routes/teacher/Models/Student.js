var mongoose = require('mongoose');
const Schema =mongoose.Schema;
const SSchema = new Schema({
    _id:Number,
    studentid:Number,
    name:String,
    age:Number,
    studentcontact:number
});

const Student = mongoose.model('student', SSchema);
module.exports = Student;