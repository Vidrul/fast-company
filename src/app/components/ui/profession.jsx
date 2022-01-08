import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
    getProfessionById,
    getProfessionsLoadStatus,
    loadProfessionsList
} from "../../store/professions";
import { useDispatch } from "react-redux";

const Profession = ({ id }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getProfessionsLoadStatus());
    const prof = useSelector(getProfessionById(id));

    useEffect(() => {
        dispatch(loadProfessionsList());
    }, []);

    if (!isLoading) {
        return <p className="text-secondary mb-1">{prof.name}</p>;
    }
    return <p className="text-secondary mb-1">Loading ...</p>;
};

Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
