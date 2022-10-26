import react, { useState } from "react";

const AuthContext = react.createContext({
    token : null,
    isLoggedIn : false,
    login : (token) => {},
    logout : () => {}
});

export default AuthContext;

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null);

    const userIsLoggedIn = !!token;

    const loginHandler = (token) => {
        setToken(token);
    }

    const logoutHandler = () => {
        setToken(null);
    }

    const contextValue = {
        token : token,
        isLoggedIn : userIsLoggedIn,
        login : loginHandler,
        logout : logoutHandler
    }

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}
