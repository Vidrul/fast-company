import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import qualityService from "../service/qualities.service";

const QualitiesContext = React.createContext();

export const useQualities = () => {
    return useContext(QualitiesContext);
};

const QualityProvider = ({ children }) => {
    const [qualities, setQualities] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        getQualitiesList();
    }, []);

    async function getQualitiesList() {
        try {
            const { content } = await qualityService.get();
            setQualities(content);
            setLoading(false);
        } catch (error) {
            catchError(error);
        }
    }

    function getQuality(id) {
        return qualities.find((q) => q._id === id);
    }

    function catchError(error) {
        const { message } = error.response.data;
        setError(message);
        setLoading(false);
    }

    return (
        <QualitiesContext.Provider value={{ getQuality, isLoading, qualities }}>
            {children}
        </QualitiesContext.Provider>
    );
};
QualityProvider.propTypes = {
    children: PropTypes.object
};
export default QualityProvider;
