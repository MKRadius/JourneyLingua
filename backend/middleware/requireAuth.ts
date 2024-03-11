
// Not yet implemented

import { Request, Response, NextFunction } from 'express';
import prisma from "../prisma/prisma";
const jwt = require("jsonwebtoken");

interface AuthenticatedRequest extends Request {
    user?: {
        userId: number;
        username: string;

    };
}

const requireAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // Verify if the user is authenticated
    const headers = req.headers as { [key: string]: string };
    const authorization = headers.authorization;

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authorization.split(' ')[1];

    try {
        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as { userId: number };

        // Fetch the user from the database using the user ID from the token
        const user = await prisma.user.findUnique({
            where: {
                userId: decodedToken.userId
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Assign the user to the request object
        req.user = user;
        console.log("user from RequireAuth" + user);

        // Proceed to the next middleware
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Request is not authorized' });
    }
}

export default requireAuth;
