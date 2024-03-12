import express, {Request, Response, query} from "express";
import prisma from "../prisma/prisma";
import {validationResult} from "express-validator";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
const jwt = require("jsonwebtoken");
dotenv.config();

const router = express.Router();

// Interface for the User model returned by Prisma
interface User {
    userId: number;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

// Interface for the request body
interface LoginRequest {
    username: string;
    password: string;
}

const createToken = (userId: number) => {
    return jwt.sign({userId}, process.env.JWTSECRET, {expiresIn: '3d'});
}

router.post('/login', async function(req, res) {
    try {
        // Destructure username and password from the request body
        const {username, password}: LoginRequest = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'All fields must be filled' });
        }
        // Validate user input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }


        // parameterized query ensures that the username value is treated as a parameter and not as part of the SQL code,
        // this is preventing SQL injection attacks
        const queryResult: User[] = await prisma.$queryRaw`SELECT * FROM "User" WHERE username = ${username}`;
        const existingUser: User | null = queryResult[0] || null;

        if (!existingUser) {
            return res.status(404).json({error: 'User not found'});
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if(!passwordMatch) {
            return res.status(401).json({error: 'Incorrect password'});
        }

        const token = createToken(existingUser.userId);

        res.status(200).json({message: 'Login successful', username: existingUser.username, firstname: existingUser.firstname, lastname: existingUser.lastname, email:existingUser.email, token: token});
    } catch (error) {
        console.error('Error to login user:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

export default router;