import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getBookMarksById } from "../../store/bookMark";

const BookMark = ({ AppendBookMark, id, removeBoomark }) => {
    const status = useSelector(getBookMarksById(id));

    if (status) console.log(status._id);

    return (
        <button
            onClick={
                status
                    ? () => removeBoomark(status._id)
                    : () => AppendBookMark(id)
            }
            type="button"
        >
            <i className={"bi bi-heart" + (status ? "-fill" : "")} />
        </button>
    );
};

BookMark.propTypes = {
    status: PropTypes.bool,
    appendBookMark: PropTypes.func,
    removeBoomark: PropTypes.func,
    id: PropTypes.string.isRequired
};
export default BookMark;
