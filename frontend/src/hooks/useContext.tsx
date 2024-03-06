import { AuthContext } from "../context/authContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const Auth = useContext(AuthContext);

    if (!Auth) throw new Error("useAuthContext must be used within an AuthProvider");

    return Auth;
}