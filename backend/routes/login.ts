import express, {Request, Response} from "express"; // Import Request and Response types
import prisma from "../prisma/prisma";
import {validationResult} from "express-validator";

const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
    try {
        // Validate user input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                username: username,
            },
        });

        if (!existingUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        else {
            console.log(existingUser);
        }

        const isValidPassword = existingUser.password.trim() === password.trim();
        
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Password is valid, proceed with signing in
        res.status(200).json({ message: 'Login successful', username: existingUser.username, token: 'token'});
    } catch (error) {
        console.error('Error to login user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
