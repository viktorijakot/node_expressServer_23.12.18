"use strict";

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const port = 3000;

let users = [
  {
    id: 1,
    name: "James",
    town: "London",
    isDriver: false,
  },
  {
    id: 2,
    name: "Mike",
    town: "Kaunas",
    isDriver: true,
  },
  {
    id: 3,
    name: "Bob",
    town: "Vilnius",
    isDriver: false,
  },
  {
    id: 4,
    name: "Jane",
    town: "London",
    isDriver: true,
  },
];

//Middleware
app.use(morgan("dev"));
app.use(cors());

//Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//GET - /api/users - grazinti visus userius
app.get("/api/users", (request, response) => {
  response.json(users);
});

// GET - /app/users/town - grazins visus miestus, masyvo pavidalu

app.get("/api/users/town", (request, response) => {
  const townsArray = users.map((userObj) => userObj.town);
  console.log(townsArray);
  response.json(townsArray);
});

//GET - /api/users/drivers - grazins visus vairuotojus
app.get("/api/users/drivers", (request, response) => {
  const drivers = users.filter((userObj) => userObj.isDriver === true);
  console.log(drivers);
  response.json(drivers);
});

//GET - /api/users/1 - grazinti konkretu useri
//:userID dinamine dalis
app.get("/api/users/:userID", (request, response) => {
  console.log(request.params);
  const userID = +request.params.userID;
  // surasti objekta su id === userID ir ji grazinti
  const found = users.find((userObj) => userID === userObj.id);
  console.log(found);
  //TODO not found case
  if (found === undefined) {
    response.status(404).json({ msg: `user with id ${userID} was not found` });
    return;
  }
  response.json(found);
});

//DELETE - /api/users/2 -delete user with id

app.delete("/api/users/:usersId", (request, response) => {
  const userId = +request.params.usersId;
  //grazinti viska isskyrus ta el ant kurio id yra === userID
  users = users.filter((userObj) => userId !== userObj.id);
  response.json(users);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
