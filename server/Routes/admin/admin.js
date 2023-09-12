const express = require("express");
const router = express.Router();

const userModel = require("userSchema");

router.get("/", (req, res) => {
    res.json(users)
    res.send()
});

router.post("/get", (req, res) => {
    userModel.find({}).then((users) => {
        res.send(users)
    })
});

router.post("/delete", (req, res) => {
    userModel.deleteOne({ username: req.body.user }, (err, result) => {
        if (err) {
            res.send(err)
        }
        else {
            console.log(typeof result.deletedCount)
            if (result.deletedCount === 0) {
                res.send({ message: "There was no matching user" })
            } else {
                res.send({ message: "User deleted successfully" })
            }
        }
    })
});

router.post("/create", async (req, res) => {
    // const user = new userModel(req.body)
    // try {
    //     await user.save()
    //     res.send({ message: "User created successfully" })
    // } catch (err) {
    //     res.send(err)
    // }
    userModel.register( new userModel({username: req.body.username, description: req.body.description}, req.body.password, (err, user) => {
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
        

    }))
});

router.post("/update", (req, res) => {
    userModel.findOne({ username: req.body.username }).
        then(async (doc) => {
            if (doc == {}) {
                res.send({ message: "User does not exist" })
            }
            doc.password = req.body.password
            const user = new userModel(doc)
            try {
                await user.save()
                res.send({ message: "User updated successfully" })
            } catch (err) {
                res.send(err)
            }
        })
});

module.exports = router; 
