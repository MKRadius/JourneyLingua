import express from "express";

const router = express.Router();
import prisma from "../prisma/prisma";

// post content to db
interface ImageToTextExRequest {
    wordEng: string;
    wordFin: string;
    category?: string;
    subCategory?: string;
    imageLink: string;
    exerciseId: number;
    languageId: number;
}

router.post('/lesson/imageToTextEx', async (req, res) => {
    try {
        const {wordEng, wordFin, category, subCategory, imageLink, exerciseId, languageId} = req.body;

        if (!wordEng || !wordFin || !imageLink || !exerciseId || !languageId) {
            return res.status(400).json({error: "Missing required fields"});
        }

        // Create a new ImageToTextEx record in the database
        const createdImageToTextEx = await prisma.imageToTextEx.create({
            data: {
                wordEng: wordEng,
                wordFin: wordFin,
                category: category,
                subCategory: subCategory,
                imageLink: imageLink,
                exerciseId: exerciseId,
                languageId: languageId,
            },
        });

        res.status(201).json(createdImageToTextEx);
    } catch (error) {
        console.error('Error creating ImageToTextEx:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

export default router;

router.get('/lesson/imageToTextEx/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const exercise = await prisma.imageToTextEx.findUnique({
            where: {
                wordId: parseInt(id)
            }
        });

        if (!exercise) {
            return res.status(404).json({error: "Exercise not found"});
        }

        res.json(exercise);
    } catch (error) {
        console.error("Error fetching exercise:", error);
        res.status(500).json({error: "Internal server error"});
    }
});


module.exports = router;
