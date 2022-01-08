import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
    getQualitiesByIds,
    getQualitiesLoadingStatus,
    loadQualitiesList
} from "../../../store/qualities";
import Qualitie from "./qualitie";

const QualitieList = ({ qualities }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getQualitiesLoadingStatus());
    const qualitiesList = useSelector(getQualitiesByIds(qualities));

    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);

    if (isLoading) {
        return "Loading ...";
    }

    return (
        <>
            {qualitiesList.map((qualitie) => (
                <Qualitie key={qualitie._id} {...qualitie} />
            ))}
        </>
    );
};

export default QualitieList;
