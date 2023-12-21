const express = require("express");

const booksRouter = express.Router();

//data
let books = [
  {
    title: "Book 1",
    author: "Author 1",
    isPublished: true,
    year: 2021,
  },
  {
    title: "Book 2",
    author: "Author 2",
    isPublished: false,
    year: 2022,
  },
  {
    title: "Book 3",
    author: "Author 3",
    isPublished: true,
    year: 2023,
  },
  {
    title: "Book 4",
    author: "Author 4",
    isPublished: false,
    year: 2024,
  },
  {
    title: "Book 5",
    author: "Author 5",
    isPublished: true,
    year: 2025,
  },
];

//Routes
// crud

// gauti visasa knygas
// gauti knyga
// istrinti
// sukurti
// atnaujinti

booksRouter.get("/api/books", (req, res) => {
  console.log(req);
  res.json(books);
});

booksRouter.get("/api/books/:bookTitle", (req, res) => {
  const bookTitle = req.params.bookTitle;
  const found = books.find((booksObj) => booksObj.title === bookTitle);
  if (found === undefined) {
    response
      .status(404)
      .json({ msg: `book with title ${bookTitle} was not found` });
    return;
  }
  res.json(found);
});

booksRouter.delete("/api/books/:bookTitle", (req, res) => {
  const bookTitle = req.params.bookTitle;
  books = books.filter((booksObj) => booksObj.title !== bookTitle);
  res.json(books);
});

booksRouter.post("/api/books", (request, response) => {
  // const data = request.body;
  // const data = {
  //   title: request.body.title,
  //   author: request.body.author,
  //   isPublished: request.body.isPublished,
  //   year: request.body.year,
  // };
  // // books.push(data);
  // response.json(books);
  const newbook = {
    ...request.body,
  };
  // console.log("newUser ===", newUser);
  // books.push(newbook);
  // res.send(newbook);
  console.log(request);
  console.log("newbook ===", newbook);
  books.push(newbook);
  response.sendStatus(201);
});

booksRouter.put("/api/books/:bookTitle", (req, res) => {
  const bookTitle = req.params.bookTitle;
  //surasti ir pakeisti esama objekta
  let found = books.find((uObj) => uObj.title === bookTitle);
  found.title = req.body.title;
  found.author = req.body.author;
  found.isPublished = req.body.isPublished;
  found.year = req.body.year;
  //grazinti pakeista masyva i front'a
  res.json(books);
});

// booksRouter.post("/api/books", (req, res) => {
//   const [title, author, isPublished, year] = req.body;
//   console.log(req.body.title);
//   const newBook = {
//     title,
//     author,
//     isPublished,
//     year,
//   };
//   books.push(newBook);
//   res.send(books);
//   // console.log(newBook);
//   //   const newbook= {
//   //   id: parseInt(Math.random().toString().slice(3)),
//   //   name: req.body.name,
//   //   town: req.body.town,
//   //   isDriver: req.body.isDriver,
//   // };
// });
module.exports = booksRouter;
