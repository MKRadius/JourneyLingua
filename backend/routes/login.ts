import express, {Request, Response, query} from "express";
import prisma from "../prisma/prisma";
import {validationResult} from "express-validator";

const router = express.Router();

// Interface for the User model returned by Prisma
interface User {
    username: string;
    password: string;
}

// Interface for the request body
interface LoginRequest {
    username: string;
    password: string;
}

router.post('/login', async (req, res) => {
    try {
        // Validate user input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        // Destructure username and password from the request body
        const {username, password}: LoginRequest = req.body;

        // parameterized query ensures that the username value is treated as a parameter and not as part of the SQL code,
        // this is preventing SQL injection attacks
        const queryResult: User[] = await prisma.$queryRaw`SELECT * FROM "User" WHERE username = ${username}`;
        const existingUser: User | null = queryResult[0] || null;

        if (!existingUser) {
            return res.status(404).json({error: 'User not found'});
        }

        const isValidPassword = existingUser.password.trim() === password.trim();
        if (!isValidPassword) {
            return res.status(401).json({error: 'Invalid password'});
        }

        res.status(200).json({message: 'Login successful', username: existingUser.username, token: 'token'});
    } catch (error) {
        console.error('Error to login user:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

export default router;