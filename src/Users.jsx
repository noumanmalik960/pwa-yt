import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [mode, setMode] = useState("online");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const url = "https://jsonplaceholder.typicode.com/users";
        const apiResponse = await fetch(url);
        const data = await apiResponse.json();
        setUsers(data);
        setLoading(false);
        // we store this api data for offline in local storage as:
        // JSON.stringify() method converts a JavaScript object or value to a JSON string
        localStorage.setItem("users", JSON.stringify(data));
      } catch (error) {
        setLoading(false);
        // this block works when offline or any other error
        // json.parse converts JSON text to a JS object
        let collectedData = localStorage.getItem("users");
        setUsers(JSON.parse(collectedData));
        setMode("offline");
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  } else
    return (
      <div>
        {mode === "offline" ? (
          <div className="alert alert-warning" role="alert">
            You currently are in offline mode!
          </div>
        ) : null}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>City</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.address.city}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
};

export default Users;
