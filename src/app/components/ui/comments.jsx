import React, { useEffect } from "react";
import _ from "lodash";
import AddCommentFrom from "../common/comments/addCommentFrom";
import CommentList from "../common/comments/commenList";
import { useDispatch, useSelector } from "react-redux";
import {
    createComment,
    getCommentsList,
    getCommentsLoadStatus,
    loadCommentsList,
    removeComment
} from "../../store/comments";
import { useParams } from "react-router-dom";
import { getCurrentUserId } from "../../store/users";

const Comments = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);

    const comments = useSelector(getCommentsList());
    const isLoading = useSelector(getCommentsLoadStatus());
    const currentUserId = useSelector(getCurrentUserId());

    const handleDelete = (id) => {
        dispatch(removeComment(id));
    };

    const handleSubmit = (data) => {
        dispatch(
            createComment({
                ...data,
                pageId: userId,
                userId: currentUserId
            })
        );
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
                    {!isLoading ? (
                        <CommentList
                            comments={sotedComments}
                            onDelete={handleDelete}
                        />
                    ) : (
                        "Loading ..."
                    )}
                </div>
            </div>
        </>
    );
};

export default Comments;
