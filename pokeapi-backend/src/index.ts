import express from 'express';
import cors from 'cors';
import passport from './services/passportService';
import userRouter from './routes/userRoutes';
import pokemonRouter from './routes/pokemonRoutes';

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
app.use(passport.initialize());
app.use(userRouter);
app.use(pokemonRouter);

app.listen(3000, () => console.log('server is running on port 3000'));