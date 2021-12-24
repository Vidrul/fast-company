import React from "react";
import { useQualities } from "../../../hooks/useQualities";
import Qualitie from "./qualitie";

const QualitieList = ({ qualities }) => {
    const { isLoading } = useQualities();

    return (
        <>
            {!isLoading
                ? qualities.map((qualitie) => (
                      <Qualitie key={qualitie} id={qualitie} />
                  ))
                : "Loading ..."}
        </>
    );
};

export default QualitieList;
