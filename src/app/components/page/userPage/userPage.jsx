import React from "react";
import UserCard from "./../../ui/userCard";
import QualitiesCard from "../../ui/qualities/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "./../../ui/comments";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserById, getUsersLoadStatus } from "../../../store/users";

const UserPage = () => {
    const { userId } = useParams();

    const isLoading = useSelector(getUsersLoadStatus(userId));
    const user = useSelector(getUserById(userId));

    return !isLoading ? (
        <div className="container">
            <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                    <UserCard user={user} />
                    <QualitiesCard qualities={user.qualities} />
                    <MeetingsCard value={user.completedMeetings} />
                </div>
                <div className="col-md-8">
                    <Comments />
                </div>
            </div>
        </div>
    ) : (
        "Loading ..."
    );
};

export default UserPage;
