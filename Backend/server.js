/*import express from 'express'
import cors from 'cors'
//import dotenv from 'dotenv/config'
import dotenv from 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js';

// App Config
const app = express();
const port = process.env.PORT || 4000
connectDB();
connectCloudinary();


// middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);

// api endpoints
app.get('/', (req, res) => {
    res.send("API Working!");
});

app.listen(port, () => console.log('Server started on PORT: ' + port));*/

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'; // Correct way to import dotenv
dotenv.config(); // Loading environment variables from .env file
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';

// App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// API Endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);

// API Root endpoint
app.get('/', (req, res) => {
    res.send("API Working!");
});

app.listen(port, () => console.log('Server started on PORT: ' + port));
