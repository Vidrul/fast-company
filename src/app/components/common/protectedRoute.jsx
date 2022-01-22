import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { getIsLoggedIn } from "../../store/users";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, children, ...rest }) => {
    const loaction = useLocation();
    const isLoggedIn = useSelector(getIsLoggedIn());


    return (
        <Route
            {...rest}
            render={(props) => {
                if (!isLoggedIn) {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: loaction }
                            }}
                        />
                    );
                }
                return Component ? <Component {...props} /> : children;
            }}
        />
    );
};

ProtectedRoute.propTypes = {
    component: PropTypes.func,
    location: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ProtectedRoute;
