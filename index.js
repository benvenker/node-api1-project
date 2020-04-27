const express = require("express");
const db = require("./db");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.json({ message: "Hello, world!" });
});

server.get("/users", (req, res) => {
  const users = db.getUsers();
  if (users) {
    res.status(200).json(users);
  } else {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  }
});

server.post("/users", (req, res) => {
  if (!req.body.name || !req.body.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    const user = db.createUser({
      name: req.body.name,
      bio: req.body.bio,
    });

    res.status(201).json(user);
  }
});

server.listen(5500, () => {
  console.log("listening on port 5500");
});
