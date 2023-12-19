const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

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
//jei nori i body gauti json
app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

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
  //   console.log(townsArray);
  response.json(townsArray);
});

//GET - /api/users/drivers - grazins visus vairuotojus
app.get("/api/users/drivers", (request, response) => {
  const drivers = users.filter((userObj) => userObj.isDriver === true);
  //   console.log(drivers);
  response.json(drivers);
});

//GET - /api/users/1 - grazinti konkretu useri
//:userID dinamine dalis
app.get("/api/users/:userID", (request, response) => {
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

app.delete("/api/users/:usersId", (request, response) => {
  const userId = request.params.usersId;
  console.log(request.params);

  users = users.filter((userObj) => +userId !== userObj.id);
  response.sendStatus(201);
});

// app.post("/api/users", (request, response) => {
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

app.post("/api/users", (req, res) => {
  // console.log('req.body ===', req.body);
  // sukuriam nauja useri
  const newUser = {
    id: parseInt(Math.random().toString().slice(3)),
    name: req.body.name,
    town: req.body.town,
    isDriver: req.body.isDriver,
  };
  console.log("newUser ===", newUser);
  users.push(newUser);
  res.sendStatus(201);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
