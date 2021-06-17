const router = require("express").Router();
const fs = require("fs");
let User = require("../models/user.model");
let Memory = require("../models/memory.model");

router.route("/").get((req, res) => {
  User.find({})
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  User.find({ username: username })
    .then((resp) => {
      if (!resp.length) {
        const newUser = new User({
          username,
          memories: [],
        });

        newUser
          .save()
          .then(() => res.json(`User ${username} is registered`))
          .catch((err) => res.status(400).json("Error: " + err));
      } else {
        res.json("User already exists");
      }
    })
    .catch((err) => console.log(err));
});

router.route("/memories/:user").get((req, res) => {
  User.findOne({ username: req.params.user })
    .then((user) => res.json(user.memories))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/memories/add/:user").post((req, res) => {
  const img = req.body.imgData;
  const title = req.body.title;
  const content = req.body.content;
  const date = req.body.date;

  const newMemory = new Memory({
    img,
    title,
    content,
    date,
  });

  User.findOne({ username: req.params.user }).then((user) => {
    user.memories.push(newMemory);
    user
      .save()
      .then(() => res.json("Memory added"))
      .catch((err) => res.status(400).json("Error: " + err));
  });
});

module.exports = router;
