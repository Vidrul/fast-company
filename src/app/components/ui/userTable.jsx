import React from "react";
import PropTypes from "prop-types";
import BookMark from "./../common/bookmark";
import Table from "../common/table";
import { Link } from "react-router-dom";
import Qualitie from "./qualities";
import Profession from "./profession";

const UserTable = ({
    items,
    appendBookMark,
    selectedSort,
    onSort,
    removeBoomark
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
                    AppendBookMark={appendBookMark}
                    removeBoomark={removeBoomark}
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
    appendBookMark: PropTypes.func.isRequired,
    removeBoomark: PropTypes.func.isRequired
};

export default UserTable;
