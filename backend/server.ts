import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import signup from './routes/signup';
import login from './routes/login';
import prisma from "./prisma/prisma";
import language from "./routes/language";
import exercise from "./routes/exercise";

dotenv.config();

const app = express();
const imageToTextExRoute = require('./routes/imageToTextEx');
const makeASentenceExRoute = require('./routes/makeASentenceEx');
const port = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// routes
app.use('/', imageToTextExRoute);
app.use('/', makeASentenceExRoute);
app.use('/', signup);
app.use('/', login);
app.use('/', language);
app.use('/', exercise);



app.listen(port, () => {
    console.log("Server running on port: " + port);
})