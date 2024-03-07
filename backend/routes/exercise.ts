import express from "express";

const router = express.Router();
import prisma from "../prisma/prisma";

// post content to db
interface createdExerciseRequest {
    exerciseId: number;
    languageId: number;
}

router.post('/exercise', async (req, res) => {
    try {
        const {exerciseId, languageId} = req.body;

        const requestBody: createdExerciseRequest = {
            exerciseId,
            languageId
        }

        if (!exerciseId || !languageId) {
            return res.status(400).json({error: "Missing required fields"});
        }

        // Create a new ImageToTextEx record in the database
        const createdExercise = await prisma.exercise.create({
            data: requestBody
        });

        return res.status(201).json({message: "Exercise created successfully", data: requestBody});
    } catch (error) {
        console.error('Error creating Exercise:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

export default router;