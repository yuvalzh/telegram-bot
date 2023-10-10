const express = require("express");
const { User } = require("../database/schemas");
const router = express.Router();

module.exports = router;

//create new user
router.post("/registerUser", (req, res) => {
  //Missing data
  if (!req || !req.body || !req.body.username || !req.body.password) {
    res.status(400).send({ message: "Username and Password required" });
    return;
  }


  req.body.username = req.body.username.toLowerCase();

  const { username } = req.body;
  const newUser = User(req.body);
  console.log(newUser);

  //Check if the user exists
  User.find({ username }, (err, users) => {
    if (err) {
      res.status(400).send({ message: "Create user failed", err });
      return;
    }
    if (users[0]) {
      console.log("username exists");
      res.status(400).send({ message: "Username exists" });
      return;
    }

    newUser.hashPassword().then(() => {
      newUser.save((err, savedUser) => {
        if (err || !savedUser) {
          res.status(400).send({ message: "Failed to save new user to DB", err });
        } else {
          res.send({
            message: "User created successfully",
            user: savedUser.hidePassword(),
          });
        }
      });
    });
  });
});
