import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
    items,
    valueProperty,
    contentProperty,
    onItemSelect,
    selectedItem
}) => {
    console.log(contentProperty, valueProperty);
    return (
        <ul className="list-group">
            {Object.values(items).map((item) => (
                <li
                    key={item[valueProperty]}
                    className={
                        "list-group-item " +
                        (item === selectedItem ? "active" : "")
                    }
                    role="button"
                    onClick={() => onItemSelect(item)}
                >
                    {item[contentProperty]}
                </li>
            ))}
        </ul>
    );
};

GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};

GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.object
};

export default GroupList;
