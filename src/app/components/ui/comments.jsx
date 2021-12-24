import React from "react";
import _ from "lodash";
import AddCommentFrom from "../common/comments/addCommentFrom";
import CommentList from "../common/comments/commenList";
import { useComments } from "../../hooks/useComments";

const Comments = () => {
    const { createComment, comments, deleteComment } = useComments();

    const handleDelete = (id) => {
        deleteComment(id);
    };

    const handleSubmit = (data) => {
        createComment(data);
    };

    const sotedComments = _.orderBy(comments, ["created_at"], ["desc"]);

    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    <AddCommentFrom onSubmit={handleSubmit} />
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr />
                    {comments.length !== 0 ? (
                        <CommentList
                            comments={sotedComments}
                            onDelete={handleDelete}
                        />
                    ) : (
                        "No comments."
                    )}
                </div>
            </div>
        </>
    );
};

export default Comments;
