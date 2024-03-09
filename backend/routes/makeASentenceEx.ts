import express from "express";
import prisma from "../prisma/prisma";

const router = express.Router();

interface MakeASentenceExRequest {
    sentenceEng: string;
    sentenceFin: string;
    exerciseId: number;
    languageId: number;
}

// router.post('/lesson/makeASentenceEx/', async (req, res) => {
//     try {
//         const {sentenceEng, sentenceFin, exerciseId, languageId} = req.body;

//         // Validate the request body against the interface
//         const requestBody: MakeASentenceExRequest = {
//             sentenceEng,
//             sentenceFin,
//             exerciseId,
//             languageId
//         };

//         if (!sentenceEng || !sentenceFin || !exerciseId || !languageId) {
//             return res.status(400).json({error: "Missing required fields"});
//         }

//         // Create a new MakeASentenceEx entry in the database
//         const createdMakeASentenceEx = await prisma.makeASentenceEx.create({
//             data: requestBody // Pass the validated request body
//         });
// // Send a success response
//         return res.status(200).json({message: "MakeASentenceEx created successfully", data: requestBody});
//     } catch (error) {
//         // Handle any errors
//         console.error('Error creating MakeASentenceEx:', error);
//         return res.status(500).json({error: 'Internal server error'});
//     }
// });

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