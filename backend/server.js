import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
const port = process.env.PORT || 5000;
import userRoutes from './routes/userRoutes.js';


connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(cookieParser());

app.use('/api/users', userRoutes);

app.get('/', (res,req)=> res.send('Server is ready'))

app.use(errorHandler);
app.use(notFound);

app.listen(port, () => console.log(`Server started on port ${port}.`))