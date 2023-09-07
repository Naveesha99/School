const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { request } = require('express');
const mongoose = require("mongoose");
const Record = require("./Models/Record");
const Student = require("./Models/Student");

const router = express.Router();

const url = "mongodb+srv://MERN:MERN@123@cluster0.9wgumqs.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(url);

router.get("/viewstudent", (req, res) => {
    const arr = Record.find({}, (err,data) => {
        const result = data
        res.json({"student" : result})
    })
})

router.post("/addreport", (req, res) => {
    const record = req.body;
    Student.findOne({ studentid: record.studentid }, (err,dataparent) => {
        console.log(dataparent)
        if(dataparent !== null){
            var id 
            Record.find({}).sort({_id:-1}).limit(1).exec((err, data) => {
                if(data[0] !== undefined){
                    id = data[0]._id+1;
                } else {
                    id = 1;
                }
                Record.create({_id: id, studentid: dataparent.studentid, name: dataparent.name, age: dataparent.age, marks: record.marks},(err,data)=>{
                    if(err) throw err
                    res.redirect('/teacher/viewstudent')
                })
            })
        } else {
            res.json({"msg":"unsuccess"});
        }
    })
})

router.post("/updatereport", (req, res) => {
    Record.updateOne({_id: req.body.recordid}, { marks: req.body.marks }, (err, data) => {
        if(err) throw err
        res.redirect("/teacher/viewstudents")
    }).catch((err) => {console.log(err)})
});

// router.get('/viewdocprofile', (req, res)=>{
//     Profile.findOne({_id: req.body.id}, (err, data)=>{
//         if(err) throw err
//         res.json(data)
//     }).catch((err)=>{console.log(err)})
// })

module.exports = router;
