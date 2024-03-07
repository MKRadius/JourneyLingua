import express from "express";

const router = express.Router();
import prisma from "../prisma/prisma";

// post content to db
interface createdLanguage {
    languageName: string;
}

router.post('/language', async (req, res) => {
    try {
        const {languageName} = req.body;

        if (!languageName) {
            return res.status(400).json({error: "Missing required field"});
        }

        // Create a new ImageToTextEx record in the database
        const createdLanguage = await prisma.language.create({
            data: {
                languageName: languageName
            },
        });

        res.status(201).json(createdLanguage);
    } catch (error) {
        console.error('Error creating ImageToTextEx:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

export default router;