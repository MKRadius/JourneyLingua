import express from "express";

const router = express.Router();
import prisma from "../prisma/prisma";

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

        // Validate the request body
        const requestBody: ImageToTextExRequest = {
            wordEng,
            wordFin,
            category,
            subCategory,
            imageLink,
            exerciseId,
            languageId
        };

        if (!wordEng || !wordFin || !imageLink || !exerciseId || !languageId) {
            return res.status(400).json({error: "Missing required fields"});
        }

        // Create a new ImageToTextEx record in the database
        const createdImageToTextEx = await prisma.imageToTextEx.create({
            data: requestBody
        });

        res.status(201).json(createdImageToTextEx);
    } catch (error) {
        console.error('Error creating ImageToTextEx:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

export default router;

// commented out for testing purposes

// router.get('/lesson/imageToTextEx/:id', async (req, res) => {
//     const {id} = req.params;
//
//     try {
//         const exercise = await prisma.imageToTextEx.findUnique({
//             where: {
//                 wordId: parseInt(id)
//             }
//         });
//
//         if (!exercise) {
//             return res.status(404).json({error: "Exercise not found"});
//         }
//
//         res.json(exercise);
//     } catch (error) {
//         console.error("Error fetching exercise:", error);
//         res.status(500).json({error: "Internal server error"});
//     }
// });

// Works. Pulling a random record from the table
router.get('/lesson/imageToTextEx/random', async (req, res) => {
    try {
        const count = await prisma.imageToTextEx.count();
        if (count === 0) {
            return res.status(404).json({ error: "No exercises found" });
        }
        const randomIndex = Math.floor(Math.random() * count);
        const exercise = await prisma.imageToTextEx.findMany({
            take: 1,                // Limit the result to one record
            skip: randomIndex       // Skip the randomly generated index
        });

        // Return the randomly selected exercise
        res.json(exercise[0]);
    } catch (error) {
        console.error("Error fetching exercise:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router;
