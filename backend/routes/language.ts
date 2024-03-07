import express from "express";

const router = express.Router();
import prisma from "../prisma/prisma";

// post content to db
interface LanguageRequest {
    languageName: string;
}

router.post('/language', async (req, res) => {
    try {
        const {languageName} = req.body;

        // Validate the request body
        const requestBody: LanguageRequest = {
            languageName
        };

        if (!languageName) {
            return res.status(400).json({error: "Missing required field"});
        }

        // Create a new language record in the database
        const createdLanguage = await prisma.language.create({
            data: requestBody
        });

        res.status(201).json(createdLanguage);
    } catch (error) {
        console.error('Error creating language:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

export default router;