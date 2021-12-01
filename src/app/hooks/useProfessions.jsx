import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import professionService from "../service/profession.service";

const ProfessionsContext = React.createContext();

export const useProfession = () => {
    return useContext(ProfessionsContext);
};

const ProfessionProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [professions, setProfessions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProfessionList();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    async function getProfessionList() {
        try {
            const { content } = await professionService.get();
            setProfessions(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    function getProfession(id) {
        return professions.find((p) => p._id === id);
    }

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
        setLoading(false);
    }

    return (
        <ProfessionsContext.Provider
            value={{ professions, isLoading, getProfession }}
        >
            {children}
        </ProfessionsContext.Provider>
    );
};

ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node, PropTypes.node)
    ])
};

export default ProfessionProvider;
