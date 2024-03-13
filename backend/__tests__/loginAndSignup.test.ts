import request from 'supertest';
import app from '../server';

interface RegisterUser {
    username: string;
    password: string;
    email: string;
    firstname: string;
    lastname: string;
}

interface LoginUser {
    username: string;
    password: string;
}

let newUser: RegisterUser;

describe('User Signup', () => {
        newUser = {
            username: 'testuser',
            password: 'password',
            email: 'test@example.com',
            firstname: 'Test',
            lastname: 'User',
        };

    it('Should signup a new user successfully', async () => {
        // Signup the new user
        const response = await request(app)
            .post('/signup')
            .send(newUser);

        // Check response for successful signup
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('message', 'User created successfully');
    });
});


describe('User Login', () => {
    let loginUser: LoginUser = {
            username: 'testuser',
            password: 'password',
        };

    it('Should login the user successfully', async () => {
        const response = await request(app)
            .post('/login')
            .send({ username: loginUser.username, password: loginUser.password });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Login successful');
    });
});


afterAll(async () => {
    // Delete the user after all tests have run
    if (newUser) {
        await request(app)
            .delete(`/deleteUser/${newUser.username}`);
    }
});
