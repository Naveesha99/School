const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { request } = require('express');
const mongoose = require('mongoose');
const Student = require("./Models/Students");

const router = express.Router()

const url = "mongodb+srv://MERN:MERN@123@cluster0.9wgumqs.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(url);

router.get("/viewstudent", (req, res) => {
    const arr = Student.find( {}, (err, data) => {
        const result = data
        res.json({"medicine" : result})
    })
});

router.post("/addstudent", (req, res) => {
    const record = req.body;
    Student.findOne({ studentid: record.studentid }, (err, dataparent) => {
        var id 
        Student.find({}).sort({studentid:-1}).limit(1).exec((err, data) => {
            console.log(data[0])
            if(data[0] !== undefined){
                id = data[0].studentid+1;
            }else{
                id = 1;
            }
            Student.create({_id: id, studentid: id, studentid: record.StudentName, IndexDate: record.IndexDate}, (err, data) => {
                if (err) throw err
                res.redirect('clss/viewstdent')
            })
        })
    })
})
router.post("/deletestudent", async(req, res) =>{
    const id = req.body.id
    console.log(id)
    Student.deleteOne({_id: id}, (err, data) =>{
        if (err) throw err
        res.redirect('/class/viewstudent')
    }).catch((err) =>{console.log(err)})
});

router.post('/updatestudent', (req,res) => {
    console.log(req.body.studentid)
    Student.updateOne({studentid: req.body.studentid},{ StudentName: req.body.StudentName , IndexDate: req.body.IndexDate},(err, data) =>{
        if(err) throw err
        res.redirect('/pharmacy/viewstudent')
    }).catch((err) => {console.log(err)})
});

module.exports = router;