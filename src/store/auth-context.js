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

    const calculateRemainingTime = (expirationTime) => {
        const currentTime = new Date().getTime();
        const adjustedExpirtationTime = new Date(expirationTime).getTime();

        const remainingDuration = adjustedExpirtationTime - currentTime;

        return remainingDuration;
    }

    const logoutHandler = () => {
        setToken(null);
    }

    const loginHandler = (token, expirationTime) => {
        setToken(token);

        const remainingTime = calculateRemainingTime(expirationTime);
        setTimeout(logoutHandler, remainingTime);
    }

    const contextValue = {
        token : token,
        isLoggedIn : userIsLoggedIn,
        login : loginHandler,
        logout : logoutHandler
    }

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}
