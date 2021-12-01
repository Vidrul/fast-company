import React, { useState, useEffect } from "react";
import API from "../../../api";
import UserCard from "./../../ui/userCard";
import QualitiesCard from "../../ui/qualities/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "./../../ui/comments";

const UserPage = ({ id }) => {
    const [user, setUset] = useState();

    useEffect(() => {
        API.users.getById(id).then((data) => setUset(data));
    }, [id]);

    if (user) {
        return (
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
        );
    }
    return "Loding...";
};

export default UserPage;
