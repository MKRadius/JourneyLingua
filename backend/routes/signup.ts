import express, {Request, Response} from "express"; // Import Request and Response types
import prisma from "../prisma/prisma";
import {validationResult, body} from "express-validator";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
const jwt = require("jsonwebtoken");
dotenv.config();

const router = express.Router();

interface SignupRequestBody {
    username: string;
    password: string;
    email: string;
    firstname: string;
    lastname: string;
}

const createToken = (userId: number) => {
    return jwt.sign({userId}, process.env.JWTSECRET, {expiresIn: '3d'});
}

// const signupValidationRules = [
//     body('username').notEmpty().withMessage('Username is required'),
//     body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
//     body('email').isEmail().withMessage('Invalid email address'),
//     body('firstname').notEmpty().withMessage('First name is required'),
//     body('lastname').notEmpty().withMessage('Last name is required')
// ];

router.post('/signup', async function(req: Request, res: Response) {
    // check for empty fields
    const { username, password, email, firstname, lastname }: SignupRequestBody = req.body;
    if (!username || !password || !email || !firstname || !lastname) {
        return res.status(400).json({ error: 'All fields must be filled' });
    }


    // Validate user input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        // Check if user already exists.
        // This approach prevents SQL injection by using parameterized queries to handle user input safely.
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: username },
                    { email: email }
                ]
            }
        });
        if (existingUser) {
            return res.status(409).json({error: 'User already exists'});
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Create the user
        const newUser = await prisma.user.create({
            data: {
                username: username,
                password: hash,
                firstname: firstname,
                lastname: lastname,
                email: email
            }
        });

        // create a token
        const token = createToken(newUser.userId);

        res.status(201).json({message: 'User created successfully', user: newUser, token});
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

// get all users TEMP
router.get('/users', async (req: Request, res: Response) => {
    try {
        // Retrieve all users
        const users = await prisma.user.findMany();

        // Return the users
        res.status(200).json({ users });
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// New route to fetch user profile information by username
router.get('/profile/:username', async (req: Request, res: Response) => {
    try {
        const { username } = req.params;
        const user = await prisma.user.findUnique({
            where: { username },
            select: { // Select specific fields to return, excluding sensitive ones like password
                username: true,
                firstname: true,
                lastname: true,
                email: true,
                streak: true,
                // Include any other fields you want to return
            }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error retrieving user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
