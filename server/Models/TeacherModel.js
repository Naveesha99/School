const mongoose = require('mongoose');

const TeacherShema = new mongoose.Schema({
    TeacherID: {
        type: String,
        required: [true, "Teacher ID is Required"],
        unique: true
    },

    TeacherName: {
        type: String,
        required: [true, "Teacher name is required"]
    },

    TeacherEmail: {
        type: String,
        required: [false]
    },

    Subject: {
        type: String,
        required: [true, "Subject name is required"]
    },

    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports= mongoose.model("Teacher", TeacherShema);