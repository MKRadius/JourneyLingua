import express, { Request, Response } from "express";
import prisma from "../prisma/prisma";

const router = express.Router();

router.delete('/deleteUser/:username', async (req: Request, res: Response) => {
    const { username } = req.params;

    try {
        const userToDelete = String(username);

        const user = await prisma.user.findUnique({
            where: { username: userToDelete }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // If user exists, delete the user.
        await prisma.user.delete({
            where: { username: userToDelete }
        });

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


export default router;
