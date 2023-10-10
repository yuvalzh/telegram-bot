const express = require("express");
const { ifElse } = require("ramda");
const { Child } = require("../database/schemas");
const { User } = require("../database/schemas");
//const { db } = require("../database/schemas/User");

const router = express.Router();

module.exports = router;

router.post("/registerChild", (req, res) => {

    if (!req || !req.body || !req.body.name || !req.body.parentID || !req.body.age) {
        res.status(400).send({ message: "One of the requirement parameters is missing" });
        return;
    }

    req.body.name = req.body.name.toLowerCase();

    const { name } = req.body;
    const newChild = Child(req.body);

    console.log(newChild);

    const { parentID } = req.body;
    //validation of parent ID
    User.findOne({ _id: parentID }, (err, users) => {
        if (err) {
            res.status(400).send({ message: "Parent wasn't found", err });
            return;
        } else if (users) { //parent exists
            //Check if child exists
            Child.find({ name: req.body.name, parentID: req.body.parentID }, (err, children) => {
                if (err) {
                    res.status(400).send({ message: "Child wasn't found", err });
                    return;
                }
                if (children[0]) {
                    res.status(400).send({ message: "child exists" })
                } else {
                    newChild.save((err, savedChild) => {
                        if (err || !savedChild) {
                            res.status(400).send({ message: "Create child failed", err });
                        } else {
                            User.findOneAndUpdate(
                                { _id: parentID },
                                { $push: { childrens: newChild._id } },
                                (error, success) => {
                                    if (error) {
                                        console.log(error);
                                    }
                                });
                            res.status(200).send({ message: "Child created successfully" })
                        }
                    });
                };
            });
        }
        else {
            res.status(400).send({ message: "ParentID doesn't exist" });
        }
    });
});

