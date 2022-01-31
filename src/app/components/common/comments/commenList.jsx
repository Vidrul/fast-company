import React from "react";
import Comment from "./comment";

const CommentList = ({ comments, onDelete }) => {
    return comments.map((comment) => (
        <Comment key={comment._id} onDelete={onDelete} {...comment} />
    ));
};

export default CommentList;
