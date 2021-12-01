import React from "react";
import { Route } from "react-router-dom";

import Main from "./layout/main";
import Login from "./layout/login";
import Users from "./layout/users";
import NavBar from "./components/ui/navBar";
import { ToastContainer } from "react-toastify";
import ProfessionProvider from "./hooks/useProfessions";
import QualityProvider from "./hooks/useQualities";
import AuthProvider from "./hooks/useAuth";

const App = () => {
    return (
        <React.Fragment>
            <AuthProvider>
                <NavBar />
                <QualityProvider>
                    <ProfessionProvider>
                        <Route
                            path="/users/:userId?/:edit?"
                            exact
                            component={Users}
                        />
                        <Route path="/login/:type?" exact component={Login} />
                        <Route path="/" exact component={Main} />
                    </ProfessionProvider>
                </QualityProvider>
            </AuthProvider>
            <ToastContainer />
        </React.Fragment>
    );
};
export default App;
