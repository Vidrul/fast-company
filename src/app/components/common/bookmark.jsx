import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ status, onToggleBookMark, id }) => {
    return (
        <button onClick={() => onToggleBookMark(id)} type="button">
            <i className={"bi bi-heart" + (status ? "-fill" : "")} />
        </button>
    );
};

BookMark.propTypes = {
    status: PropTypes.bool,
    onToggleBookMark: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
};
export default BookMark;
