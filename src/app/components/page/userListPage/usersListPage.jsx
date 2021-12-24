import React, { useEffect, useState } from "react";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/pagination";
import PropTypes, { func } from "prop-types";
import GroupList from "./../../common/groupList";
import SearchStatus from "./../../ui/searchStatus";
import UserTable from "./../../ui/userTable";
import _ from "lodash";
import { useUser } from "../../../hooks/useUsers";
import { useProfession } from "../../../hooks/useProfessions";
import { useAuth } from "../../../hooks/useAuth";

const UsersListPage = () => {
    const { professions, isLoading: professionsLoadig } = useProfession();
    const pageSize = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [searchQuery, setSearchQuery] = useState("");

    const { users } = useUser();
    const { currentUser } = useAuth();
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
        function filterUsers(data) {
            const filteredUsers = searchQuery
                ? data.filter((user) =>
                      user.name
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                  )
                : selectedProf
                ? data.filter((user) =>
                      _.isEqual(user.profession, selectedProf)
                  )
                : data;

            return filteredUsers.filter((user) => user._id !== currentUser._id);
        }

        const filteredUsers = filterUsers(users);

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
                {professions && !professionsLoadig && (
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
