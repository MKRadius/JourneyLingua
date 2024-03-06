export interface AuthState {
    user: string;
    token: string;
    isAuth: boolean;
}

export interface AuthAction {
    type: string;
    payload: {
        user: string;
        token: string;
    };
}