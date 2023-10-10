const express = require("express");
const bcrypt = require("bcryptjs");
const { User } = require("../database/schemas");

const router = express.Router();

module.exports = router;

//return the object user according to the username value
router.get("/getUser", (req, res) => {
  const userName = req.query.username;

  User.find({ username: userName }, (err, user) => {
    if (err) {
      res.status(400).send({ message: "User access is not possible", err });
      return;
    }
    if (!user[0]) {
      res.status(400).send({ message: "Username isn't exists" });
      return;
    }
    console.log(user);

    res.send({ message: "Username exists", user: user[0] });
  });
});

//Updates more details for the user
router.put("/updateUser", (req, res) => {
  const id = req.body._id;
  const firstName = req.body.first_name;
  const role = req.body.role;
  const caresInfo = req.body.cares;

  User.findByIdAndUpdate(
    id,
    { first_name: firstName, parent_role: role, cares: caresInfo },
    (err, user) => {
      if (err) {
        res.status(400).send({ err, message: "Error updating user" });
      }
      res.status(200).send({ message: "User successfully updated", user });
    }
  );
});

//return a list of child career according to the use ID
router.get("/getCares", (req, res) => {
  // TODO: implement
  const caresList = [
    { name: 'סבתא', connectionID: 'sdsdf12312' },
    { name: 'סבא', connectionID: '456dfgdf' }];

  res.status(200).send({ message: "Child's career list retrieved successfully", caresList });

});

