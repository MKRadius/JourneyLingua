import express from "express";
import prisma from "../prisma/prisma";
import { Exercise } from "@prisma/client";

const router = express.Router();

interface MakeASentenceExRequest {
    sentenceEng: string;
    sentenceFin: string;
    exerciseId: number;
    languageId: number;
}

router.get('/lesson/makeASentenceEx/random', async (req, res) => {
    try {
        const count = await prisma.makeASentenceEx.count();
        if (count === 0) {
            return res.status(404).json({ error: "No exercises found" });
        }
        const randomIds : number[] = [];
        while(randomIds.length < 3) {
            const randomId = Math.floor(Math.random() * count) + 1;
            if(!randomIds.includes(randomId)) {
                randomIds.push(randomId);
            }
        }

        const exercises : Exercise[] = [];
        for (let id of randomIds) {
            const exercise = (await prisma.makeASentenceEx.findMany({
                where: {
                    exerciseId: id
                }
            }))[0];
            if (exercise !== undefined) {
                exercises.push(exercise);
            }
        }

        // Return the randomly selected exercise
        res.json(exercises);
    } catch (error) {
        console.error('Error fetching exercises:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

// router.get('/lesson/makeASentenceEx', async (req, res) => {
//     try {
//         const exercises = await prisma.makeASentenceEx.findMany();
//         res.json(exercises);
//     } catch (error) {
//         console.error('Error fetching exercises:', error);
//         res.status(500).json({error: 'Internal server error'});
//     }
// });

router.post('/lesson/makeASentenceEx/', async (req, res) => {
    try {
        const {sentenceEng, sentenceFin, exerciseId, languageId} = req.body;

        // Validate the request body against the interface
        const requestBody: MakeASentenceExRequest = {
            sentenceEng,
            sentenceFin,
            exerciseId,
            languageId
        };

        if (!sentenceEng || !sentenceFin || !exerciseId || !languageId) {
            return res.status(400).json({error: "Missing required fields"});
        }

        // Create a new MakeASentenceEx entry in the database
        const createdMakeASentenceEx = await prisma.makeASentenceEx.create({
            data: requestBody // Pass the validated request body
        });
        // Send a success response
        return res.status(200).json({message: "MakeASentenceEx created successfully", createdMakeASentenceEx});
    } catch (error) {
        // Handle any errors
        console.error('Error creating MakeASentenceEx:', error);
        return res.status(500).json({error: 'Internal server error'});
    }
});

router.get('/lesson/makeASentenceEx/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const exercise = await prisma.makeASentenceEx.findUnique({
            where: {
                sentenceId: id
            }
        });
        if (!exercise) {
            return res.status(404).json({error: 'Exercise not found'});
        }
        res.json(exercise);
    } catch (error) {
        console.error('Error fetching exercise:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

module.exports = router;