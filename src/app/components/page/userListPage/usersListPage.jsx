import React, { useEffect, useState } from "react";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/pagination";
import PropTypes from "prop-types";
import GroupList from "./../../common/groupList";
import SearchStatus from "./../../ui/searchStatus";
import UserTable from "./../../ui/userTable";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
    getProfessionsList,
    getProfessionsLoadStatus
} from "../../../store/professions";
import { getCurrentUserId, getUsersList } from "../../../store/users";
import { addBookMark, removeBookMark } from "../../../store/bookMark";
import { nanoid } from "nanoid";

const UsersListPage = () => {
    const dispatch = useDispatch();
    const professions = useSelector(getProfessionsList());
    const professionsLoadig = useSelector(getProfessionsLoadStatus());
    const pageSize = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [searchQuery, setSearchQuery] = useState("");

    const users = useSelector(getUsersList());
    const currentUserId = useSelector(getCurrentUserId());

    const handleDelete = (id) => {
        // setUsers(users.filter((user) => user._id !== usersId));
        console.log(id);
    };

    const handleRemoveBookMark = (id) => {
        dispatch(removeBookMark(id));
    };

    const handleAppendBookMark = (id) => {
        dispatch(
            addBookMark({
                _id: nanoid(),
                authUser: currentUserId,
                userId: id,
                created_at: Date.now()
            })
        );
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
        if (searchQuery !== "") setSearchQuery("");
        setSelectedProf(item);
    };

    const handleSearchQuery = ({ target }) => {
        setSelectedProf(undefined);
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
                      _.isEqual(user.profession, selectedProf._id)
                  )
                : data;

            return filteredUsers.filter((user) => user._id !== currentUserId);
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
                            appendBookMark={handleAppendBookMark}
                            removeBoomark={handleRemoveBookMark}
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
