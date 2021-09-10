import React, { useEffect, useState } from "react";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../utils/pagination";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import API from "../api";
import SearchStatus from "./searchStatus";
import _ from "lodash";

const Users = ({ allUsers, onDelete, onToggleBookMark }) => {
  const pageSize = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  useEffect(() => {
    API.professions.fetchAll().then(data => setProfessions(data));
  }, []);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);
  
  const handleProfessionSelect = (item) => {
    console.log(item);
    setSelectedProf(item);
  };
  
  const filteredUsers = selectedProf ? allUsers.filter(user => _.isEqual(user.profession, selectedProf)) : allUsers;
  const count = filteredUsers.length;
  const users = paginate(filteredUsers, currentPage, pageSize);
  const clearFilter = () => {
    setSelectedProf();
  };
  
  return (
    <div className="d-flex">
      {professions &&
      (<div className="d-flex flex-column flex-shrink-0 p-3">
        <GroupList
          selectedItem={selectedProf}
          items={professions}
          onItemSelect={handleProfessionSelect}
        />
        <button
          className={"btn btn-secondary mt-2"}
          onClick={clearFilter}>
          Сброс
        </button>
      </div>)}
      
      <div className="d-flex flex-column">
        <SearchStatus length={count}/>
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
          {users.map((user) => (
            <User
              key={user._id}
              onDelete={onDelete}
              onToggleBookMark={onToggleBookMark}
              user={user}
            />
          ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-center">
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

Users.propTypes = {
  allUsers: PropTypes.array,
  onDelete: PropTypes.func,
  onToggleBookMark: PropTypes.func,
};

export default Users;
