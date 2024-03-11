import { UserRegister } from "../interfaces/User";



const API="http://localhost:3000";

export const register = async (user: UserRegister) => {
    const response = await fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });

    return response;
}
