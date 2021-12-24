import React from "react";
import UserCard from "./../../ui/userCard";
import QualitiesCard from "../../ui/qualities/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "./../../ui/comments";
import { useUser } from "../../../hooks/useUsers";
import CommentsProvider from "../../../hooks/useComments";
import { useParams } from "react-router-dom";

const UserPage = () => {
    const { userId } = useParams();
    const { getUserById, isLoading } = useUser();

    const user = getUserById(userId);
    console.log(user);

    return !isLoading ? (
        <div className="container">
            <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                    <UserCard user={user} />
                    <QualitiesCard qualities={user.qualities} />
                    <MeetingsCard value={user.completedMeetings} />
                </div>
                <div className="col-md-8">
                    <CommentsProvider>
                        <Comments />
                    </CommentsProvider>
                </div>
            </div>
        </div>
    ) : (
        "Loading ..."
    );
};

export default UserPage;
