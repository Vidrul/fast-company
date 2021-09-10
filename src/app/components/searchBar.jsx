import React from "react";
import PropTypes from "prop-types";

function SearchBar({ onChange }) {
    return (
        <div>
            <input
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search by name..."
            />
        </div>
    );
}

SearchBar.propTypes = {
    onChange: PropTypes.func.isRequired
};
export default SearchBar;
