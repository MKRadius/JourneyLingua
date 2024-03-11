import express, {Request, Response} from "express"; // Import Request and Response types
import prisma from "../prisma/prisma";
import {validationResult} from "express-validator";
const bcrypt = require('bcrypt');

const router = express.Router();

interface SignupRequestBody {
    username: string;
    password: string;
    email: string;
    firstname: string;
    lastname: string;
}

router.post('/signup', async (req, res) => {
    // Validate user input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {username, password, email, firstname, lastname} = req.body as SignupRequestBody;

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

        res.status(201).json({message: 'User created successfully', user: newUser});
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

export default router;
