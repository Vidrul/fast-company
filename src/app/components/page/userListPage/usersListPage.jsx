import React, { useEffect, useState } from "react";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/pagination";
import PropTypes from "prop-types";
import GroupList from "./../../common/groupList";
import API from "../../../api";
import SearchStatus from "./../../ui/searchStatus";
import UserTable from "./../../ui/userTable";
import _ from "lodash";
import { useUser } from "../../../hooks/useUsers";

const UsersListPage = () => {
    const pageSize = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [searchQuery, setSearchQuery] = useState("");

    const { users } = useUser();
    const handleDelete = (id) => {
        // setUsers(users.filter((user) => user._id !== usersId));
        console.log(id);
    };

    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });

        console.log(newArray);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    useEffect(() => {
        API.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchQuery]);

    const handleSort = (item) => {
        setSortBy(item);
    };

    const handleProfessionSelect = (item) => {
        console.log(item);
        if (searchQuery !== "") setSearchQuery("");
        setSelectedProf(item);
    };

    const handleSearchQuery = ({ target }) => {
        // setSelectedProf(undefined);
        setSearchQuery(target.value);
    };

    if (users) {
        const filteredUsers = searchQuery
            ? users.filter((user) =>
                  user.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
            : selectedProf
            ? users.filter((user) => _.isEqual(user.profession, selectedProf))
            : users;

        const sortUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const count = filteredUsers.length;
        const usersCrop = paginate(sortUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf();
        };

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className={"btn btn-secondary mt-2"}
                            onClick={clearFilter}
                        >
                            Сброс
                        </button>
                    </div>
                )}

                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <input
                        type="text"
                        name="searchQuery"
                        value={searchQuery}
                        placeholder="Search..."
                        onChange={handleSearchQuery}
                    />
                    {count > 0 && (
                        <UserTable
                            items={usersCrop}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                            onSort={handleSort}
                        />
                    )}

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
    }
    return "loading...";
};

UsersListPage.propTypes = {
    users: PropTypes.array,
    onDelete: PropTypes.func,
    onToggleBookMark: PropTypes.func
};

export default UsersListPage;
