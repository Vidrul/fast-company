import React from "react";
import Qualitie from "./qualitie";

const QualitieList = ({ qualities }) => {
    return (
        <>
            {qualities.map((qualitie) => (
                <Qualitie
                    key={qualitie._id}
                    name={qualitie.name}
                    color={qualitie.color}
                />
            ))}
        </>
    );
};

export default QualitieList;
