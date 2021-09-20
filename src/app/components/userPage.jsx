import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Qualitie from "./qualitie";
import API from "../api";

const UserPage = ({ id }) => {
    const [user, setUset] = useState();
    const history = useHistory();

    const handleClick = () => {
        history.replace("/users");
    };

    useEffect(() => {
        API.users.getById(id).then((data) => setUset(data));
    }, [id]);

    if (user) {
        console.log(user);

        return (
            <div>
                <h1>{user.name}</h1>
                <h2>{`Профессия:${user.profession.name}`}</h2>
                {user.qualities.map((qual) => (
                    <Qualitie
                        key={qual._id}
                        name={qual.name}
                        color={qual.color}
                    />
                ))}
                <p>{"CompletedMeetings: " + user.completedMeetings}</p>
                <h2>{"Rate: " + user.rate}</h2>
                <button onClick={() => handleClick()}>Все пользователи</button>
            </div>
        );
    }
    return "Loding...";
};

export default UserPage;
