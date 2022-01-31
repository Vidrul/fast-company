import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ _id, color, name }) => {
    return (
        <>
            <span key={_id} className={"badge m-1 rounded-pill bg-" + color}>
                {name}
            </span>
        </>
    );
};

Qualitie.propTypes = {
    _id: PropTypes.string,
    name: PropTypes.string,
    color: PropTypes.string
};

export default Qualitie;
