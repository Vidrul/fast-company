import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";
import PropTypes from "prop-types";

const User = ({ user, onDelete, onToggleBookMark }) => {
    return (
        <tr>
            <th scope="row">{user.name}</th>
            <td>
                {user.qualities.map((qualitie) => (
                    <Qualitie
                        key={qualitie._id}
                        name={qualitie.name}
                        color={qualitie.color}
                    />
                ))}
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate + "/5"}</td>
            <td>
                <BookMark
                    onToggleBookMark={onToggleBookMark}
                    status={user.bookmark}
                    id={user._id}
                />
            </td>
            <td>
                <button
                    onClick={() => onDelete(user._id)}
                    type="button"
                    className="btn btn-outline-danger"
                >
                    Удалить
                </button>
            </td>
        </tr>
    );
};

User.propTypes = {
    user: PropTypes.object,
    onDelete: PropTypes.func,
    onToggleBookMark: PropTypes.func
};

export default User;
