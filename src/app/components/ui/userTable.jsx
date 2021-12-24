import React from "react";
import PropTypes from "prop-types";
import BookMark from "./../common/bookmark";
import Table from "../common/table";
import { Link } from "react-router-dom";
import Qualitie from "./qualities";
import Profession from "./profession";

const UserTable = ({
    items,
    onToggleBookMark,
    selectedSort,
    onSort
}) => {
    const columns = {
        name: {
            path: "name",
            name: "Name",
            component: (user) => (
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            )
        },
        qualities: {
            name: "Qualities",
            component: (user) => <Qualitie qualities={user.qualities} />
        },
        professions: {
            name: "Professions",
            component: (user) => <Profession id={user.profession} />
        },
        completedMeetings: {
            path: "completedMeetings",
            name: "CompletedMeetings"
        },
        rate: { path: "rate", name: "Rating" },
        bookmark: {
            path: "bookmark",
            name: "Bookmark",
            component: (user) => (
                <BookMark
                    onToggleBookMark={onToggleBookMark}
                    status={user.bookmark}
                    id={user._id}
                />
            )
        }
    };
    return (
        <Table
            data={items}
            columns={columns}
            selectedSort={selectedSort}
            onSort={onSort}
        />
    );
};

UserTable.propTypes = {
    users: PropTypes.array,
    onToggleBookMark: PropTypes.func.isRequired
};

export default UserTable;
