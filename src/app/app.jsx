import React, { useState } from "react";
import API from "./api/index";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";

const App = () => {
  const [users, setUsers] = useState(API.users.fetchAll());

  const handleDelete = (usersId) =>
    setUsers(users.filter((user) => user._id !== usersId));

  const handleToggleBookMark = (usersId) => {
    setUsers(
      users.filter((user) => {
        if (user._id === usersId) {
          user.bookmark = !user.bookmark;
          return user;
        }
        return user;
      })
    );
  };

  return (
    <div>
      <SearchStatus length={users.length} />
      <Users
        users={users}
        onDelete={handleDelete}
        onToggleBookMark={handleToggleBookMark}
      />
    </div>
  );
};

export default App;
