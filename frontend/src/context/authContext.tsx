import React, {createContext, useReducer, useEffect, ReactNode} from "react";
import { AuthAction, AuthState } from "../interfaces/Auth";

export const AuthContext = createContext<{
    user: string;
    token: string;
    isAuth: boolean;
    dispatch: React.Dispatch<AuthAction>;
}>({
    user: "",
    token: "",
    isAuth: false,
    dispatch: () => {},
});

export const AuthReducer = (state: AuthState , action: AuthAction) => {
    switch (action.type) {
        case "LOGIN": 
            localStorage.setItem("user", action.payload.user);
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("isAuth", "true");
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuth: true,
            };

        case "LOGOUT":
            localStorage.clear();
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuth: false,
            };

        default:
            return state;


    }
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, {
        user: "",
        token: "",
        isAuth: false,
    });

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        const isAuth = Boolean(localStorage.getItem("isAuth"));

        if (user && token && isAuth) {
            dispatch({
                type: "LOGIN",
                payload: {
                    user,
                    token
                }
            });
        }
    }, [])



    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}