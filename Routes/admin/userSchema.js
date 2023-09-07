const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb+srv://MERN:MERN@123@cluster0.9wgumqs.mongodb.net/?retryWrites=true&w=majority");

const UserSchema = new mongoose.Schema({
    usernname:{
    type: String,
    required: true
    },
    password: {
        type: String,
    },
    description: {
        type: String,
        required: true
    }
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model.apply("User", UserSchema);

module.export = User;