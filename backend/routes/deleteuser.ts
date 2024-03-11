import express, { Request, Response } from "express";
import prisma from "../prisma/prisma";

const router = express.Router();

router.delete('/deleteUser/:userId', async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const id = Number(userId);

        const user = await prisma.user.findUnique({
            where: { userId: id }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // If user exists, delete the user.
        await prisma.user.delete({
            where: { userId: id }
        });

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


export default router;
