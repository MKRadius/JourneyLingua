import request from 'supertest';
import app from '../server';

describe('Combined Test Including Language Creation', () => {
  it('should create all entities sequentially: 1. New language 2. New Exercise 3. New MakeASentenceEx 4. New ImageToTextEx', async () => {
    // Step 1: Create a new language (Spanish)
    let newLanguage = {
      languageName: 'Spanish',
    };

    let response = await request(app)
      .post('/language')
      .send(newLanguage);

    // Verify that the language creation was successful
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('languageName', newLanguage.languageName);

    // Predefined languageId for Finnish for the next steps
    const languageId = 1;

    // Step 2: Create a new exercise using Finnish
    response = await request(app)
      .post('/exercise')
      .send({
        exerciseId: 100,
        languageId,
      });

    // Verify that the exercise creation was successful
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'Exercise created successfully');

    // Step 3: Create a new MakeASentenceEx using Finnish
    const exerciseId = 100;
    response = await request(app)
      .post('/lesson/makeASentenceEx')
      .send({
        exerciseId,
        languageId,
        sentenceEng: 'I love to play football',
        sentenceFin: 'Minä rakastan jalkapallon pelaamista',
      });

    // Verify that the MakeASentenceEx creation was successful
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'MakeASentenceEx created successfully');

    // Step 4: Create a new ImageToTextEx using Finnish
    response = await request(app)
      .post('/lesson/imageToTextEx')
      .send({
        wordEng: 'apple',
        wordFin: 'omena',
        category: 'fruit',
        imageLink: 'http://example.com/apple.jpg',
        exerciseId,
        languageId,
      });

    // Verify that the ImageToTextEx creation was successful
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('wordEng', 'apple');
  });
});
