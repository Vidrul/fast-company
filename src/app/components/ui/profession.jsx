import React from "react";
import { useProfession } from "../../hooks/useProfessions";
import PropTypes from "prop-types";

const Profession = ({ id }) => {
    const { isLoading, getProfession } = useProfession();
    const prof = getProfession(id);
    if (!isLoading) {
        return <p>{prof.name}</p>;
    }
    return "Loading ...";
};

Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
