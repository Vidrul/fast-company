import React from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router";

import Main from "./layout/main";
import Login from "./layout/login";
import Users from "./layout/users";
import NavBar from "./components/navBar";

const App = () => {
    return (
        <React.Fragment>
            <NavBar />
            <Route path="/users/:userId?" exact component={Users}></Route>
            <Route path="/login" exact component={Login}></Route>
            <Route path="/" exact component={Main}></Route>
            <Redirect to="/" />
        </React.Fragment>
    );
};
export default App;
