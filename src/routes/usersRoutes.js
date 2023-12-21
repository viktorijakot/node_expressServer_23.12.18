const express = require("express");
const { validateUser } = require("../middleware");
// sukuriame router
const usersRouter = express.Router();

//middleware

//data
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

usersRouter.get("/", (req, res) => {
  res.send("Hello World!");
});

//GET - /api/users - grazinti visus userius
usersRouter.get("/api/users", (request, response) => {
  response.json(users);
});

// GET - /app/users/town - grazins visus miestus, masyvo pavidalu

usersRouter.get("/api/users/town", (request, response) => {
  const townsArray = users.map((userObj) => userObj.town);
  //   console.log(townsArray);
  response.json(townsArray);
});

//GET - /api/users/drivers - grazins visus vairuotojus
usersRouter.get("/api/users/drivers", (request, response) => {
  const drivers = users.filter((userObj) => userObj.isDriver === true);
  //   console.log(drivers);
  response.json(drivers);
});

//GET - /api/users/1 - grazinti konkretu useri
//:userID dinamine dalis
usersRouter.get("/api/users/:userID", (request, response) => {
  //   console.log(request.params);
  const userID = +request.params.userID;
  // surasti objekta su id === userID ir ji grazinti
  const found = users.find((userObj) => userID === userObj.id);
  //   console.log(found);
  //TODO not found case
  if (found === undefined) {
    response.status(404).json({ msg: `user with id ${userID} was not found` });
    return;
  }
  response.json(found);
});

//DELETE - /api/users/2 -delete user with id

usersRouter.delete("/api/users/:usersId", (request, response) => {
  const userId = request.params.usersId;
  console.log(request.params);

  users = users.filter((userObj) => +userId !== userObj.id);
  response.json(users);
});

// usersRouter.post("/api/users", (request, response) => {
//   // const data = request.body;
//   const data = {
//     id: Math.random().toString().slice(3),
//     name: request.body.name,
//     town: request.body.town,
//     isDriver: request.body.isDriver,
//   };
//   users.push(data);
//   response.send(users);
// });

//idedame validacija is middleware
usersRouter.post("/api/users", validateUser, (req, res) => {
  // console.log('req.body ===', req.body);
  // sukuriam nauja useri
  // const newUser = {
  //   id: parseInt(Math.random().toString().slice(3)),
  //   name: req.body.name,
  //   town: req.body.town,
  //   isDriver: req.body.isDriver,
  // };
  // /** @type {String} */
  const { name, town, isDriver } = req.body;
  //mini validation

  const newUser = {
    id: parseInt(Math.random().toString().slice(3)),
    name,
    town,
    isDriver,
  };
  // const newUser = {
  //   id: parseInt(Math.random().toString().slice(3)),
  //   ...req.body,
  // };
  console.log("newUser ===", newUser);
  users.push(newUser);
  res.sendStatus(201);
});

//PUT /api/users/2 -updaeres users with id 2 object
usersRouter.put("/api/users/:userId", validateUser, (req, res) => {
  const userId = +req.params.userId;
  //surasti ir pakeisti esama objekta
  let foundIndex = users.findIndex((uObj) => uObj.id === userId);
  users[foundIndex] = {
    id: userId,
    ...req.body,
  };
  // found.name = req.body.name
  // found.town = req.body.town
  // found.isDriver = req.body.isDriver
  //grazinti pakeista masyva i front'a
  res.json(users);
});

//Routes
module.exports = usersRouter;
