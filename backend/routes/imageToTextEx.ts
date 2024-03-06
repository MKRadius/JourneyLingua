import express from "express";
const router = express.Router();
import prisma from "../prisma/prisma";


router.get('/lesson/imageToTextEx/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const exercise = await prisma.imageToTextEx.findUnique({
            where: {
                wordId: parseInt(id)
            }
        });

        if (!exercise) {
            return res.status(404).json({ error: "Exercise not found" });
        }

        res.json(exercise);
    } catch (error) {
        console.error("Error fetching exercise:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



module.exports = router;
