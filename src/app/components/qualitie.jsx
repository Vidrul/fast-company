import React from "react";

const Qualitie = ({ name, color }) => {
  return <span className={"badge m-1 rounded-pill bg-" + color}>{name}</span>;
};

export default Qualitie;
