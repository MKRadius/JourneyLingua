import request from 'supertest';
import app from '../server';

describe('Combined Test Including Language Creation', () => {
    let languageId: number = 1;
    const exerciseId: number = 1000;

    describe('Adding new language to the Language table', () => {
        beforeAll(async () => {
            // Step 1: Create a new language (Spanish)
            const newLanguage = {
                languageName: 'Spanish',
            };

            const response = await request(app)
                .post('/language')
                .send(newLanguage);

            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('languageName', newLanguage.languageName);
        });

        it('should create a new language in the Language table', () => {

            expect(languageId).toBeDefined();
            expect(languageId).toBeGreaterThan(0);
        });
    });

    describe('Create Exercise', () => {
        it('should create a new exercise', async () => {
            // Step 2: Create a new exercise using the created language
            const response = await request(app)
                .post('/exercise')
                .send({
                    exerciseId,
                    languageId,
                });

            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('message', 'Exercise created successfully');
        });
    });


    describe('MakeASentenceEx Creation', () => {
        it('should create a new MakeASentenceEx', async () => {
            // Step 3: Create a new MakeASentenceEx using the created language
            const response = await request(app)
                .post('/lesson/makeASentenceEx')
                .send({
                    exerciseId,
                    languageId,
                    sentenceEng: 'I love Typescript',
                    sentenceFin: 'Minä rakastan Typescriptista',
                });

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('message', 'MakeASentenceEx created successfully');
        });
    });

    describe('ImageToTextEx Creation', () => {
        it('should create a new ImageToTextEx', async () => {
            // Step 4: Create a new ImageToTextEx using the created language
            const response = await request(app)
                .post('/lesson/imageToTextEx')
                .send({
                    wordEng: 'cucumber',
                    wordFin: 'kurkku',
                    category: 'food',
                    imageLink: 'http://example.com/apple.jpg',
                    exerciseId,
                    languageId,
                });

            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('wordEng', 'cucumber');
        });
    });

});
