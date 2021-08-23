import React, { useState, useEffect } from "react";
import API from "../api";

const Users = () => {
  const [users, setUsers] = useState(API.users.fetchAll());

  const handleDelete = (usersId) => {
    setUsers(users.filter((user) => user._id !== usersId));
  };

  const renderPhrase = (n) => {
    if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
      return "человека тусанут с тобой сегодня";
    } else {
      return "человек тусанет с тобой сегодня";
    }
  };

  return (
    <React.Fragment>
      <h1>
        <span
          className={
            users.length === 0 ? "badge bg-danger" : "badge bg-primary"
          }
        >
          {users.length || ""}{" "}
          {users.length === 0
            ? "Никто с тобой не тусанет"
            : renderPhrase(users.length)}
        </span>
      </h1>
      <table
        className="table"
        style={users.length === 0 ? { opacity: 0 } : { opacity: 1 }}
      >
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился,раз</th>
            <th colSpan="2" scope="col">
              Оценка
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.name}>
              <th scope="row">{user.name}</th>
              <td>
                {user.qualities.map((qualitie) => (
                  <span
                    key={qualitie._id}
                    className={"badge rounded-pill bg-" + qualitie.color}
                  >
                    {qualitie.name}
                  </span>
                ))}
              </td>
              <td>{user.profession.name}</td>
              <td>{user.completedMeetings}</td>
              <td>{user.rate + "/5"}</td>
              <td>
                <button
                  onClick={() => handleDelete(user._id)}
                  type="button"
                  className="btn btn-outline-danger"
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Users;
