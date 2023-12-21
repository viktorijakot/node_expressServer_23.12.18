// require("dotenv").config(); // ikels .env reiksmes i procces.env
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
// const bodyParser = require("body-parser");

const app = express();
const port = 3000;
// const port = process.env.PORT || 3000;

// console.log(process.env.PASS);

const { firstMiddle, bodyLooger } = require("./middleware");

//Middleware
app.use(express.json());
//aplikacijos lygio middleware
app.use(bodyLooger);
app.use(firstMiddle);
app.use(morgan("dev"));
app.use(cors()); // to fix cors errror
// jei norim i req.body gauti json

//Middleware
app.use(morgan("dev"));
app.use(cors());
//jei nori i body gauti json
app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

//Home rout

app.get("/", (req, res) => {
  res.send("hello world");
});

//route lygio middleware
// app.post("/api/test", bodyLooger, (req, res) => {
//   res.json("testing post route");
// });

//users route
const usersRouter = require("./routes/usersRoutes");
const booksRouter = require("./routes/booksRoutes");

app.use("/", usersRouter);
app.use("/", booksRouter);

//catch all rout 404 case (po sio rout negali buti kitu rout'u)
app.all("*", (req, resp) => {
  resp.status(500).json({
    msg: "Something went wrong",
    method: req.method,
    url: req.url,
  });
});

app.listen(port, () => {
  console.log(` Example app listening on port ${port}`);
});
