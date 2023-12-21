import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const URL = "http://localhost:3000/api/books";
  const [books, setbooks] = useState("");
  const [titleVal, settitleVal] = useState("");
  const [authorValue, setauthorValue] = useState("");
  const [isPublished, setisPublished] = useState(false);
  const [year, setyear] = useState("");
  const [isEditOn, setisEditOn] = useState(false);
  const [currentTitle, setcurrentTitle] = useState("");

  // parsisiusti users ir iskonsolinti
  //sugeneruoti html

  useEffect(() => {
    getbooks();
  }, []);

  function getbooks() {
    axios
      .get(URL)
      .then((resp) => {
        console.log(resp.data);
        setbooks(resp.data);
      })
      .catch((err) => console.log(err));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (isEditOn) {
      handleUpdateFetch();
    } else {
      handleNewBookSubmit();
    }
  }

  function handleUpdateFetch() {
    console.log("updating");
    const updatedBook = {
      title: titleVal,
      author: authorValue,
      isPublished,
      year: year,
    };
    axios
      .put(`${URL}/${currentTitle}`, updatedBook)
      .then((ats) => {
        getbooks();
        settitleVal("");
        setauthorValue("");
        setisPublished(false);
        setyear("");
        setisEditOn(false);
      })
      .catch((error) => {
        console.warn("klaida", error);
        console.warn(error.response.data);
      });
  }

  function handleNewBookSubmit() {
    console.log("js is in control");
    // sudeti viska i viena obj
    const newBook = {
      title: titleVal,
      author: authorValue,
      isPublished,
      year: year,
    };
    console.log("newUser ===", newBook);
    // siusiuti ta ob i back
    axios
      .post(URL, newBook)
      .then((ats) => {
        console.log("ats ===", ats);
        if (ats.status === 201) {
          // success useris sukurtas
          // atnaujinti sarasa
          getbooks();
          settitleVal("");
          setauthorValue("");
          setisPublished(false);
          setyear("");
          return;
        }
        // neskeme, nepavyko
      })
      .catch((error) => {
        console.warn("ivyko klaida:", error);
        // show errors
        alert("klaida");
      });
    // pavyko ar ne
  }

  //delete mygtukas

  const handleDelete = (e) => {
    const title = e.target.id;
    console.log(title);
    axios
      .delete(`${URL}/${title}`)
      .then((ats) => {
        // if (ats.status === 201) {
        //   // success useris sukurtas
        //   // atnaujinti sarasa
        //   getUsers();
        //   return;
        // }
        setbooks(ats.data);
      })
      .catch((error) => {
        console.warn("ivyko klaida:", error);
        // show errors
        alert("klaida");
      });
    // pavyko ar ne
  };

  const handleEdit = (title) => {
    // console.log(idToEdit);
    // const id = +e.target.id;
    // const name = users.filter((usersObj) => usersObj.id === id)[0].name;
    // const town = users.filter((usersObj) => usersObj.id === id)[0].town;
    // const isDriver = users.filter((usersObj) => usersObj.id === id)[0].isDriver;
    // setnameVal(name);
    // settownValue(town);
    // setisDriver(isDriver);
    setisEditOn(true);
    fillFormData(title);
    setcurrentTitle(title);
  };

  const fillFormData = (title) => {
    const found = books.find((bookObj) => bookObj.title === title);
    settitleVal(found.title);
    setauthorValue(found.author);
    setisPublished(found.isPublished);
    setyear(found.year);
  };

  return (
    <div>
      <h2>BOOKS</h2>

      <h3>Add new Book</h3>
      <form onSubmit={handleSubmit} className="border p-4 ">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            className="form-control"
            value={titleVal}
            type="text"
            id="title"
            onChange={(e) => settitleVal(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">
            Author
          </label>
          <input
            className="form-control"
            type="text"
            id="author"
            value={authorValue}
            onChange={(e) => setauthorValue(e.target.value)}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            className="form-check-input"
            checked={isPublished}
            onChange={(e) => setisPublished(e.target.checked)}
            type="checkbox"
            id="exampleCheck1"
          />
          <label htmlFor="exampleCheck1" className="form-check-label">
            Published
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="year" className="form-label">
            Year
          </label>
          <input
            className="form-control"
            type="number"
            id="year"
            value={year}
            onChange={(e) => setyear(e.target.value)}
          />
        </div>
        {isEditOn === false && (
          <button type="submit" className="btn btn-outline-info">
            ADD
          </button>
        )}
        {isEditOn === true && (
          <button type="submit" className="btn btn-secondary">
            UPDATE
          </button>
        )}
      </form>
      <ul className="list-group">
        {books &&
          books.map((bookObj) => (
            <li key={bookObj.title} className="list-group-item">
              Title: {bookObj.title}, author: {bookObj.author}, is published:{" "}
              {bookObj.isPublished === true ? "YES" : "NO"}, year:{" "}
              {bookObj.year}
              <button
                id={bookObj.title}
                className="btn btn-danger mx-3"
                onClick={handleDelete}
              >
                delete
              </button>
              <button
                id={bookObj.title}
                onClick={() => handleEdit(bookObj.title)}
                className="btn btn-success"
              >
                edit
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
