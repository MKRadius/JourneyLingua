import request from 'supertest';
import app from '../server';

describe('User Signup and Login', () => {
  it('should signup a new user and then login that user successfully', async () => {
    const newUser = {
      username: 'testuser',
      password: 'password',
      email: 'test@example.com',
      firstname: 'Test',
      lastname: 'User',
    };

    // Attempt to sign up the new user
    let response = await request(app)
      .post('/signup')
      .send(newUser);

    // Check response for successful signup
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'User created successfully');

    // Now attempt to login with the new user credentials
    response = await request(app)
      .post('/login')
      .send({ username: newUser.username, password: newUser.password });

    // Check response for successful login
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Login successful');
  });
});
