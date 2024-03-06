import express from "express";
import prisma from "../prisma/prisma";
const router = express.Router();

router.get('/lesson/makeASentenceEx/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const exercise = await prisma.makeASentenceEx.findUnique({
            where: {
                sentenceId: id
            }
        });
        if (!exercise) {
            return res.status(404).json({ error: 'Exercise not found' });
        }
        res.json(exercise);
    } catch (error) {
        console.error('Error fetching exercise:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;