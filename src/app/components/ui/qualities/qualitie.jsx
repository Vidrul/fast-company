import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";
const Qualitie = ({ id }) => {
    const { getQuality } = useQualities();
    const { color, _id, name } = getQuality(id);

    return (
        <>
            <span key={_id} className={"badge m-1 rounded-pill bg-" + color}>
                {name}
            </span>
        </>
    );
};

Qualitie.propTypes = {
    id: PropTypes.string
};

export default Qualitie;
