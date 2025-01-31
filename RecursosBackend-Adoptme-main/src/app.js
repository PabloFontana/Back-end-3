import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';

const app = express();
const PORT = process.env.PORT||8080;
const connection = mongoose.connect(`mongodb+srv://pablofontanaCH:coderhouse@cluster0.qyda2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use("/api/mocks", mocksRouter);

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))


import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from "swagger-ui-express";


const swaggerOptiones = {
    definition: {
        openapi: "3.0.1",
        info: {
            tittle: "Documentacion de la app adoptame.",
            description:"App dedicada a que no compres mas perros y los adoptes"
        }
    }, 
    apis: ["./src/docs/**/*.yaml"]
}

const specs = swaggerJSDoc(swaggerOptiones);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(spec));
