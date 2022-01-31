import React from "react";
import { Route } from "react-router-dom";
import Main from "./layout/main";
import Login from "./layout/login";
import Users from "./layout/users";
import NavBar from "./components/ui/navBar";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layout/logOut";
import AppLoader from "./components/ui/hoc/appLoader";

const App = () => {
    return (
        <React.Fragment>
            <AppLoader>
                <NavBar />
                <ProtectedRoute
                    path="/users/:userId?/:edit?"
                    exact
                    component={Users}
                />
                <Route path="/login/:type?" exact component={Login} />
                <Route path="/logout" component={LogOut} />
                <Route path="/" exact component={Main} />
            </AppLoader>
            <ToastContainer />
        </React.Fragment>
    );
};
export default App;
