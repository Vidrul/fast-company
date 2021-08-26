import React from "react";

const BookMark = ({ status, onToggleBookMark, id }) => {
  console.log(status);
  return (
    <button onClick={() => onToggleBookMark(id)} type="button">
      <i className={"bi bi-heart" + (status ? "-fill" : "")}></i>
    </button>
  );
};

export default BookMark;
