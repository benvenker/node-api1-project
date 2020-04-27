const express = require("express");
const db = require("./db");

const server = express();

server.use(express.json());

server.get("/api", (req, res) => {
  res.json({ message: "Hello, world!" });
});

server.get("/api/users", (req, res) => {
  const users = db.getUsers();
  if (users) {
    res.status(200).json(users);
  } else {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  }
});

server.post("/api/users", (req, res) => {
  if (!req.body.name || !req.body.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    const user = db.createUser({
      name: req.body.name,
      bio: req.body.bio,
    });
    if (user) {
      res.status(201).json(user);
    } else {
      res.status(500).json({
        errorMessage:
          "There was an error while saving the user to the database",
      });
    }
  }
});

server.get("/api/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  console.log("userId: ", userId);
  const user = db.getUserById(userId);
  console.log("user: ", user);
  if (user === undefined) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else if (!user) {
    res
      .status(500)
      .json({ errorMessage: "The user information could not be retrieved." });
  } else {
    res.status(200).json(user);
  }
});

server.delete("/api/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = db.getUserById(userId);

  if (user === undefined)
    return res.status(404).json({
      message: "The user with the specified ID does not exist.",
    });
  if (!user)
    return res
      .status(500)
      .json({ errorMessage: "The user could not be removed" });
  if (user) return res.status(204).json({ user });
});

server.put("/api/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = db.getUserById(userId);

  if (user === undefined)
    return res.status(404).json({
      message: "The user with the specified ID does not exist.",
    });

  if (req.params.bio && req.params.name)
    return res.status(400).json({
      errorMessage: "Please provide name and bio for the user.",
    });

  if (!user)
    return res.status(500).json({
      errorMessage: "The user information could not be modified.",
    });

  if (user) {
    db.updateUser(userId, req.body);
    res.status(200).json(db.getUserById(userId));
  }
});

server.listen(5500, () => {
  console.log("listening on port 5500");
});
