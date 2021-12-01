import React, { useEffect, useState } from "react";
import API from "../../api";
import { useParams } from "react-router-dom";
import _ from "lodash";
import AddCommentFrom from "../common/comments/addCommentFrom";
import CommentList from "../common/comments/commenList";

const Comments = () => {
    const { userId } = useParams();
    const [commentsForUser, setCommentsForUser] = useState([]);

    useEffect(() => {
        API.comments
            .fetchCommentsForUser(userId)
            .then((data) => setCommentsForUser(data));
    }, []);

    const handleDelete = (id) => {
        API.comments.remove(id).then((data) => {
            setCommentsForUser(
                commentsForUser.filter((comment) => comment._id !== data)
            );
        });
    };

    const handleSubmit = (data) => {
        API.comments
            .add({ ...data, pageId: userId })
            .then((data) => setCommentsForUser([...commentsForUser, data]));
    };

    const sotedComments = _.orderBy(commentsForUser, ["created_at"], ["desc"]);

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
                    {commentsForUser.length !== 0 ? (
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
