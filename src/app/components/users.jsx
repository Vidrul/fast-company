import React, { useState } from "react";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../utils/pagination";
import PropTypes from "prop-types";

const Users = ({ allUsers, onDelete, onToggleBookMark }) => {
    const count = allUsers.length;
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const users = paginate(allUsers, currentPage, pageSize);

    return (
        <>
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
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                currentPage={currentPage}
            />
        </>
    );
};

Users.propTypes = {
    allUsers: PropTypes.array,
    onDelete: PropTypes.func,
    onToggleBookMark: PropTypes.func
};

export default Users;
