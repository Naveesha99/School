const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport')
const localStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');

const userModel = require("./Routes/admin/userSchema");
const adminRoute = require("./Routes/admin/admin");
const teacherRoute = require("./Routes/teacher/teacher");
const studentRoute = require("./Routes/student/student");
const nonAcademicRoute = require("./Routes/nonAcademic/nonAcademic");
const classRoute = require("./Routes/class/class");
const cleaningRoute = require("./Routes/cleaning/cleaning");
const { session } = require("passport");

app.use(express.json())
app.use(cors())
app.use( expressSession({
    secret : "some secret key : 123School321",
    saveUninitialized: true,
    resave: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use("/admin", adminRoute);
app.use("/teacher", teacherRoute);
app.use("/student", studentRoute);
app.use("/nonAcademic", nonAcademicRoute);
app.use("/class", classRoute);
app.use("/cleaning", cleaningRoute);

passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());
passport.use(new localStrategy(userModel.authenticate()));

app.post("/login", (req, res) => {
    if(!req.body.username || !req.body.password) {
        res.json( {message: "Either username or password is no given."})      
    }
    else {
        passport.authenticate("local", (err, user, info) => {
            if(err) {
                res.json({meassage: "login failed"})
            }
            else {
                if(!user) {
                    res.json({meassage: "username or password incorrect"})
                }
                else {
                    res.json({message: "Login is successfully" , user:user })
                }
            }
        }) (req,res)
    }
});

app.post("/register", async (req, res) => {
    console.log(req.body)
    userModel.register( new userModel({username: req.body.username, description: req.body.description}), req.body.password, (err, user) => {
        if (err) {
            res.send({message: "Failed to register user", err : err})
        }
        else {
            req.login(user, (err) => {
                if (err) {
                    res.send({message: "Failed to register user", err : err})
                }
                else {
                    res.send({message: "User registered successfully"})
                }
            })
        }
        

    })
});

app.post("/logout", (req, res) => {
    req.logout((err) => {
        if(err) { return next(err) }

        res.send({message: "User logged out"})
    })
});

app.listen(5000, (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("Server is running on port 5000!")
    }
});