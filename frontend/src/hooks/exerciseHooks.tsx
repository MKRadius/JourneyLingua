const API = "http://localhost:3000";

export const fetchExercise = async () => {
    const response = await fetch(`${API}/lesson/imageToTextEx/random`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    return response;
};

export const fetchSentenceExercise = async () => {
    const response = await fetch(`${API}/lesson/makeASentenceEx/random`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    return response;
};