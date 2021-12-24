import PropTypes from "prop-types";
import React from "react";

const SearchStatus = ({ length }) => {
    const renderPhrase = (n) => {
        if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
            return "человека тусанут с тобой сегодня";
        } else {
            return "человек тусанет с тобой сегодня";
        }
    };

    return (
        <>
            <h1>
                <span
                    className={
                        "badge bg-" + (length === 0 ? "danger" : "primary")
                    }
                >
                    {length || ""}{" "}
                    {length === 0
                        ? "Никто с тобой не тусанет"
                        : renderPhrase(length)}
                </span>
            </h1>
        </>
    );
};

SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
};

export default SearchStatus;
