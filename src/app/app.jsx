import React, { useState, useEffect } from "react";
import API from "./api/index";
import Users from "./components/users";

const App = () => {
  const [users, setUsers] = useState();
  useEffect(() => {
    API.users.fetchAll().then(data => setUsers(data));
  }, []);
  
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
      }),
    );
  };
  
  return (
    <div>
      {users && <Users
        allUsers={users}
        onDelete={handleDelete}
        onToggleBookMark={handleToggleBookMark}
      />}
    
    </div>
  );
};

export default App;
