import React, { useState } from "react";
import API from "./api/index";
import SearchStatus from "./components/searchStatus";
import Users from "./components/users";
import SearchBar from "./components/searchBar";

const App = () => {
    const [users, setUsers] = useState(API.users.fetchAll());
    const [filterText, setFilterText] = useState("");

    const handleDelete = (usersId) =>
        setUsers(users.filter((user) => user._id !== usersId));

    const handleChange = (text) => {
        setFilterText(text);
    };

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
            <SearchBar onChange={handleChange} filteText={filterText} />
            <Users
                allUsers={users}
                onDelete={handleDelete}
                onToggleBookMark={handleToggleBookMark}
            />
        </div>
    );
};

export default App;
