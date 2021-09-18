import React from "react";
import PropTypes from "prop-types";
import User from "./user";

const UsersTable = ({ count, items, onDelete, onToggleBookMark }) => {
  return (
    <table
      className="table"
      style={count === 0 ? { opacity: 0 } : { opacity: 1 }}
    >
      <thead>
      <tr>
        <th scope="col">Имя</th>
        <th scope="col">Качества</th>
        <th scope="col">Профессия</th>
        <th scope="col">Встретился,раз</th>
        <th scope="col">Оценка</th>
        <th scope="col">Избранное</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      {items.map((user) => (
        <User
          key={user._id}
          onDelete={onDelete}
          onToggleBookMark={onToggleBookMark}
          user={user}
        />
      ))}
      </tbody>
    </table>
  );
};

UsersTable.propTypes = {};

export default UsersTable;
