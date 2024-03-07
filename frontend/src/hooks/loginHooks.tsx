import { UserLogin } from "../interfaces/User";


 const API="http://localhost:5000";


export const login = async (user: UserLogin) => {
    const response = await fetch(`${API}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });

    return response;
}
