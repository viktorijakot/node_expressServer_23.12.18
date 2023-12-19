import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const URL = "http://localhost:3000/api/users";
  const [users, setUsers] = useState();
  const [towns, setTowns] = useState();
  const [newUser, setNewUser] = useState();
  useEffect(() => {
    axios
      .get(URL)
      .then((resp) => setUsers(resp.data))
      .catch((err) => console.log(err));
  }, []);

  const handleClick = () => {
    axios
      .get(`${URL}/town`)
      .then((resp) => setTowns(resp.data))
      .catch((err) => console.log(err));
  };

  const handleDelete = (e) => {
    const userId = e.target.id;
    axios.delete(`${URL}/${userId}`);
    // .then((resp) => setUsers(resp.data))
    // .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: users.length + 1,
      name: e.target[0].value,
      town: e.target[1].value,
      isDriver: e.target[2].checked,
    };
    // setNewUser({
    //   id: users.length + 1,
    //   name: e.target[0].value,
    //   town: e.target[1].value,
    //   isDriver: e.target[2].checked,
    // });
    axios
      .post("http://localhost:3000/api/users", newUser)
      .then((resp) => setUsers(resp.data))
      // .then((resp) => setTowns(resp.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Users</h1>
        {users &&
          users.map((userObj) => (
            <div
              key={userObj.id}
              style={{ display: "flex", marginBottom: "15px" }}
            >
              <p>
                id: {userObj.id}, name: {userObj.name}, town: {userObj.town}, is
                driver: {userObj.isDriver === true ? "YES" : "NO"}
              </p>
              <button id={userObj.id} onClick={(e) => handleDelete(e)}>
                DELETE
              </button>
            </div>
          ))}
        <button onClick={handleClick}>GET TOWNS</button>
        {towns && <p>{towns.join(" ")}</p>}
        <form method="post" onSubmit={(e) => handleSubmit(e)}>
          <div>
            {/* <input type="text" name="id" placeholder="ID number" /> */}
            <input type="text" name="name" placeholder="Name" />
            <input type="text" name="town" placeholder="Town" />
            <label>Are you driver?</label>
            <input type="checkbox" name="driver" />
          </div>
          <button type="submit">SEND</button>
        </form>
      </header>
    </div>
  );
}

export default App;
