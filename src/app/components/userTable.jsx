import React from "react";
import PropTypes from "prop-types";
// import User from "./user";
import BookMark from "./bookmark";
import QualitieList from "./qualitieList";
import Table from "./table";

const UserTable = ({
    items,
    onDelete,
    onToggleBookMark,
    selectedSort,
    onSort
}) => {
    const columns = {
        name: { path: "name", name: "Name" },
        qualities: {
            name: "Qualities",
            component: (user) => <QualitieList qualities={user.qualities} />
        },
        professions: { path: "profession.name", name: "Professions" },
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
        },
        delete: {
            component: (user) => (
                <button
                    onClick={() => onDelete(user._id)}
                    type="button"
                    className="btn btn-outline-danger"
                >
                    Удалить
                </button>
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
    onDelete: PropTypes.func.isRequired,
    onToggleBookMark: PropTypes.func.isRequired
};

export default UserTable;
