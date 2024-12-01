import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import catalogRouter from './Product/catalogRouter';
import authRouter from './Login/auth.Routes';
import orderRouter from './Order/order.Routes';

dotenv.config();
const app = express();

app.use(cors()); 
app.use(express.json());


app.use('/api', catalogRouter);

app.use('/auth', authRouter);

app.use('/order', orderRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});