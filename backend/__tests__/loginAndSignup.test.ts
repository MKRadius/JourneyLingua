import request from 'supertest';
import app from '../server';

describe('User Signup and Login', () => {
  let newUser : any;

  beforeAll(async () => {
    // Sign up a new user before running the tests
    newUser = {
      username: 'testuser',
      password: 'password',
      email: 'test@example.com',
      firstname: 'Test',
      lastname: 'User',
    };

    await request(app)
        .post('/signup')
        .send(newUser);
  });

  it('should signup a new user and then login that user successfully', async () => {
    // Attempt to login with the new user credentials
    const response = await request(app)
        .post('/login')
        .send({ username: newUser.username, password: newUser.password });

    // Check response for successful login
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Login successful');
  });

  afterAll(async () => {
    // Delete the user after all tests have run
    await request(app)
        .delete(`/deleteUser/${newUser.username}`);
  });
});
